const express = require("express");

const {
  getAllTicketController,
  getTicketByCodeController,
  createTicketController,
  getTicketByShowingController,
  getTicketByMovieController,
  getSeatIsBookController,
  updateTicketController,
} = require("../controller/ticketController");

const ticketRouter = express.Router();

ticketRouter.get("/get-all", getAllTicketController);
ticketRouter.get("/get-by-code/:code", getTicketByCodeController);
ticketRouter.post("/create", createTicketController);
ticketRouter.get("/get-by-showing/:codeShowing", getTicketByShowingController);

ticketRouter.get("/get-by-movie/:codeMovie", getTicketByMovieController);
ticketRouter.get(
  "/seat-is-book-in-showing/:codeShowing",
  getSeatIsBookController
);
ticketRouter.put("/update/:code", updateTicketController);

module.exports = ticketRouter;
