const express = require("express");
const axios = require("axios").default; // npm install axios
const CryptoJS = require("crypto-js"); // npm install crypto-js
const { v1: uuidv1 } = require("uuid"); // npm install uuid
const moment = require("moment"); // npm install moment
const qs = require("qs");

const hierarchyStructureRouter = require("./hierarchyStuctureRouter");
const promotionHeaderRouter = require("./promotionHeaderRouter");
const promotionLineRouter = require("./promotionLineRouter");
const rapRouter = require("./rapRouter");
const roomRouter = require("./roomRouter");
const seatRouter = require("./seatRouter");
const movieRouter = require("./movieRouter");
const movieTypeRouter = require("./movieTypeRouter");
const otherProductRouter = require("./otherProductRouter");
const priceHeaderRouter = require("./priceHeaderRouter");
const priceRouter = require("./priceRouter");
const promotionDetailRouter = require("./promotionDetailRouter");
const typeSeatRouter = require("./typeSeatRouter");
const showingRouter = require("./showingRouter");
const ticketRouter = require("./ticketRouter")
const orderRouter = require("./orderRouter");
const userRouter = require("./userRouter");
const addressRouter = require("./addressRouter")
const statisticsRouter = require("./statisticsRouter");

const rootRouter = express.Router();

rootRouter.use("/hierarchy-stucture", hierarchyStructureRouter);
rootRouter.use("/promotion-header", promotionHeaderRouter);
rootRouter.use("/promotion-line", promotionLineRouter);
rootRouter.use("/rap", rapRouter);
rootRouter.use("/room", roomRouter);
rootRouter.use("/seat", seatRouter);
rootRouter.use("/movie", movieRouter);
rootRouter.use("/movie-type", movieTypeRouter);
rootRouter.use("/promotion-detail", promotionDetailRouter);
rootRouter.use("/other-product", otherProductRouter);
rootRouter.use("/price-header", priceHeaderRouter);
rootRouter.use("/price", priceRouter);
rootRouter.use("/type-seat", typeSeatRouter);
rootRouter.use("/show", showingRouter);
rootRouter.use("/ticket", ticketRouter);
rootRouter.use("/order", orderRouter);
rootRouter.use("/address", addressRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/statistics", statisticsRouter);


let dataAppTransId = "";

rootRouter.post("/test-bank", async (req, res) => {
  const { dataPay } = req.body;

  const config = {
    appid: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
  };

  const embeddata = {
    merchantinfo: "embeddata123",
  };

  const items = [
    {
      itemid: dataPay.dataShow.code,
      itemname: dataPay.dataShow.movieName,
    },
  ];

  const order = {
    appid: config.appid,
    apptransid: `${moment().format("YYMMDD")}_${uuidv1()}`, // the trading code must be in the format yymmdd_xxxx
    appuser: "demo",
    apptime: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embeddata: JSON.stringify(embeddata),
    amount: dataPay.value,
    description: `Thanh toán vé xem phim ${dataPay.dataShow.movieName} `,
    bankcode: "zalopayapp",
  };

  const data =
    config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;

  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  const dataResult = await axios.post(config.endpoint, null, { params: order });
  if (dataResult.status == 200) {
    res.status(200).send(dataResult.data);
    dataAppTransId = order.apptransid;
  }
});

rootRouter.post("/check-status-payment", async (req, res) => {
  console.log("-----------dataAppTranID-----------", dataAppTransId);
  const config = {
    appid: "2554",
    key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
    key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
    endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/getstatusbyapptransid",
  };

  let postData = {
    appid: config.appid,
    apptransid: dataAppTransId, // Input your apptransid
  };

  let data = postData.appid + "|" + postData.apptransid + "|" + config.key1; // appid|apptransid|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  let postConfig = {
    method: "post",
    url: config.endpoint,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(postData),
  };

  axios(postConfig)
    .then(function (response) {
      res.status(200).send(response.data);
      dataAppTransId = "";
    })
    .catch(function (error) {
      res.status(200).send("fail");
      console.log(error);
    });
});

module.exports = rootRouter;
