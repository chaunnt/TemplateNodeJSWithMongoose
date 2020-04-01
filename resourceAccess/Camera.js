"use strict";
const Camera = require("../model/Camera");

const insertMany = async datas => {
  return await Camera.insertMany(datas);
};

const findById = async id => {
  return await Camera.findById(id);
};

const find = async (filters, skip, limit, order) => {
  if (!limit || limit < 0) {
    limit = 10;
  }

  if (!skip || skip < 0) {
    skip = 0;
  }

  if (!order || order === "") {
    order = { updated_at: -1 };
  }

  const [allCount, resultData] = await Promise.all([
    Camera.count(filters),
    Camera.find(filters)
      .limit(limit)
      .skip(skip)
      .sort(order)
  ]);
  return { allCount, resultData };
};

module.exports = {
  insertMany,
  find,
  findById
};
