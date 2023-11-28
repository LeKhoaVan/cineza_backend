const { QueryTypes } = require("sequelize");
const { db } = require("../models/index");
const moment = require("moment")

const getTotalOrderService = async (currentDate) => {
    const query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, o.status
    from cineza.order as o
    where "2021-01-01" <= o.datePay <= "${currentDate}";`
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

const getTotalTicketService = async (currentDate) => {
    const query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser
    from ticket as t
    where "2021-01-01" <= t.bookAt <= "${currentDate}";`
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

const getTotalOrderByTimeUserMovieService = async (timeStart, timeEnd, user, movie) => {
    let query = ``;
    if (movie == "" && user == "" && timeStart == "" && timeEnd == "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, o.status
        from cineza.order as o
        where "2021-01-01" <= o.datePay and o.datePay <= "${moment().format("YYYY-MM-DD")}";`
    } else if (movie == "" && user == "" && timeStart != "" && timeEnd != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, o.status
        from cineza.order as o
        where "${timeStart}" <= o.datePay and o.datePay <= "${timeEnd}";`
    } else if (movie == "" && user != "" && timeStart != "" && timeEnd != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, o.status
        from cineza.order as o
        where "${timeStart}"<= o.datePay and o.datePay <= "${timeEnd}" and o.codeUser = "${user}";`
    } else if (user == "" && movie != "" && timeStart != "" && timeEnd != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, o.status, s.codeMovie
        from cineza.order as o
        join orderdetail as ord on ord.codeOder = o.code
        join ticket as t on t.code = ord.codeTicket
        join showing as s on s.code = t.codeShowing
        where "${timeStart}" <= o.datePay and o.datePay <="${timeEnd}" and s.codeMovie = "${movie}"
        GROUP BY o.code, o.datePay, o.description, o.codeUser, o.priceTotal, o.status, s.codeMovie;`
    }
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

const getTotalTicketByTimeUserMovieService = async (timeStart, timeEnd, user, movie) => {
    let query = ``;
    if (movie == "" && user == "" && timeStart == "" && timeEnd == "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from ticket as t
        join seat as s on s.code = t.codeSeat
        where "2021-01-01" <= t.bookAt and t.bookAt <= "${moment().format("YYYY-MM-DD")}";`
    } else if (movie == "" && user == "" && timeStart != "" && timeEnd != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from ticket as t
        join seat as s on s.code = t.codeSeat
        where "${timeStart}" <= t.bookAt and t.bookAt <= "${timeEnd}";`
    } else if (movie == "" && user != "" && timeStart != "" && timeEnd != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from ticket as t
        join seat as s on s.code = t.codeSeat
        where "${timeStart}" <= t.bookAt and t.bookAt <= "${timeEnd}" and t.codeUser = "${user}";`
    } else if (user == "" && movie != "" && timeStart != "" && timeEnd != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeMovie, se.codeTypeSeat
        from ticket as t
        join seat as se on se.code = t.codeSeat
        join showing as s on s.code = t.codeShowing
        where "${timeStart}" <= t.bookAt and t.bookAt <= "${timeEnd}" and s.codeMovie = "${movie}"
        GROUP BY t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeMovie;`
    }
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

module.exports = {
    getTotalOrderService,
    getTotalTicketService,
    getTotalOrderByTimeUserMovieService,
    getTotalTicketByTimeUserMovieService
}