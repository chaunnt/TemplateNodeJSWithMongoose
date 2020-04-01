/**
 * Created by A on 7/18/17.
 */
"use strict";
const Camera = require("../resourceAccess/Camera");

const insert = async (req) => {
    let datas = req.payload;

    let insertResult = await Camera.insertMany(datas);

    return { message: "Success", data: insertResult, statusCode: 200 };
};

const find = async (req) => {
    let filter = req.payload.filter;
    let skip = req.payload.skip;
    if(skip === undefined || skip < 0){
        skip = 0;
    }

    let limit = req.payload.limit;
    if(limit === undefined || limit < 20){
        limit = 20;
    }

    let findResult = await Camera.find(filter, skip, limit);

    return { message: "Success", data: findResult, statusCode: 200 };
};

const findById = async (req) => {
    let id = req.payload.id;

    let findResult = await Camera.findById(id);

    return { message: "Success", data: findResult, statusCode: 200 };
};

module.exports = {
  insert,
  find,
  findById,
};
