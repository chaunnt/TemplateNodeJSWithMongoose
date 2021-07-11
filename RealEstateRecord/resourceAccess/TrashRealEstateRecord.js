"use strict";
const TrashRealEstateRecordModel = require("../model/TrashRealEstateRecord");
const Common = require('../../Common/resourceAccess/CommonResourceAccess');

const insert = async datas => {
  return await Common.insert(TrashRealEstateRecordModel, datas);
};

async function updateById(docId, data) {
  return await Common.updateById(TrashRealEstateRecordModel, { _id: docId }, data);
}

async function findById(id, fields) {
  return await Common.findById(TrashRealEstateRecordModel, id, fields);
};

async function findOne(filters) {
  return await Common.findOne(TrashRealEstateRecordModel, filters);
};

async function find (filters, skip, limit, order, fields) {
  return await Common.find (TrashRealEstateRecordModel, filters, skip, limit, order, fields);
};

async function countDistinct (sourceField, filters, startDate, endDate) {
  return await Common.countDistinct (TrashRealEstateRecordModel, sourceField, filters, startDate, endDate);
};

async function sumDistinct (sourceField, filters, startDate, endDate) {
  return await Common.sumDistinct (TrashRealEstateRecordModel, sourceField, filters, startDate, endDate);
};

async function avgDistinct (sourceField, filters, startDate, endDate) {
  return await Common.avgDistinct (TrashRealEstateRecordModel, sourceField, filters, startDate, endDate);
};

async function updateAll (filters, dataUpdate) {
  return await Common.updateAll (TrashRealEstateRecordModel, filters, dataUpdate);
};

async function pivotData(RowField, ColumnField, method, filters, startDate, endDate) {
  return await Common.pivotData(TrashRealEstateRecordModel, RowField, ColumnField, method, filters, startDate, endDate);
}

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
