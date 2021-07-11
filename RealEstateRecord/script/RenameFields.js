"use strict";
const RealEstateRecordModel = require("../model/RealEstateRecord");

let needToAdd = [
  // "ViewCount",
  // "ClickCount",
  // "ShareCount",
  // "InvestmentRating",
  // "DataRating",
  // "CreatedAt",
  // "UpdatedAt",
  "CreatedAt",
  "UpdatedAt",
];

let needToRename = [
  // "viewCount",
  // "clickCount",
  // "shareCount",
  // "investmentRating",
  // "dataRating",
  // "created_at",
  // "updated_at",
  "createdAt",
  "updatedAt",
];

async function renameFields(fieldNameList, newNameList) {
  console.log("syncFields");
  console.log(fieldNameList);
  if (fieldNameList === undefined || fieldNameList.length <= 0) {
    console.log("not have old name");
    return;
  }
  if (newNameList === undefined || newNameList.length <= 0) {
    console.log("not have new name");
    return;
  }
  if (newNameList.length !== fieldNameList.length) {
    console.log("not match field list");
    return;
  }
  console.log(newNameList);
  for (var i = 0; i < fieldNameList.length; i++) {
    let rename = {};
    rename[fieldNameList[i]] = newNameList[i];
    let renameFilter = { $rename: rename };

    console.log(renameFilter);
    let result = await RealEstateRecordModel.collection.updateMany({}, renameFilter );
    console.log(result.result);
  }
}

// renameFields(needToRename, needToAdd);
