"use strict";
const RealEstateRecordModel = require("../model/RealEstateRecord");

async function updateValues() {
  console.log("updateValues");

  let fieldName = "SystemPostType";

  let dataList = [
    {
      orgVal: "Rao bán",
      altVal: [
        "",
        "Bán nhà mặt phố",
        "Bán trang trại, khu nghỉ dưỡng",
        "Bán loại bất động sản khác",
        "Bán căn hộ chung cư",
        "Bán đất",
        "Bán nhà riêng",
        "Bán đất nền dự án",
        "Bán nhà biệt thự, liền kề",
        "Bán kho, nhà xưởng"
      ]
    }
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
      let result = await RealEstateRecordModel.updateMany(
        dataUpdate,
        orgDataUpdate
      );
      console.log(result);
      recordsUpdate = await RealEstateRecordModel.find(dataUpdate).count();
      console.log(recordsUpdate);
    }
  }

  let nullFilter = { SystemPostType: { $eq: null } };
  let nullList = await RealEstateRecordModel.find(nullFilter);
  console.log(nullList);
  let nullresult = await RealEstateRecordModel.updateMany(nullFilter, {
    SystemPostType: "Rao bán"
  });
  console.log(nullresult);
  console.log("DONE");
}

// updateValues();
