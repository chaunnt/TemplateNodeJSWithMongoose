"use strict";
const RealEstateRecordModel = require("../model/RealEstateRecord");

async function updateValues() {
  console.log("updateValues");

  let fieldName = "AreaProvinceName";
  let orgDataUpdate = {};
  orgDataUpdate[fieldName] = "";
  let recordsUpdate = await RealEstateRecordModel.find(orgDataUpdate).count();
  console.log(recordsUpdate);
  let result = await RealEstateRecordModel.deleteMany(orgDataUpdate);
  console.log(result);
  console.log("DONE");
}

updateValues();
