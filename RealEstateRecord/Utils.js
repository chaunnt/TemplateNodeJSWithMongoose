"use strict";
var fs = require("fs");

const Constant = require("./Constant");
const Utilities = require("../utils/utilities");

function convertQueryToRealEstateSchema(query) {
  return Utilities.convertQueryToSchema(query, Constant.metadata);
}

function convertRealestateSchemaToQuery(schema) {
  return Utilities.convertSchemaToQuery(schema, Constant.metadata);
}

module.exports = {
  convertQueryToRealEstateSchema,
  convertRealestateSchemaToQuery,
};
