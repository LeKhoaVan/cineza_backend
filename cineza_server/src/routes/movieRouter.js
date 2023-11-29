const express = require("express");

const { createMovie, getAllMovie, getByCodeMovie,
    updateMovie, updateStatusMovie, getMovieByDateController, getDateByMovieController,
    getAllMovieForUser } = require("../controller/movieController")
const { handleUploadFile } = require("../middlewares/upload/uploadImage/index");

const movieRouter = express.Router();

movieRouter.get("/get-all", getAllMovie);
movieRouter.get("/:movieCode", getByCodeMovie);
movieRouter.get("/get-movie-by-date/:date", getMovieByDateController)
movieRouter.get("/get-date/:codeMovie", getDateByMovieController)
movieRouter.post("/create", handleUploadFile, createMovie);
movieRouter.put("/update/:movieCode", handleUploadFile, updateMovie);
movieRouter.put("/change-status/:movieCode", updateStatusMovie);
movieRouter.get("/get-all-for-user/:dateCheck", getAllMovieForUser);

module.exports = movieRouter;