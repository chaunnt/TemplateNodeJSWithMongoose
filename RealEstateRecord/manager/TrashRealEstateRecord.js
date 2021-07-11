"use strict";
var fs = require("fs");
const RERResource = require("../resourceAccess/RealEstateRecord");
const UserRecordFunction = require("../../UserRecord/Functions");
const UserProfileFunction = require("../../UserProfile/Functions");

const {
  payloadError,
  success,
  interalError
} = require("../../config/constant").messages;

//2021-03-19 ChauNNT
//cache list source Link to check if it was duplicated
//it will help prevent over-usage checking unique by using database
let cacheUrlList = [];

async function addTrashRecords(req) {
  let data = req.payload.data;

  if (!data) {
    return payloadError;
  }
  try {
    var pushData = [];

    console.log("data lenght", data.length);

    for (var i = 0; i < data.length; i++) {
      var doc = data[i];

      //2021-03-19 ChauNNT
      //cache list source Link to check if it was duplicated
      // console.log("cacheUrlList", JSON.stringify(cacheUrlList));
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
      let existed = await RERResource.findOne({
        SystemSourceLink: doc.SystemSourceLink
      });
      console.log("doc.SystemSourceLink", doc.SystemSourceLink);
      console.log("existed", JSON.stringify(existed));

      if (existed.resultData.length > 0) {
        continue;
      }

      //make date of post to be lastest update date on first storing
      if (doc.SystemDateOfPost !== undefined && doc.SystemDateOfPost !== '') {
        doc.ActivatedAt = doc.SystemDateOfPost;
      }

      doc.ViewCount = Math.floor(Math.random() * Math.floor(1000));
      doc.ClickCount = Math.floor(Math.random() * Math.floor(100));
      doc.ShareCount = Math.floor(Math.random() * Math.floor(30));
      doc.PhoneCallCount = Math.floor(Math.random() * Math.floor(20));
      doc.MessageCallCount = Math.floor(Math.random() * Math.floor(50));
      doc.InvestmentRating = Math.floor(Math.random() * Math.floor(200));
      doc.DataRating = Math.floor(Math.random() * Math.floor(200));

      pushData.push(doc);

    }

    if (pushData.length > 0) {
      const result = await RERResource.insert(pushData);

      //Extract user record from real estate record
      {
        let userRecordPushData = [];
        let userProfilePushData = [];
        for (let recordCounter = 0; recordCounter < pushData.length; recordCounter++) {
          let userRecord = UserRecordFunction.convertRealEstateRecordToUserRecord(pushData[recordCounter]);
          let userProfile = UserProfileFunction.convertRealEstateRecordToUserProfile(pushData[recordCounter]);
          userRecordPushData.push(userRecord);
          userProfilePushData.push(userProfile);
        }

        UserRecordFunction.addRecords(userRecordPushData);
        UserProfileFunction.addRecords(userProfilePushData).then(() => {
          userProfilePushData.forEach(profile => {
            UserProfileFunction.analysisRealEstateAgency(profile.ContactPhone);
          });
        });
      }

      //Distribute to webhooks of partners
      {
        if (result !== undefined) {
          HookerManager.distributeToHookers(pushData);
          return success;
        }
      }
    }
    return success;
  } catch (err) {
    console.error("addRawRecords ERROR");
    console.error(err);
  }

  return interalError;
}

module.exports = {
  addTrashRecords,
};
