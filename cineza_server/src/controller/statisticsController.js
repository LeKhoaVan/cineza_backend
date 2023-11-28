const moment = require("moment")

const { getTotalOrderService,
    getTotalTicketService,
    getTotalOrderByTimeUserMovieService,
    getTotalTicketByTimeUserMovieService } = require("../services/statisticsService")

const getTotalOrderController = async (req, res) => {
    try {
        const currentDay = moment().format("YYYY-MM-DD");
        const result = await getTotalOrderService(currentDay);
        res.status(200).send(result);
    } catch (error) {
        res.status(200).send("error get total order: " + error);
    }
}

const getTotalTicketController = async (req, res) => {
    try {
        const currentDay = moment().format("YYYY-MM-DD");
        const result = await getTotalTicketService(currentDay);
        res.status(200).send(result);
    } catch (error) {
        res.status(200).send("error get total ticket: " + error);
    }
}

const getTotalOrderByTimeUserMovieController = async (req, res) => {
    const { timeStart, timeEnd, user, movie } = req.query;
    try {
        const result = await getTotalOrderByTimeUserMovieService(timeStart, timeEnd, user, movie);
        res.status(200).send(result);
    } catch (error) {
        res.status(200).send("error get order by dk: " + error);
    }
}

const getTotalTicketByTimeUserMovieController = async (req, res) => {
    const { timeStart, timeEnd, user, movie } = req.query;
    try {
        const result = await getTotalTicketByTimeUserMovieService(timeStart, timeEnd, user, movie);
        res.status(200).send(result);
    } catch (error) {
        res.status(200).send("error get ticket by dk: " + error);
    }
}

module.exports = {
    getTotalOrderController,
    getTotalTicketController,
    getTotalOrderByTimeUserMovieController,
    getTotalTicketByTimeUserMovieController
}