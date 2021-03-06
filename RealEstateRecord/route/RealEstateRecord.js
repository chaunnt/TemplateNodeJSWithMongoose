"use strict";
const Manager = require("../manager/RealEstateRecord");
const Joi = require("joi");
const Response = require("../../middleWare/response").setup(Manager);
const middlewareFunctions = require("../../utils/middlewareFunctions");

var realEstateSchema = {
  ActivityContent: Joi.string().allow('').default(''),
  ActivityDate: Joi.string().allow('').default(''),
  ActivityDetail: Joi.string().allow('').default(''),
  ActivityID: Joi.string().allow('').default(''),
  ActivitySource: Joi.string().allow('').default(''),
  AreaCountryName: Joi.string().default(''),
  AreaDistrictName: Joi.string().default(''),
  AreaProvinceName: Joi.string().default(''),
  AreaStateName: Joi.string().allow('').default(''),
  AreaTypeName: Joi.string().default(''),
  AreaWardName: Joi.string().allow('').default(''),
  CommentsContent: Joi.string().allow('').default(''),
  CommentsDate: Joi.string().allow('').default(''),
  CommentsID: Joi.string().allow('').default(''),
  CommentsOwner: Joi.string().allow('').default(''),
  CommentsRelated: Joi.string().allow('').default(''),
  ContactAddress: Joi.string().allow('').default(''),
  ContactAge: Joi.string().allow('').default(''),
  ContactCompany: Joi.string().allow('').default(''),
  ContactDob: Joi.string().allow('').default(''),
  ContactDomain: Joi.string().allow('').default(''),
  ContactEmail: Joi.string().allow('').default(''),
  ContactGender: Joi.string().allow('').default(''),
  ContactIdentity: Joi.string().allow('').default(''),
  ContactJob: Joi.string().allow('').default(''),
  ContactName: Joi.string().allow('').default(''),
  ContactPhone: Joi.string().allow('').default(''),
  ContactPosition: Joi.string().allow('').default(''),
  ContactTypeName: Joi.string().allow('').default(''),
  HouseAbilites: Joi.array().items(Joi.string().allow('').default('')),
  HouseBackYard: Joi.string().allow('').default(''),
  HouseBasement: Joi.string().allow('').default(''),
  HouseBedRooms: Joi.string().allow('').default(''),
  HouseCompleteName: Joi.string().allow('').default(''),
  HouseConstructionHeight: Joi.string().allow('').default(''),
  HouseConstructionSquare: Joi.string().allow('').default(''),
  HouseElectricity: Joi.string().allow('').default(''),
  HouseFloors: Joi.string().allow('').default(''),
  HouseFloorsSquare: Joi.string().allow('').default(''),
  HouseFloorsType: Joi.string().allow('').default(''),
  HouseFrontYard: Joi.string().allow('').default(''),
  HouseFurnitureList: Joi.array().items(Joi.string().allow('').default('')),
  HouseFurnitureName: Joi.string().allow('').default(''),
  HouseGarage: Joi.string().allow('').default(''),
  HouseKitchens: Joi.string().allow('').default(''),
  HouseLivingRooms: Joi.string().allow('').default(''),
  HouseMiddleFloors: Joi.string().allow('').default(''),
  HouseNearbyPlace: Joi.array().items(Joi.string().allow('').default('')),
  HousePool: Joi.string().allow('').default(''),
  HouseQualityName: Joi.string().allow('').default(''),
  HouseRoofType: Joi.string().allow('').default(''),
  HouseStairType: Joi.string().allow('').default(''),
  HouseTerrace: Joi.string().allow('').default(''),
  HouseToilets: Joi.string().allow('').default(''),
  HouseWallType: Joi.string().allow('').default(''),
  HouseWater: Joi.string().allow('').default(''),
  ImagesDroneNearby: Joi.array().items(Joi.string().allow('').default('')),
  ImagesDroneOutSide: Joi.array().items(Joi.string().allow('').default('')),
  ImagesHouse: Joi.array().items(Joi.string().allow('').default('')),
  ImagesInside: Joi.array().items(Joi.string().allow('').default('')),
  ImagesJuridical: Joi.array().items(Joi.string().allow('').default('')),
  ImagesNearBy: Joi.array().items(Joi.string().allow('').default('')),
  ImagesPlanRoadSquare: Joi.array().items(Joi.string().allow('').default('')),
  ImagesPlanUsage: Joi.array().items(Joi.string().allow('').default('')),
  ImagesV360Inside: Joi.array().items(Joi.string().allow('').default('')),
  ImagesV360Outside: Joi.array().items(Joi.string().allow('').default('')),
  JuridicalConstructionSquare: Joi.string().allow('').default(''),
  JuridicalContructionLimitation: Joi.string().allow('').default(''),
  JuridicalFloorSquare: Joi.string().allow('').default(''),
  JuridicalLandCode: Joi.string().allow('').default(''),
  JuridicalLandSquare: Joi.string().allow('').default(''),
  JuridicalLatest: Joi.string().allow('').default(''),
  JuridicalMainConstruction: Joi.string().allow('').default(''),
  JuridicalName: Joi.string().allow('').default(''),
  JuridicalOtherObject: Joi.array().items(Joi.string().allow('').default('')),
  JuridicalPaperCode: Joi.string().allow('').default(''),
  JuridicalStatusName: Joi.string().allow('').default(''),
  JuridicalSubConstructions: Joi.array().items(Joi.string().allow('').default('')),
  JuridicalUpdates: Joi.array().items(Joi.string().allow('').default('')),
  JuridicalUsingStatusName: Joi.string().allow('').default(''),
  LandAgricultureSquare: Joi.string().allow('').default(''),
  LandDefaultSquare: Joi.string().allow('').default(''),
  LandDirectionName: Joi.string().allow('').default(''),
  LandFrontSides: Joi.string().allow('').default(''),
  LandFrontWidth: Joi.string().allow('').default(''),
  LandLong: Joi.string().allow('').default(''),
  LandPlanningTypeName: Joi.string().allow('').default(''),
  LandRealConstructionSquare: Joi.string().allow('').default(''),
  LandRealitySquare: Joi.string().allow('').default(''),
  LandRoadSquare: Joi.string().allow('').default(''),
  LandShapeName: Joi.string().allow('').default(''),
  LandWidth: Joi.string().allow('').default(''),
  LocationDistanceToCityCenter: Joi.string().allow('').default(''),
  LocationFrontStreetWidth: Joi.string().allow('').default(''),
  LocationFullAddress: Joi.string().allow('').default(''),
  LocationHomeNumber: Joi.string().allow('').default(''),
  LocationMapLongLat: Joi.string().allow('').default(''),
  LocationMapLat: Joi.string().allow('').default(''),
  LocationMapLong: Joi.string().allow('').default(''),
  LocationPositionName: Joi.string().allow('').default(''),
  LocationProjectName: Joi.string().allow('').default(''),
  LocationStreetName: Joi.string().allow('').default(''),
  LocationStreetWidth: Joi.string().allow('').default(''),
  LocationTunel: Joi.string().allow('').default(''),
  NegativeInfo: Joi.array().items(Joi.string().allow('').default('')),
  OthersInfo: Joi.array().items(Joi.string().allow('').default('')),
  Plan1ySalePrice: Joi.string().allow('').default(''),
  Plan3mSalePrice: Joi.string().allow('').default(''),
  Plan5ySalePrice: Joi.string().allow('').default(''),
  Plan6mSalePrice: Joi.string().allow('').default(''),
  PlanEvaluation: Joi.string().allow('').default(''),
  PlanInvestmentPoints: Joi.string().allow('').default(''),
  PlanInvestmentRankingName: Joi.string().allow('').default(''),
  PlanInvestmentTypeName: Joi.string().allow('').default(''),
  PlanLoanMaximum: Joi.string().allow('').default(''),
  PlanLoanPayRateMonthly: Joi.string().allow('').default(''),
  PlanLoanPercentage: Joi.string().allow('').default(''),
  PlanLoanTime: Joi.string().allow('').default(''),
  PlanProfitPercentage: Joi.string().allow('').default(''),
  PlanRentPrice: Joi.string().allow('').default(''),
  PlanRentUnitPrice: Joi.string().allow('').default(''),
  PositiveInfo: Joi.array().items(Joi.string().allow('').default('')),
  SystemAnalysisLevel: Joi.string().allow('').default(''),
  SystemCollectionPoints: Joi.string().allow('').default(''),
  SystemCreatorName: Joi.string().allow('').default(''),
  SystemDateOfPost: Joi.string().allow('').default(''),
  SystemInfoConfirmStatusName: Joi.string().allow('').default(''),
  SystemInfoSecurityLevelName: Joi.string().allow('').default(''),
  SystemInfoUsingStatusName: Joi.string().allow('').default(''),
  SystemInfoVisibleStatus: Joi.string().allow('').default(''),
  SystemInfomationRankingName: Joi.string().allow('').default(''),
  SystemLastActiveDate: Joi.string().allow('').default(''),
  SystemModifierName: Joi.string().allow('').default(''),
  SystemNote: Joi.string().allow('').default(''),
  SystemPostType: Joi.string().allow('').default(''),
  SystemPostUrl: Joi.string().allow('').default(''),
  SystemRecordContent: Joi.string().allow('').default(''),
  SystemRecordTitle: Joi.string().allow('').default(''),
  SystemRecordType: Joi.string().allow('').default(''),
  SystemSourceLink: Joi.string().allow('').default(''),
  SystemSourceName: Joi.string().allow('').default(''),
  SystemSourceType: Joi.string().allow('').default(''),
  SystemViewCount: Joi.string().allow('').default(''),
  SystemViewerName: Joi.array().items(Joi.string().allow('').default('')),
  ValueDiscussPrice: Joi.string().allow('').default(''),
  ValueHousePrice: Joi.string().allow('').default(''),
  ValueHouseUnitPrice: Joi.string().allow('').default(''),
  ValueLandPrice: Joi.string().allow('').default(''),
  ValueLandUnitPrice: Joi.string().allow('').default(''),
  ValueRentPrice: Joi.string().allow('').default(''),
  ValueRentUnitPrice: Joi.string().allow('').default(''),
  ValueSalePrice: Joi.string().allow('').default(''),
  ValueSaleUnitPrice: Joi.string().allow('').default(''),
  AgencyReason: Joi.string().allow('').default(''),
  OwnerReason: Joi.string().allow('').default(''),
  SystemCrawlingStatus: Joi.string().allow('').default('NotCrawled'),
  SystemSourceType: Joi.string().allow('').default('Rao vặt'),
  SystemAnalysisLevel: Joi.string().allow('').default('Raw'),
};

