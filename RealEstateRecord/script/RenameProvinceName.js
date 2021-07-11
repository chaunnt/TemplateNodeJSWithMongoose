"use strict";

var fs = require("fs");

const RealEstateRecordModel = require("../model/RealEstateRecord");

async function getAreaMeta() {
  return new Promise((resolve, reject) => {
    fs.readFile("RealEstateRecord/data/areadata.json", (err, data) => {
      if (err) {
        console.error(err);
        reject();
      }

      let result = JSON.parse(data);

      resolve(result);
    });
  });
}

async function updateValues() {
  console.log("updateValues");

  let fieldName = "AreaProvinceName";
  let areaData = await getAreaMeta();

  let provinceList = areaData.AreaProvinceName.values;
  let districtList = areaData.AreaDistrictName.values;

  for (var i = 0; i < provinceList.length; i++) {
    let provinceName = provinceList[i].label;
    let provinceId = provinceList[i].id;
    for (var j = 0; j < districtList.length; j++) {
      let districtName = districtList[j].label;
      let districtId = districtList[j].id;
      let parentId = districtList[j].parentId;
      if (parentId === provinceId) {
        console.log(provinceName + " >>>> " + districtName);
        let recordsUpdate = await RealEstateRecordModel.find({
          AreaDistrictName: districtName
        }).count();
        console.log(recordsUpdate);
        let result = await RealEstateRecordModel.updateMany(
          {
            AreaDistrictName: districtName
          },
          {
            AreaProvinceName: provinceName
          }
        );
        console.log(result);
      }
    }
  }
  console.log("DONE");
}

updateValues();
