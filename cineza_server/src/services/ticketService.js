const { db } = require("../models/index");
const { getByCodeService } = require("./movieService");
const { getShowByCodeService } = require("./showingService");

const getAllTicketService = async (movieName, showDate) => {
  const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser,
          r.name as rapName, ro.name as roomName, m.code as movieCode, m.movieName, s.showDate, s.showStart, s.showEnd,  se.position, v.fullName
          from cineza.ticket as t
          join cineza.showing as s on t.codeShowing = s.code
          join cineza.seat as se on t.codeSeat = se.code
          join cineza.movie as m on s.codeMovie = m.code 
          join cineza.rap as r on s.codeRap = r.code
          join cineza.room as ro on s.codeRoom = ro.code
          join cineza.user as v on v.code = t.codeUser;`;
  const queryFind = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser,
         r.name as rapName, ro.name as roomName, m.code as movieCode, m.movieName, s.showDate, s.showStart, s.showEnd,  se.position, v.fullName
         from cineza.ticket as t
         join cineza.showing as s on t.codeShowing = s.code
         join cineza.seat as se on t.codeSeat = se.code
         join cineza.movie as m on s.codeMovie = m.code 
         join cineza.rap as r on s.codeRap = r.code
       join cineza.room as ro on s.codeRoom = ro.code
         join cineza.user as v on v.code = t.codeUser
    where movieName LIKE '%${movieName}%';`;
  const queryFindbyDate = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser,
          r.name as rapName, ro.name as roomName, m.code as movieCode, m.movieName, s.showDate, s.showStart, s.showEnd,  se.position, v.fullName
          from cineza.ticket as t
          join cineza.showing as s on t.codeShowing = s.code
          join cineza.seat as se on t.codeSeat = se.code
          join cineza.movie as m on s.codeMovie = m.code 
          join cineza.rap as r on s.codeRap = r.code
          join cineza.room as ro on s.codeRoom = ro.code
          join cineza.user as v on v.code = t.codeUser
          where m.movieName LIKE '%${movieName}%' and s.showDate LIKE '%${showDate}%';`;
  if (movieName) {
    const [allTicket, metadata] = await db.sequelize.query(queryFind);
    return allTicket;
  }
  // if (movieName && showDate) {
  //   const [allTicket, metadata] = await db.sequelize.query(queryFindbyDate);
  //   return allTicket;
  // }
  else {
    const [allTicket, metadata] = await db.sequelize.query(query);
    return allTicket;
  }
};

const getTicketByCodeService = async (code) => {
  const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.codeShowing, t.status, t.codeSeat, 
        r.name as rapName, ro.code as roomCode, ro.name as roomName, s.showDate, s.showStart, s.showEnd, m.code as movieCode, m.movieName,
        t.codeUser, u.fullName, se.position
    from ticket as t
    join showing as s on t.codeShowing = s.code
    join seat as se on t.codeSeat = se.code
    join movie as m on s.codeMovie = m.code
    join rap as r on s.codeRap = r.code
    join room as ro on s.codeRoom = ro.code
    join user as u on u.code = t.codeUser
    where t.code = '${code}'`;
  const [ticket, metadata] = await db.sequelize.query(query);
  return ticket[0];
};

const getTicketByShowingService = async (codeShowing) => {
  const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, 
        r.name as rapName, ro.name as roomName, s.showDate, s.showStart, s.showEnd, m.code as movieCode, m.movieName,
        t.codeUser, u.fullName, se.position
        from ticket as t
        join showing as s on t.codeShowing = s.code
        join seat as se on t.codeSeat = se.code
        join movie as m on s.codeMovie = m.code
        join rap as r on s.codeRap = r.code
        join room as ro on s.codeRoom = ro.code
        join user as u on u.code = t.codeUser
        where t.codeShowing = '${codeShowing}'`;
  const [ticket, metadata] = await db.sequelize.query(query);
  return ticket;
};

const getTicketByMovieService = async (codeMovie) => {
  const query = `select * from cineza.ticket as t 
	join cineza.showing as s on t.codeShowing = s.code
	join cineza.movie as m on s.codeMovie = m.code 
    where m.code='${codeMovie} and s.showDate >= "2023-11-26 00:00:00"'`;
  const [ticket, metadata] = await db.sequelize.query(query);
  return ticket;
};

const checkSeatBook = async (codeSeat, codeShowing) => {
  const query = `select t.id from ticket as t where t.codeSeat = '${codeSeat}' and t.codeShowing = '${codeShowing}';`;
  const [check, metadata] = await db.sequelize.query(query);
  return check[0];
};

const createTicketService = async (ticket) => {
  // get showing => ticketEffecticeAt, ticketExpiryAt
  const showing = await getShowByCodeService(ticket.codeShowing);
  ticket.ticketEffecticeAt = showing.showStart;

  // const arrTime = showing.showStart.split(":");
  // if (arrTime.length > 2) {
  //   effectDay.setHours(arrTime[0], arrTime[1], arrTime[2], 0);
  //   ticket.ticketEffecticeAt = effectDay.toISOString();
  // }

  //get movie => cat chuoi lay so => movieTime
  // const movie = await getByCodeService(showing.codeMovie);
  // const timeMovie = parseFloat(movie.movieTime);
  // const hours = Math.floor(timeMovie);
  // const minutes = Math.floor((timeMovie - hours) * 60);
  // const seconds = Math.floor(((timeMovie - hours) * 60 - minutes) * 60);

  // effectDay.setUTCHours(effectDay.getUTCHours() + hours);
  // effectDay.setUTCMinutes(effectDay.getUTCMinutes() + minutes);
  // effectDay.setUTCSeconds(effectDay.getUTCSeconds() + seconds);
  ticket.ticketExpiryAt = showing.showEnd;
  ticket.bookAt = new Date();

  const newTicket = await db.Ticket.create(ticket);
  return newTicket;
};

const getAllSeatIsBookService = async (codeShowing) => {
  const query = `select t.codeSeat
    from ticket as t
    where t.codeShowing = '${codeShowing}'`;
  const [seats, metadata] = await db.sequelize.query(query);
  return seats;
};

const updateTicketStructerService = async (code, status) => {
  const updateTicket = await db.Ticket.update(
    { status },
    {
      where: {
        code: code,
      },
    }
  );
  return updateTicket;
};

module.exports = {
  getAllTicketService,
  getTicketByCodeService,
  getTicketByShowingService,
  getTicketByMovieService,
  createTicketService,
  checkSeatBook,
  getAllSeatIsBookService,
  updateTicketStructerService,
};
