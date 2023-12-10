const { Op, where, QueryTypes } = require("sequelize");

const { db } = require("../models/index");
const moment = require("moment");

const getAllMovieService = async (movieName) => {
    if (movieName) {
        const movies = await db.Movie.findAll({
            where: {
                [Op.or]: [
                    {
                        movieName: {
                            [Op.like]: `%${movieName}%`
                        }
                    },
                    {
                        code: {
                            [Op.like]: `%${movieName}%`
                        }
                    }
                ]
            },
            order: [['movieName', 'ASC']] // Sắp xếp theo movieName giảm dần
        });
        return movies;
    } else {
        const movies = await db.Movie.findAll({
            order: [['movieName', 'ASC']] // Sắp xếp theo movieName giảm dần
        });
        return movies
    }
}

const getDateByMovieService = async (movieCode) => {
    const query = `select m.startDate, m.endDate from Movie as m
    where m.code = '${movieCode}';`
    const [date, metadata] = await db.sequelize.query(query);
    return date[0];
}

const getByCodeService = async (movieCode) => {
    const movie = db.Movie.findOne({
        where: {
            code: movieCode
        }
    })

    return movie
}

const getMovieByDateService = async (date) => {
    //     sequelize.query(`
    //   SELECT *
    //   FROM your_table
    //   WHERE releaseDate <= :date
    //     AND endDate >= :date
    // `, {
    //   replacements: { date },
    //   type: sequelize.QueryTypes.SELECT
    // })
    const movies = await db.Movie.findAll({
        where: {
            [Op.and]: [
                {
                    startDate: {
                        [Op.lte]: date // Phim phải có ngày bắt đầu chiếu trước hoặc vào ngày nhập vào
                    }
                },
                {
                    endDate: {
                        [Op.gte]: date // Phim phải có ngày kết thúc chiếu sau hoặc vào ngày nhập vào
                    }
                }
            ]
        }
    })
    return movies;
}

const movieCreateService = async (movie) => {
    return await db.Movie.create(movie);
}

const updateMovieService = async (movieCode, movie) => {
    const oldMovie = await db.Movie.findOne({
        where: {
            code: movieCode
        }
    });

    if (oldMovie) {
        return await db.Movie.update(movie, {
            where: {
                code: movieCode
            }
        })
    } else {
        return null;
    }
}

const getAllMovieForUserService = async (dateCheck) => {
    const query = `select m.code, m.movieName, m.moviePoster, m.movieTime, m.description, m.director, m.actor, m.language, m.startDate, 
    m.endDate, m.status, m.movieType
    from Movie as m
    where m.status = "Hoạt động" and m.endDate >= "${dateCheck}"
    order by m.movieName ASC;`;
    const dataAllMovie = db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataAllMovie;
}

const findMovieForUserService = async (movieName) => {
    const date = moment().format("YYYY-MM-DD")
    const query = `select m.code, m.movieName, m.moviePoster, m.movieTime, m.description, m.director, m.actor, m.language, m.startDate, 
    m.endDate, m.status, m.movieType
    from Movie as m
    where m.status = "Hoạt động" and m.endDate >= "${date}" and m.movieName like '%${movieName}%'
    order by m.movieName ASC;`;
    const dataAllMovie = db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataAllMovie;
}
module.exports = {
    movieCreateService,
    getByCodeService,
    getAllMovieService,
    updateMovieService,
    getMovieByDateService,
    getDateByMovieService,
    getAllMovieForUserService,
    findMovieForUserService,
}