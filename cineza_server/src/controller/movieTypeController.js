const { getAllTypeMovieService } = require("../services/movieTypeService");

const getAllTypeMovieController = async (req, res) => {
    try {
        const allTypeMovie = await getAllTypeMovieService();
        res.status(200).send(allTypeMovie);
    } catch (error) {
        res.status(500).send("error get all type movie: " + error)
    }
}

module.exports = {
    getAllTypeMovieController,
}