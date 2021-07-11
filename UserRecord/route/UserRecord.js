"use strict";
const Manager = require("../manager/UserRecord");
const Joi = require("joi");
const Response = require("../../middleWare/response").setup(Manager);
const middlewareFunctions = require("../../utils/middlewareFunctions");
const { schemaData } = require("../model/UserRecord");

module.exports = {
  create: {
    tags: ["api", "User Record"],
    description: "insert an user record",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        data: Joi.array()
          .required()
          .items(
            Joi.object().keys({
              SystemSourceLink: Joi.string().required(),
              ...schemaData
            })
          )
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "addRecords");
    }
  },
  getList: {
    tags: ["api", "User Record"],
    description: "get short list of user record",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        filter: Joi.object().unknown(),
        skip: Joi.number()
          .required()
          .default(0),
        limit: Joi.number()
          .required()
          .default(20),
        order: Joi.object().unknown()
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "getList");
    }
  },
  getListFull: {
    tags: ["api", "User Record"],
    description: "get full list User Record",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        filter: Joi.object().unknown(),
        skip: Joi.number()
          .required()
          .default(0),
        limit: Joi.number()
          .required()
          .default(20)
          .max(50),
        order: Joi.object().unknown()
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "getListFull");
    }
  },
  searchById: {
    tags: ["api", "User Record"],
    description: "get User Record",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object().keys({
        id: Joi.string().required()
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "searchById");
    }
  },
  updateById: {
    tags: ["api", "User Record"],
    description: "update User Record",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        id: Joi.string().required(),
        ...schemaData
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "updateById");
    }
  },
  updateByUrl: {
    tags: ["api", "User Record"],
    description: "update User Record",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        SystemSourceLink: Joi.string().required(),
        ...schemaData
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "updateByUrl");
    }
  },
  getOtherMeta: {
    tags: ["api", "User Record"],
    description: "get Meta data list",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        language: Joi.string().default("Tiếng Việt - Vietnamese - VI"),
      }).unknown(true).allow(null),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: function (req, res) {
      Response(req, res, "getOtherMeta");
    }
  },
};
