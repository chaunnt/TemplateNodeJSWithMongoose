"use strict";
require('dotenv').config();
const RERResource = require("./resourceAccess/RealEstateRecord");

async function getRecordsList(filter, skip, limit, order, fieldsList) {
  try {
    let fields = '';
    if (fieldsList !== undefined && fieldsList !== "" && fieldsList.length > 0) {
      fields = fieldsList
      fields = fields.join(' ');
    }

    console.log("fields_1", JSON.stringify(fields));

    const result = await RERResource.find(
      filter,
      skip,
      limit,
      order,
      fields
    );
    return result;
  } catch (err) {
    console.error("getRecordsList ERROR");
    console.error(err);
    return undefined;
  }
}

module.exports = {
  getRecordsList
};
