"use strict";
const mongoose = require("../config/database").mongoose,
  Schema = mongoose.Schema,
  modelName = "cameras";

const cameraSchema = new Schema(
  {},
  {
    strict: false,
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

cameraSchema.index({
  camera: 1,
  settings: 1
}); // schema level

const model = mongoose.model(modelName, cameraSchema);
module.exports = model;
