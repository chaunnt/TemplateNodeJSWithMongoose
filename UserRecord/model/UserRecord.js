"use strict";
const mongoose = require("../../config/database").mongoose,
  Schema = mongoose.Schema,
  modelName = "UserRecord";
const Joi = require("joi");
const modelSchema = new Schema(
  {
    SystemSourceLink: {
      type: String,
      index: true,
      unique: true
    },
  },
  {
    strict: false,
    versionKey: false,
    autoIndex: true,
    timestamps: {
      createdAt: "CreatedAt",
      updatedAt: "UpdatedAt"
    }
  }
);

//Query normal list index
modelSchema.index({
  AreaCountryName: 1,
  AreaDistrictName: 1,
  AreaProvinceName: 1,
  AreaStateName: 1,
  AreaWardName: 1,
  AreaTypeName: 1,
  AreaStreetName: 1,
  AreaFullAddress: 1,
  ContactWorkingAddress: 1,
  ContactAddress: 1,
  CreatedAt: -1,
  UpdatedAt: -1,
  ActivatedAt: -1,
}); // schema level

//Query for marketing list
modelSchema.index({
  AreaCountryName: 1,
  AreaDistrictName: 1,
  AreaProvinceName: 1,
  AreaStateName: 1,
  AreaWardName: 1,
  AreaTypeName: 1,
  AreaStreetName: 1,
  CreatedAt: -1,
  UpdatedAt: -1,
  ActivatedAt: -1,
}); // schema level

//Index for search contact
modelSchema.index({
  ContactAddress: 1,
  ContactEmail: 1,
  ContactPhone: 1,
  ContactWorkingAddress: 1,
  ContactAddress: 1,
}); // schema level

//Index for search contact
modelSchema.index({
  ContactAddress: 1,
  ContactEmail: 1,
  ContactPhone: 1,
}); // schema level

const schemaData = {
  AreaCountryName: Joi.string(),
  AreaStateName: Joi.string(),
  AreaProvinceName: Joi.string(),
  AreaDistrictName: Joi.string(),
  AreaWardName: Joi.string(),
  AreaStreetName: Joi.string(),
  AreaFullAddress: Joi.string(),
  AreaWardName: Joi.string(),
  PhoneNumber: Joi.string(),
  PhoneAreaCode: Joi.string(),
  PhoneProviderName: Joi.string(),
  PhoneNumberType: Joi.string(),
  ContactTypeName: Joi.string(),
  ContactName: Joi.string(),
  ContactAge: Joi.string(),
  ContactDob: Joi.string(),
  ContactGender: Joi.string(),
  ContactPhone: Joi.string(),
  ContactAddress: Joi.string(),
  ContactIdentity: Joi.string(),
  ContactPosition: Joi.string(),
  ContactDomain: Joi.string(),
  ContactJob: Joi.string(),
  ContactCompany: Joi.string(),
  ContactTaxId: Joi.string(),
  ContactWorkingAddress: Joi.string(),
  ContactEmail: Joi.string(),
  SystemInfoConfirmStatusName: Joi.string(),
  SystemSourceName: Joi.string(),
  SystemSourceType: Joi.string(),
  SystemSourceLink: Joi.string(),
  SystemDateOfPost: Joi.string(),
  SystemNote: Joi.string(),
  ActionDetail: Joi.array().items(Joi.string()),
  ActionType: Joi.array().items(Joi.string()),
  ActionBusinessCategory: Joi.array().items(Joi.string()),
  ActionBusiness: Joi.array().items(Joi.string()),
};

const model = mongoose.model(modelName, modelSchema);
module.exports = {
  modelData: model,
  modelName: modelName,
  schemaData: schemaData
};
