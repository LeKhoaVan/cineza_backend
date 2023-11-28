const { db } = require("../models/index")

const getAllTypeMovieService = async () => {
    const allTypeMovie = await db.MovieType.findAll();
    return allTypeMovie;
}

module.exports = {
    getAllTypeMovieService,
}