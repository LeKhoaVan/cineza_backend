const express = require("express");
const { getTotalOrderController,
    getTotalTicketController,
    getTotalOrderByTimeUserMovieController,
    getTotalTicketByTimeUserMovieController,
    statisticsTopMovieController } = require("../controller/statisticsController")

const statisticsRouter = express.Router();
statisticsRouter.get('/get-total-order', getTotalOrderController);
statisticsRouter.get('/get-total-ticket', getTotalTicketController);
statisticsRouter.get("/get-order-by-time-user-movie", getTotalOrderByTimeUserMovieController);
statisticsRouter.get("/get-ticket-by-time-user-movie", getTotalTicketByTimeUserMovieController);
statisticsRouter.get("/top-5-movie", statisticsTopMovieController);

module.exports = statisticsRouter;