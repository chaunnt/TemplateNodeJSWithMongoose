"use strict";
require('dotenv').config();

const URResource = require("./resourceAccess/UserRecord");
const {schemaData} = require('./model/UserRecord');
let cacheUrlList = [];

const NoError = true;
const HasError = false;
async function addRecords(data){
  var pushData = [];

  for (var i = 0; i < data.length; i++) {
    var doc = data[i];

    //cache list source Link to check if it was duplicated
    //it will help prevent over-usage checking unique by using database
    if (cacheUrlList.indexOf(doc.SystemSourceLink) > -1) {
      continue;
    } else {
      cacheUrlList.unshift(doc.SystemSourceLink);
      if (cacheUrlList.length > 5000) {
        cacheUrlList.pop();
      }
    }

    //Check duplicated link in database
    let existed = await URResource.findOne({
      SystemSourceLink: doc.SystemSourceLink
    });

    if (existed.resultData.length > 0) {
      continue;
    }

    //make date of post to be lastest update date on first storing
    if (doc.SystemDateOfPost !== undefined && doc.SystemDateOfPost !== '') {
      doc.ActivatedAt = doc.SystemDateOfPost;
    }

    pushData.push(doc);
  }

  if (pushData.length > 0) {
    let result = await URResource.insert(pushData);
    if(result !== undefined){
      return NoError;
    }
  } else {
    return NoError;
  }
  return HasError;
}

function convertRealEstateRecordToUserRecord(realestate){
  let keyList = Object.keys(realestate);
  let userRecord = {};
  for (let keyCounter = 0; keyCounter < keyList.length; keyCounter++) {
    const key = keyList[keyCounter];
    if(Object.keys(schemaData).indexOf(key) > -1){
      userRecord[key] = realestate[key];
    }
  }
  userRecord.ActionDetail	= ["Rao vặt BDS"];
  userRecord.ActionType	= ["Rao Vặt"];
  userRecord.ActionBusinessCategory	= ["Bất động sản"]
  userRecord.ActionBusiness	= ["Bất động sản"];

  return userRecord;
}
module.exports = {
  addRecords,
  convertRealEstateRecordToUserRecord
};
