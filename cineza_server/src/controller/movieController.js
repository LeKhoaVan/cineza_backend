const {
  movieCreateService,
  getAllMovieService,
  getByCodeService,
  updateMovieService,
  getMovieByDateService,
  getDateByMovieService,
  getAllMovieForUserService,
} = require("../services/movieService");

const getAllMovie = async (req, res) => {
  const { movieName } = req.query;
  try {
    const movies = await getAllMovieService(movieName);
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send("error controller get all: ", error);
  }
};

const getByCodeMovie = async (req, res) => {
  const { movieCode } = req.params;
  try {
    const movie = await getByCodeService(movieCode);
    if (movie) {
      res.status(200).send(movie);
    } else {
      res.status(401).send("not found!");
    }
  } catch (error) {
    res.status(500).send("error cotroller get by code: " + error);
  }
};

const getMovieByDateController = async (req, res) => {
  const { date } = req.params;
  try {
    const movies = await getMovieByDateService(date);
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send("error get movie by date: " + error);
  }
};

const getDateByMovieController = async (req, res) => {
  const { codeMovie } = req.params;
  try {
    const dates = await getDateByMovieService(codeMovie);
    res.status(200).send(dates);
  } catch (error) {
    res.status(500).send("error get date by movie: " + error);
  }
};

const createMovie = async (req, res) => {
  try {
    const { file } = req;
    const filePath = `http://localhost:9000/${file.path}`;
    const moviePoster = filePath;
    const {
      code,
      movieName,
      movieTime,
      description,
      director,
      actor,
      language,
      startDate,
      endDate,
      movieType,
      status,
    } = req.body;

    const newMovie = await movieCreateService({
      code,
      movieName,
      movieTime,
      moviePoster,
      description,
      director,
      actor,
      language,
      startDate,
      endDate,
      movieType,
      status,
    });
    res.status(201).send(newMovie);
  } catch (error) {
    res.status(500).send("error controller create a new movie: " + error);
  }
};

const updateMovie = async (req, res) => {
    const { file } = req;
    let moviePoster = "";
    if (file != undefined) {
        const filePath = `http://localhost:9000/${file.path}`;
        moviePoster = filePath;
    }

    const {
        code, movieName, movieTime,
        description, director, actor, language,
        startDate, endDate, movieType, status } = req.body;
    try {
        let updateMovie
        if (file != undefined) {
            updateMovie = await updateMovieService(code, {
                movieName, movieTime, moviePoster,
                description, director, actor, language,
                startDate, endDate, movieType, status
            })
        } else {
            updateMovie = await updateMovieService(code, {
                movieName, movieTime,
                description, director, actor, language,
                startDate, endDate, movieType, status
            })
        }

        res.status(200).send(updateMovie);
    } catch (error) {
        res.status(500).send("error update movie: " + error)
    }
}


const updateStatusMovie = async (req, res) => {
  const { movieCode } = req.params;
  const { movieStatus } = req.body;
  try {
    const updateMovie = await updateMovieService(movieCode, { movieStatus });
    res.status(200).send(updateMovie);
  } catch (error) {
    res.status(500).send("error update movie: " + error);
  }
};

const getAllMovieForUser = async (req, res) => {
  const { dateCheck } = req.params;
  try {
    const allMovie = await getAllMovieForUserService(dateCheck);
    res.status(200).send(allMovie);
  } catch (error) {
    res.status(200).send("error get all movie for user: " + error);
  }
};

module.exports = {
  createMovie,
  getAllMovie,
  getByCodeMovie,
  updateMovie,
  updateStatusMovie,
  getMovieByDateController,
  getDateByMovieController,
  getAllMovieForUser,
};
