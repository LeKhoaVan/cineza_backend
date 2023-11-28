const express = require("express");
const path = require("path");
const cors = require("cors");

const rootRouter = require("./routes/index");
const { db, testConnect } = require("./models/index.js");

const app = express();
app.use(cors());
// format response json
app.use(express.json());

//set static file
const publicPath = path.join(__dirname, "./public");
app.use("/src/public", express.static(publicPath));

// set router
app.use("/cineza/api/v1/", rootRouter);

//test connect database
// testConnect();

// function insertMovie() {
//     try {
//         db.Movie.create({
//             movieName: "test", moviePoster: "https://poster", movieTime: 3.4,
//             description: null, director: "Van", actor: "van", language: "VietSub",
//             releaseTime: "2022-12-12", movieStatus: "ACTIVE"
//         });
//     } catch (error) {
//         console.log("create error: " + error)
//     }
// };

// insertMovie();

app.listen(9000, () => {
  console.log("listen on port: 9000");
  try {
    //dong bo database
    db.sequelize.sync({ alert: true });
  } catch (error) {
    console.log("error sync database: ", error);
  }
});
