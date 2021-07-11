"use strict";

const {LanguageMetaData} = require('./AppConstants');

function removeEmptyFields(obj) {
  Object.keys(obj).forEach(function(key) {
    (obj[key] && typeof obj[key] === "object" && removeEmptyFields(obj[key])) ||
      ((obj[key] === "" || obj[key] === null) && delete obj[key]);
  });
  return obj;
}

function convertPriceToText(price) {
  const MILLION = 1000000;
  const BILLION = 1000000000;
  let value = price * 1;
  let output = "";
  if (value > BILLION) {
    let billions = parseInt(value / BILLION);
    let millions = parseInt((value - billions * BILLION) / MILLION);
    output = billions + " tỷ " + millions + " triệu ";
  } else if (value > MILLION) {
    let millions = parseInt(value / MILLION);
    output = millions + " triệu ";
  }
  return output;
}

function convertQueryToSchema(query, metadata) {
  let queryKeys = Object.keys(query);
  let metaKeys = Object.keys(metadata);
  let schemaObj = {};
  for (let i = 0; i < queryKeys.length; i++) {
    const key = queryKeys[i];
    for (let j = 0; j < metaKeys.length; j++) {
      const metaKey = metaKeys[j];
      if (metadata[metaKey].shortcut === key) {
        schemaObj[metaKey] = query[key];
        break;
      }
    }
  }
  return schemaObj;
}

function convertSchemaToQuery(schema, metadata) {
  let schemaKeys = Object.keys(schema);

  let metaKeys = Object.keys(metadata);

  let queryObj = {};
  for (let i = 0; i < schemaKeys.length; i++) {
    const key = schemaKeys[i];
    for (let j = 0; j < metaKeys.length; j++) {
      const metaKey = metaKeys[j];
      if (metaKey === key) {
        queryObj[metadata[metaKey].shortcut] = schema[key];
        break;
      }
    }
  }
  return queryObj;
}

const languageList = LanguageMetaData.Language.values;
//get language code in lower case
function getLanguageCodeByName(languageStr) {
  if(languageStr !== undefined && languageStr !== "" && languageStr.length > 1){
    let language = languageStr.split("-").pop().toUpperCase();
    for (var i = 0; i < languageList.length; i++) {
      if(languageList[i].toUpperCase().indexOf(language) > -1){
        return language.toLowerCase().trim();
      }
    }
  }
  return "vi";
}

module.exports = {
    removeEmptyFields,
    convertPriceToText,
    convertSchemaToQuery,
    convertQueryToSchema,
    getLanguageCodeByName,
};
