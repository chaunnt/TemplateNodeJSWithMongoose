"use strict";
const RedisFunction = require('../../ThirdParty/Redis/RedisInstance');
async function insert(DBModel, datas) {
  return await DBModel.modelData.insertMany(datas);
};
async function updateById(DBModel, docId, data) {
  return await DBModel.modelData.findOneAndUpdate({ _id: docId }, data);
}

async function findById(DBModel, id, fields) {
  //2021-03-19 ChauNNT
  //cache data if it was fetched
  //it will help prevent over-usage checking unique by using database
  const detailDataKey = DBModel.modelName + "_" + id;
  let cachedData = await RedisFunction.get(detailDataKey);

  if (cachedData !== "" && cachedData !== null) {
    return cachedData;
  }

  let result = undefined;

  if (fields) {
    result = await DBModel.modelData.findById(id, fields).lean();
  } else {
    result = await DBModel.modelData.findById(id).lean();
  }

  //2021-03-19 ChauNNT
  //cache data if it was fetched
  //it will help prevent over-usage checking unique by using database
  if (cachedData === "" || cachedData === null) {
    //cache in 1 HOUR
    const ONE_MINUTE = 1 * 60;
    RedisFunction.setWithExpire(detailDataKey, JSON.stringify(result), ONE_MINUTE);
  }

  return result;
};

async function findOne(DBModel, filters) {
  let [allCount, resultData] = await Promise.all([
    1,
    DBModel.modelData.find(filters, "_id").lean()
  ]);

  return { allCount, resultData };
};

async function find(DBModel, filters, skip, limit, order, fields) {
  if (limit === undefined || limit < 0) {
    limit = 20;
  }

  if (skip === undefined || skip < 0) {
    skip = 0;
  }

  if (order === undefined || order === "") {
    order = { CreatedAt: -1 };
  }

  if (fields === undefined) {
    fields = null;
  }

  let queryData = {
    ...filters,
    skip,
    limit,
    order,
    fields,
  }

  //Apply REDIS to optimize mongo
  let cacheFilterKey = DBModel.modelName + "_" + JSON.stringify(queryData);
  let allCount = 0;
  let resultData = await RedisFunction.get(cacheFilterKey);

  //Check if filter already in cached
  if (resultData === undefined || resultData === null) {
    [allCount, resultData] = await Promise.all([
      DBModel.modelData.estimatedDocumentCount(),
      DBModel.modelData.find(filters, fields)
        .limit(limit)
        .skip(skip)
        .sort(order)
        .lean()
    ]);
    RedisFunction.setWithExpire(cacheFilterKey, JSON.stringify(resultData));
  } else {
    resultData = JSON.parse(resultData);
  }

  let cacheCountKey = "COUNT_" + cacheFilterKey;
  let recordCount = await RedisFunction.get(cacheCountKey);

  //Check if counter already in cached
  if (recordCount !== undefined && recordCount !== null) {
    allCount = recordCount * 1;
  } else {

    //Temporary add count to prevent multiple counter
    RedisFunction.setWithExpire(cacheCountKey, allCount);

    //if counter do not exist in cache, then make it count
    DBModel.modelData.find(filters, fields).count().then((countResult) => {
      //and cache the counter result
      RedisFunction.setWithExpire(cacheCountKey, countResult * 1);
    });
  }

  resultData = JSON.parse(JSON.stringify(resultData));
  return { allCount, resultData };
};

function _makeAggregateFilter(filters, startDate, endDate){
  let filterBuilder = {};
  for (let i = 0; i < Object.keys(filters).length; i++) {
    const filterKey = Object.keys(filters)[i];
    filterBuilder[filterKey] = {};
    filterBuilder[filterKey]["$exists"] = true;
    filterBuilder[filterKey]["$ne"] = "";
    filterBuilder[filterKey]["$in"] = [filters[filterKey]];
  }

  let rangeTime = null;
  if (startDate !== undefined && startDate > 0 && startDate !== "") {
    rangeTime = {};
    rangeTime["$gte"] = new Date(startDate);
  }

  if (endDate !== undefined && endDate > 0 && endDate !== "") {
    if (rangeTime === null) {
      rangeTime = {};
    }
    rangeTime["$lte"] = new Date(endDate);
  }
  if (rangeTime !== null) {
    filterBuilder.CreatedAt = rangeTime;
  }
  return filterBuilder;
}

async function _makeDistinctQueryBuilder(DBModel, sourceField, method, filters, startDate, endDate) {
  let filterBuilder = _makeAggregateFilter(filters, startDate, endDate);

  let groupAggregate = {
    $group: {
      _id: `$${sourceField}`
    }
  }
  groupAggregate["$group"][method] = {};

  if(method === "count"){
    groupAggregate["$group"][method][`$sum`] = 1;
  }

  return DBModel.modelData.aggregate([
    {
      $match: filterBuilder
    },
    groupAggregate
  ]);
}

async function countDistinct(DBModel, sourceField, filters, startDate, endDate) {
  let queryBuilder = _makeDistinctQueryBuilder(DBModel, sourceField, "count", filters, startDate, endDate);
  let result = await queryBuilder;
  result = JSON.parse(JSON.stringify(result));
  return result;
};

async function sumDistinct(DBModel, sourceField, filters, startDate, endDate) {
  let queryBuilder = _makeDistinctQueryBuilder(DBModel, sourceField, "sum", filters, startDate, endDate);
  let result = await queryBuilder;
  result = JSON.parse(JSON.stringify(result));
  return result;
};

async function avgDistinct(DBModel, sourceField, filters, startDate, endDate) {
  let queryBuilder = _makeDistinctQueryBuilder(DBModel, sourceField, "avg", filters, startDate, endDate);
  let result = await queryBuilder;
  result = JSON.parse(JSON.stringify(result));
  return result;
};

async function pivotData(DBModel, Row, Column, method, filters, startDate, endDate) {
  let filterBuilder = _makeAggregateFilter(filters, startDate, endDate);

  let groupAggregate = {};
  groupAggregate["$group"]["_id"][`${Row}`] = `$${Row}`;
  groupAggregate["$group"]["_id"][`${Column}`] = `$${Column}`;
  groupAggregate["$group"][method] = {};
  groupAggregate["$group"][method][`$${method}`] = 1;

  return DBModel.modelData.aggregate([
    {
      $match: filterBuilder
    },
    groupAggregate
  ]);
}

async function updateAll(DBModel, filters, dataUpdate) {
  Object.keys(filters).map(key => {
    if (key !== "_id" && key && typeof filters[key] !== "number") {
      filters[key] = new RegExp(filters[key], "i");
    }
  });

  return await DBModel.modelData.updateMany(filters, dataUpdate);
};

module.exports = {
  insert,
  updateAll,
  updateById,
  findOne,
  find,
  findById,
  countDistinct,
  avgDistinct,
  sumDistinct,
  pivotData,
};
