"use strict";
const RealEstateRecordModel = require("../model/RealEstateRecord");

async function updateValues() {
  console.log("updateValues");

  let fieldName = "AreaProvinceName";
  let dataList = [
    {
      orgVal: "Thành phố Hồ Chí Minh",
      altVal: ["TP Hồ Chí Minh", "Tỉnh TPHCM"]
    },
  ];

  for (var i = 0; i < dataList.length; i++) {
    let data = dataList[i];
    let orgDataUpdate = {};
    orgDataUpdate[fieldName] = data.orgVal;
    for (var j = 0; j < data.altVal.length; j++) {
      let dataUpdate = {};
      dataUpdate[fieldName] = data.altVal[j];
      console.log(dataUpdate);
      console.log(">>>>");
      console.log(orgDataUpdate);
      let recordsUpdate = await RealEstateRecordModel.find(dataUpdate).count();
      console.log(recordsUpdate);
      let result = await RealEstateRecordModel.updateMany(dataUpdate, orgDataUpdate);
      console.log(result);
      recordsUpdate = await RealEstateRecordModel.find(dataUpdate).count();
      console.log(recordsUpdate);
    }
  }
  console.log("DONE");
}

updateValues();
