"use strict";
const RealEstateRecordModel = require("../model/RealEstateRecord");

async function updateValues() {
  console.log("updateValues");

  let fieldName = "AreaTypeName";
  let dataList = [
    {
      orgVal: "Nhà hẻm",
      altVal: ["Nhà hẻm/ngõ", "Bán nhà riêng"]
    },
    {
      orgVal: "Đất",
      altVal: ["Đất thổ cư","Bán đất","Đất nông nghiệp, kho bãi", "Đất, kho, xưởng"]
    },
    {
      orgVal: "Chung cư",
      altVal: ["Căn hộ/Chung cư","Căn hộ chung cư, tập thể","Bán căn hộ chung cư, tập thể", "Bán căn hộ chung cư"]
    },
    {
      orgVal: "Đất nền",
      altVal: ["Bán đất nền dự án", "Đất dự án, Khu dân cư"]
    },
    {
      orgVal: "Biệt thự",
      altVal: [
        "Biệt thự, Villa",
        "Biệt thự, villa, Penthouse",
        "Bán nhà biệt thự, liền kề"
      ]
    },
    {
      orgVal: "Nhà phố",
      altVal: ["Bán nhà mặt phố", "Nhà mặt tiền/phố"]
    },
    {
      orgVal: "khác",
      altVal: ["Bán trang trại, khu nghỉ dưỡng", "Bán loại bất động sản khác"]
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
      let result = await RealEstateRecordModel.updateMany(dataUpdate, orgDataUpdate);
      console.log(result);
      recordsUpdate = await RealEstateRecordModel.find(dataUpdate).count();
      console.log(recordsUpdate);
    }
  }
  // else if (dataVal.indexOf("Văn phòng, Mặt bằng kinh doanh") > -1)
  // {
  //     output = "Văn phòng";
  // }
  // else if (dataVal.indexOf("Văn phòng") > -1)
  // {
  //     output = "Văn phòng";
  // }
  // else if (dataVal.indexOf("Nhà trọ, Phòng trọ") > -1)
  // {
  //     output = "Phòng trọ";
  // }
  // else if (dataVal.indexOf("Phòng trọ") > -1)
  // {
  //     output = "Phòng trọ";
  // }
  // else if (dataVal.indexOf("Khách sạn, Căn hộ dịch vụ") > -1)
  // {
  //     output = "Căn hộ dịch vụ";
  // }
  // else if (dataVal.indexOf("Mặt bằng, Cửa hàng, Shop") > -1)
  // {
  //     output = "Nhà phố";
  // }
  console.log("DONE");
}

// updateValues();