module.exports = {
  create: {
    tags: ["api", "Real Estate"],
    description: "insert real estate target url",
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
              ...realEstateSchema
            })
          )
      }),
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: (req, res) => {
      Response(req, res, "addRawRecords");
    }
  },
  getList: {
    tags: ["api", "Real Estate"],
    description: "get short list real estate",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        filter: Joi.object({
          AreaDistrictName: Joi.string().default('Quận Gò Vấp'),
          AreaProvinceName: Joi.string().default('Thành phố Hồ Chí Minh'),
          AreaTypeName: Joi.string().default('Nhà phố'),
          SystemPostType: Joi.string().default('Rao bán'),
        }).unknown(),
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
    tags: ["api", "Real Estate"],
    description: "get full list real estate",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        filter: Joi.object({
          AreaDistrictName: Joi.string().default('Quận Gò Vấp'),
          AreaProvinceName: Joi.string().default('Thành phố Hồ Chí Minh'),
          AreaTypeName: Joi.string().default('Nhà phố'),
          SystemPostType: Joi.string().default('Rao bán'),
        }).unknown(),
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
    tags: ["api", "Real Estate"],
    description: "get real estate",
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
    tags: ["api", "Real Estate"],
    description: "update real estate",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        id: Joi.string().required(),
        ...realEstateSchema
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
    tags: ["api", "Real Estate"],
    description: "update real estate",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      payload: Joi.object({
        SystemSourceLink: Joi.string().required(),
        ...realEstateSchema
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
    tags: ["api", "Real Estate"],
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
  getAreaMeta: {
    tags: ["api", "Real Estate"],
    description: "get Area Meta data",
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
      Response(req, res, "getAreaMeta");
    }
  },
  getLanguageMeta: {
    tags: ["api", "Real Estate"],
    description: "get Language Meta data",
    pre: [
      { method: middlewareFunctions.verifyPermission }
    ],
    validate: {
      headers: Joi.object({
        Authorization: Joi.string()
      }).options({ allowUnknown: true })
    },
    handler: function (req, res) {
      Response(req, res, "getLanguageMeta");
    }
  },
  getCalculateMeta: {
    tags: ["api", "Real Estate"],
    description: "get Calculation Meta data",
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
      Response(req, res, "getCalculateMeta");
    }
  }
};
