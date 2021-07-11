"use strict";
var fs = require("fs");
const RERResource = require("../resourceAccess/RealEstateRecord");
const RERFunctions = require("../Functions");
const Utilities = require('../../utils/utilities');
const SystemUtils = require("../../utils/utilities");
const RedisInstance = require("../../ThirdParty/Redis/RedisInstance");
const UserRecordFunction = require("../../UserRecord/Functions");

const {
  payloadError,
  success,
  interalError
} = require("../../config/constant").messages;

const {LanguageMetaData} = require('../../utils/AppConstants');

//2021-03-19 ChauNNT
//cache list source Link to check if it was duplicated
//it will help prevent over-usage checking unique by using database
let cacheUrlList = [];

async function addRawRecords(req) {
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
        for (let recordCounter = 0; recordCounter < pushData.length; recordCounter++) {
          let userRecord = UserRecordFunction.convertRealEstateRecordToUserRecord(pushData[recordCounter]);
          userRecordPushData.push(userRecord);
        }

        UserRecordFunction.addRecords(userRecordPushData);
      }
    }
    return success;
  } catch (err) {
    console.error("addRawRecords ERROR");
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
    const result = await RERResource.updateById(data.id, data.doc);
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
    await RERResource.updateAll({SystemSourceLink: data.SystemSourceLink}, data);
    return success;
  } catch (err) {
    console.error("updateById ERROR");
    console.error(err);
    return interalError;
  }
}

async function getList(req) {
  const FIELD_LIST = [
    "AreaCountryName",
    "AreaDistrictName",
    "AreaProvinceName",
    "AreaTypeName",
    "AreaWardName",
    "ContactTypeName",
    "HouseFloors",
    "JuridicalName",
    "LandLong",
    "LandWidth",
    "LocationDistanceToCityCenter",
    "LocationFrontStreetWidth",
    "LandAgricultureSquare",
    "ValueRentUnitPrice",
    "ValueSalePrice",
    "ValueSaleUnitPrice",
    "CreatedAt",
    "UpdatedAt",
  ];

  const result = await RERFunctions.getRecordsList(
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
  const result = await RERFunctions.getRecordsList(
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
  try {

    //2021-03-19 ChauNNT
    //cache data if it was fetched
    //it will help prevent over-usage checking unique by using database
    const DETAIL_REALESTATE_KEY = process.env.NODE_ENV + "_DETAIL_REALESTATE_KEY_" + id;
    let cachedData = await RedisInstance.get(DETAIL_REALESTATE_KEY);

    if (cachedData !== "" && cachedData !== null) {
      return cachedData;
    }

    let result = await RERResource.findById(id);
    result = SystemUtils.removeEmptyFields(result);

    //2021-03-19 ChauNNT
    //cache data if it was fetched
    //it will help prevent over-usage checking unique by using database
    if (cachedData === "" || cachedData === null) {
      //cache in 1 HOUR
      const ONE_HOUR = 60 * 60;
      RedisInstance.setWithExpire(DETAIL_REALESTATE_KEY, JSON.stringify(result), ONE_HOUR);
    }

    return {
      ...success,
      data: result
    };
  } catch (err) {
    console.error("searchById ERROR");
    console.error(err);
    return interalError;
  }
}

function _getDataFolderByLanguage(language) {
  let languageCode = Utilities.getLanguageCodeByName(language);
  let dataFolder = 'data/';
  if (languageCode !== 'vi') {
    dataFolder = 'translation/' + languageCode + '/';
  }
  return dataFolder;
}

async function getOtherMeta(req) {
  return new Promise((resolve, reject) => {
    let language = req.payload === null ? undefined : req.payload.language;
    if (language === null) {
      language = undefined;
    }
    let dataFolder = _getDataFolderByLanguage(language);
    fs.readFile(`RealEstateRecord/${dataFolder}metadata.json`, (err, data) => {
      if (err) {
        console.error(err);
        reject(interalError);
      }
      let result = JSON.parse(data);

      resolve({
        ...success,
        data: result
      });
    });
  });
}

async function getAreaMeta(req) {
  return new Promise((resolve, reject) => {
    let language = req.payload === null ? undefined : req.payload.language;
    if (language === null) {
      language = undefined;
    }
    let dataFolder = _getDataFolderByLanguage(language);
    fs.readFile(`RealEstateRecord/${dataFolder}areadata.json`, (err, data) => {
      if (err) {
        console.error(err);
        reject(interalError);
      }

      let result = JSON.parse(data);

      resolve({
        ...success,
        data: result
      });
    });
  });
}

async function getLanguageMeta(req) {
  return new Promise((resolve, reject) => {
    resolve({
      ...success,
      data: LanguageMetaData
    });
  });
}

async function getCalculateMeta(req) {
  return new Promise((resolve, reject) => {
    let language = req.payload === null ? undefined : req.payload.language;
    if (language === null) {
      language = undefined;
    }
    let dataFolder = _getDataFolderByLanguage(language);
    fs.readFile(`RealEstateRecord/${dataFolder}calculatemeta.json`, (err, data) => {
      if (err) {
        console.error(err);
        reject(interalError);
      }

      let result = JSON.parse(data);

      resolve({
        ...success,
        data: result
      });
    });
  });
}

module.exports = {
  addRawRecords,
  searchById,
  updateById,
  getList,
  updateByUrl,
  getOtherMeta,
  getAreaMeta,
  getLanguageMeta,
  getCalculateMeta,
  getListFull
};
