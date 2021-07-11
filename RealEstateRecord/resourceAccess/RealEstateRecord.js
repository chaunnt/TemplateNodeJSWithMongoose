"use strict";
const RealEstateRecordModel = require("../model/RealEstateRecord");
const Common = require('../../Common/resourceAccess/CommonResourceAccess');

const insert = async datas => {
  return await Common.insert(RealEstateRecordModel, datas);
};

async function updateById(docId, data) {
  return await Common.updateById(RealEstateRecordModel, { _id: docId }, data);
}

async function findById(id, fields) {
  return await Common.findById(RealEstateRecordModel, id, fields);
};

async function findOne(filters) {
  return await Common.findOne(RealEstateRecordModel, filters);
};

async function find (filters, skip, limit, order, fields) {
  return await Common.find (RealEstateRecordModel, filters, skip, limit, order, fields);
};

async function countDistinct (sourceField, filters, startDate, endDate) {
  return await Common.countDistinct (RealEstateRecordModel, sourceField, filters, startDate, endDate);
};

async function sumDistinct (sourceField, filters, startDate, endDate) {
  return await Common.sumDistinct (RealEstateRecordModel, sourceField, filters, startDate, endDate);
};

async function avgDistinct (sourceField, filters, startDate, endDate) {
  return await Common.avgDistinct (RealEstateRecordModel, sourceField, filters, startDate, endDate);
};

async function updateAll (filters, dataUpdate) {
  return await Common.updateAll (RealEstateRecordModel, filters, dataUpdate);
};

async function pivotData(RowField, ColumnField, method, filters, startDate, endDate) {
  return await Common.pivotData(RealEstateRecordModel, RowField, ColumnField, method, filters, startDate, endDate);
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
