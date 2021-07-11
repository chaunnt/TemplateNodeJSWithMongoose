"use strict";
var fs = require("fs");
const URResource = require("../resourceAccess/UserRecord");
const URFunctions = require("../Functions");
const URUtils = require("../Utils");
const {
  payloadError,
  success,
  interalError
} = require("../../config/constant").messages;


async function addRecords(req) {
  let data = req.payload.data;

  if (!data) {
    return payloadError;
  }

  try {
    let result = await URFunctions.addRecords(data);

    if(result === true){
      return success;
    }
  } catch (err) {
    console.error("addRecords ERROR");
    console.error(err);
  }

  return interalError;
}

async function updateById(req) {
  let data = req.payload;

  if (!data) {
    return payloadError;
  }

  try {
    await URResource.updateById(data.id, data);
    return success;
  } catch (err) {
    console.error("updateById ERROR");
    console.error(err);
    return interalError;
  }
}

async function updateByUrl(req) {
  let data = req.payload;

  if (!data) {
    return payloadError;
  }

  try {
    await URResource.updateAll({SystemSourceLink: data.SystemSourceLink}, data);
    return success;
  } catch (err) {
    console.error("updateById ERROR");
    console.error(err);
    return interalError;
  }
}

async function getList(req) {
  const FIELD_LIST = [
    "ContactName",
    "ContactPhone",
    "ContactAddress",
    "ContactWorkingAddress",
    "ContactEmail",
    "SystemDateOfPost",
    "ActionDetail",
    "ActionType",
    "ActionBusinessCategory",
    "ActionBusiness",
  ];

  const result = await URResource.find(
    req.payload.filter,
    req.payload.skip,
    req.payload.limit,
    req.payload.order,
    FIELD_LIST
  );

  if (result !== undefined) {
    return {
      ...success,
      data: result
    };
  } else {
    return interalError;
  }
}

async function getListFull(req) {
  const result = await URResource.find(
    req.payload.filter,
    req.payload.skip,
    req.payload.limit,
    req.payload.order,
    undefined
  );

  if (result !== undefined) {
    return {
      ...success,
      data: result
    };
  } else {
    return interalError;
  }
}

async function searchById(req) {
  let id = req.payload.id;
  const result = await URResource.findById(id);

  if (result !== undefined) {
    return {
      ...success,
      data: result
    };
  } else {
    return interalError;
  }
}

module.exports = {
  addRecords,
  searchById,
  updateById,
  getList,
  updateByUrl,
  getListFull
};
