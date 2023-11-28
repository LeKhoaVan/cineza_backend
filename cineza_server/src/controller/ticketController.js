const {
  getAllTicketService,
  getTicketByCodeService,
  getTicketByShowingService,
  getTicketByMovieService,
  createTicketService,
  checkSeatBook,
  getAllSeatIsBookService,
  updateTicketStructerService,
} = require("../services/ticketService");

const getAllTicketController = async (req, res) => {
  const { movieName } = req.query;
  const { showDate } = req.query;
  try {
    const allTicket = await getAllTicketService(movieName, showDate);
    res.status(200).send(allTicket);
  } catch (error) {
    res.status(500).send("error get all ticket: " + error);
  }
};

const getTicketByCodeController = async (req, res) => {
  const { code } = req.params;
  try {
    const ticket = await getTicketByCodeService(code);
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send("error get ticket by code: " + error);
  }
};

const createTicketController = async (req, res) => {
  const { codeShowing, codeSeat, codeUser, status } = req.body;
  try {
    // check is book
    const checkBook = await checkSeatBook(codeSeat, codeShowing);
    if (checkBook == null) {
      // checkTicketQuanlityService
      const checkQuanlity = await getTicketByShowingService(codeShowing);
      if (checkQuanlity.length <= 36) {
        // createTicketService
        const newTicket = await createTicketService({
          codeShowing,
          codeSeat,
          codeUser,
          status,
        });
        res.status(201).send(newTicket);
      } else {
        res.status(400).send("Ghế đầy");
      }
    } else {
      res.status(400).send("Ghế đã được đặt");
    }
  } catch (error) {
    res.status(500).send("error create new a ticket: " + error);
  }
};

const getTicketByShowingController = async (req, res) => {
  const { codeShowing } = req.params;
  try {
    // getTicketByShowingService
    const tickets = await getTicketByShowingService(codeShowing);
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send("error get ticket by showing: " + error);
  }
};

const getTicketByMovieController = async (req, res) => {
  const { codeMovie } = req.params;
  try {
    // getTicketByMovieService
    const tickets = await getTicketByMovieService(codeMovie);
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send("error get ticket by movie: " + error);
  }
};

const getSeatIsBookController = async (req, res) => {
  const { codeShowing } = req.params;
  try {
    const seats = await getAllSeatIsBookService(codeShowing);
    res.status(200).send(seats);
  } catch (error) {
    res.status(500).send("error get seat is book: " + error);
  }
};

const updateTicketController = async (req, res) => {
  const { code } = req.params;
  const { status } = req.body;
  try {
    const check = await getTicketByCodeService(code);
    if (check != null) {
      const updateTicket = await updateTicketStructerService(code, status);
      if (updateTicket != 0) {
        const newUpdateTicket = { ...check, status: status };
        res.status(200).send(newUpdateTicket);
      } else {
        res.status(400).send("update fail");
      }
    } else {
      res.status(400).send("ticket không tồn tại");
    }
  } catch (error) {
    res.status(500).send("error update ticket: " + error);
  }
};

module.exports = {
  getAllTicketController,
  getTicketByCodeController,
  createTicketController,
  getTicketByShowingController,
  getTicketByMovieController,
  getSeatIsBookController,
  updateTicketController,
};
