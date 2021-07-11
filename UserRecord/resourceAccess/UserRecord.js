"use strict";
const UserRecordModel = require("../model/UserRecord");
const Common = require('../../Common/resourceAccess/CommonResourceAccess');

async function insert (datas) {
  return await Common.insert(UserRecordModel, datas);
};

async function updateById(docId, data) {
  return await Common.updateById(UserRecordModel, { _id: docId }, data);
};

async function findById(id, fields) {
  return await Common.findById(UserRecordModel, id, fields);
};

async function findOne(filters) {
  return await Common.findOne(UserRecordModel, filters);
};

async function find (filters, skip, limit, order, fields) {
  return await Common.find (UserRecordModel, filters, skip, limit, order, fields);
};

async function countDistinct (sourceField, filters, startDate, endDate) {
  return await Common.countDistinct (UserRecordModel, sourceField, filters, startDate, endDate);
};

async function sumDistinct (sourceField, filters, startDate, endDate) {
  return await Common.sumDistinct (UserRecordModel, sourceField, filters, startDate, endDate);
};

async function avgDistinct (sourceField, filters, startDate, endDate) {
  return await Common.avgDistinct (UserRecordModel, sourceField, filters, startDate, endDate);
};

async function updateAll (filters, dataUpdate) {
  return await Common.updateAll (UserRecordModel, filters, dataUpdate);
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

