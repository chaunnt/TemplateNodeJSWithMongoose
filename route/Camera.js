/**
 * Created by A on 7/18/17.
 */
"use strict";
const Manager = require("../manager/Camera");
const Joi = require("joi");
const Response = require("./response").setup(Manager);

const CameraSchema = Joi.object({
  camera: Joi.object({
    owner: Joi.string(),
    camera_name: Joi.string(),
    view_type: Joi.string(),
    camera_url: Joi.string(),
    location: {
      address: Joi.string(),
      latitude: Joi.string(),
      longitude: Joi.string()
    },
    scale: Joi.number(),
    jam_min_time: Joi.number(),
    skip_frame: Joi.number()
  }),
  settings: Joi.object({
    outputPolygon: Joi.array()
      .items(Joi.string())
      .min(4),
    rois: Joi.array()
      .items(
        Joi.object({
          x1: Joi.number(),
          y1: Joi.number(),
          x2: Joi.number(),
          y2: Joi.number()
        })
      )
      .max(4),
    jam_level: {
      high: {
        speed: Joi.string(),
        car_count: Joi.string()
      },
      medium: {
        speed: Joi.string(),
        car_count: Joi.string()
      },
      low: {
        speed: Joi.string(),
        car_count: Joi.string()
      }
    }
  })
});

module.exports = {
  insertMany: {
    tags: ["api", "Camera"],
    description: "insert cameras",
    // pre: [
    //     { method: verifyUniqueUser }
    // ],
    validate: {
      payload: Joi.array().items(CameraSchema)
    },
    handler: function(req, res) {
      Response(req, res, "insert");
    }
  },
  find: {
    tags: ["api", "Camera"],
    description: "find cameras",
    // pre: [
    //     { method: verifyUniqueUser }
    // ],
    validate: {
      payload: Joi.object({
        filter: CameraSchema,
        skip: Joi.number(),
        limit: Joi.number()
      })
    },
    handler: function(req, res) {
      Response(req, res, "find");
    }
  },
  findById: {
    tags: ["api", "Camera"],
    description: "find cameras by id",
    // pre: [
    //     { method: verifyUniqueUser }
    // ],
    validate: {
      payload: Joi.object({
        id: Joi.string()
      })
    },
    handler: function(req, res) {
      Response(req, res, "findById");
    }
  }
};
