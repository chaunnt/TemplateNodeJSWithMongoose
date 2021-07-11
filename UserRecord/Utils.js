"use strict";
var fs = require("fs");

const Constant = require("./Constant");

function convertQueryToUserRecordSchema(query) {
  return Utilities.convertQueryToSchema(query, Constant.metadata);
}

function convertUserRecordSchemaToQuery(schema) {
  return Utilities.convertSchemaToQuery(schema, Constant.metadata);
}

module.exports = {
  convertQueryToUserRecordSchema,
  convertUserRecordSchemaToQuery
};
