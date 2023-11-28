const express = require("express");

const { getAllTypeMovieController } = require("../controller/movieTypeController");

const movieTypeRouter = express.Router();

movieTypeRouter.get("/get-all", getAllTypeMovieController)
module.exports = movieTypeRouter;