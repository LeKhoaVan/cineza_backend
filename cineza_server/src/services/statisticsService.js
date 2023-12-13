const { QueryTypes } = require("sequelize");
const { db } = require("../models/index");
const moment = require("moment")

const getTotalOrderService = async (currentDate) => {
    const query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal
    from cineza.Order as o
    where "2021-01-01" <= o.datePay <= "${currentDate}";`
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

const getTotalTicketService = async (year, month) => {
    let query = "";

    if (year == "" && month == "") {
        query = `select m.code, m.movieName, count(t.code) as totalTicket
        from Movie as m
        join Showing as s on s.codeMovie = m.code
        left join Ticket as t on t.codeShowing = s.code
        group by m.code
        order by totalTicket desc;`
    } else if (year != "" && month == "") {
        query = `select m.code, m.movieName, count(t.code) as totalTicket
        from Movie as m
        join Showing as s on s.codeMovie = m.code
        left join Ticket as t on t.codeShowing = s.code
        where s.showDate >= "${year}-01-01" and "${parseInt(year) + 1}-01-01" > s.showDate
        group by m.code
        order by totalTicket desc;`
    } else if (year != "" && month != "") {
        let yearTam = 0;
        let monthTam = 0;
        if (month == "12") {
            yearTam = parseInt(year) + 1;
            monthTam = 0;
        } else {
            yearTam = year;
            monthTam = month;
        }
        query = `select m.code, m.movieName, count(t.code) as totalTicket
        from Movie as m
        join Showing as s on s.codeMovie = m.code
        left join Ticket as t on t.codeShowing = s.code
        where s.showDate >= "${year}-${month}-01" and "${yearTam}-${String(parseInt(monthTam) + 1).padStart(2, '0')}-01" > s.showDate
        group by m.code
        order by totalTicket desc;`
    }
    const resultData = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return resultData;
}

const getTotalOrderByTimeUserMovieService = async (timeStart, timeEnd, user, movie) => {
    let query = ``;
    if (movie == "" && user == "" && timeStart == "" && timeEnd == "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal
        from cineza.Order as o
        where "2021-01-01" <= o.datePay and o.datePay <= "${moment().format("YYYY-MM-DD")}";`
    } else if (movie == "" && user == "" && timeStart != "" && timeEnd != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal
        from cineza.Order as o
        where "${timeStart}" <= o.datePay and o.datePay <= "${timeEnd}";`
    } else if (movie == "" && user != "" && timeStart != "" && timeEnd != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal
        from cineza.Order as o
        where "${timeStart}"<= o.datePay and o.datePay <= "${timeEnd}" and o.codeUser = "${user}";`
    } else if (user == "" && movie != "" && timeStart != "" && timeEnd != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, s.codeMovie
        from cineza.Order as o
        join OrderDetail as ord on ord.codeOder = o.code
        join Ticket as t on t.code = ord.codeTicket
        join Showing as s on s.code = t.codeShowing
        where "${timeStart}" <= o.datePay and o.datePay <="${timeEnd}" and s.codeMovie = "${movie}"
        GROUP BY o.code, o.datePay, o.description, o.codeUser, o.priceTotal, s.codeMovie;`
    } else if (timeStart == "" && timeEnd == "" && user != "" && movie == "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal
        from cineza.Order as o
        where o.codeUser = "${user}";`
    } else if (timeStart == "" && timeEnd == "" && user == "" && movie != "") {
        query = `select o.code, o.datePay, o.description, o.codeUser, o.priceTotal, s.codeMovie
        from cineza.Order as o
        join OrderDetail as ord on ord.codeOder = o.code
        join Ticket as t on t.code = ord.codeTicket
        join Showing as s on s.code = t.codeShowing
        where s.codeMovie = "${movie}"
        GROUP BY o.code, o.datePay, o.description, o.codeUser, o.priceTotal, s.codeMovie;`
    }
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

const getTotalTicketByTimeUserMovieService = async (timeStart, timeEnd, user, movie) => {
    let query = ``;
    if (movie == "" && user == "" && timeStart == "" && timeEnd == "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from Ticket as t
        join Seat as s on s.code = t.codeSeat
        where "2021-01-01" <= t.bookAt and t.bookAt <= "${moment().format("YYYY-MM-DD")}";`
    } else if (movie == "" && user == "" && timeStart != "" && timeEnd != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from Ticket as t
        join Seat as s on s.code = t.codeSeat
        where "${timeStart}" <= t.bookAt and t.bookAt <= "${timeEnd}";`
    } else if (movie == "" && user != "" && timeStart != "" && timeEnd != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from Ticket as t
        join Seat as s on s.code = t.codeSeat
        where "${timeStart}" <= t.bookAt and t.bookAt <= "${timeEnd}" and t.codeUser = "${user}";`
    } else if (user == "" && movie != "" && timeStart != "" && timeEnd != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeMovie, se.codeTypeSeat
        from Ticket as t
        join Seat as se on se.code = t.codeSeat
        join Showing as s on s.code = t.codeShowing
        where "${timeStart}" <= t.bookAt and t.bookAt <= "${timeEnd}" and s.codeMovie = "${movie}"
        GROUP BY t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeMovie;`
    } else if (timeStart == "" && timeEnd == "" && user != "" && movie == "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeTypeSeat
        from Ticket as t
        join Seat as s on s.code = t.codeSeat
        where t.codeUser = "${user}";`
    } else if (timeStart == "" && timeEnd == "" && user == "" && movie != "") {
        query = `select t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeMovie, se.codeTypeSeat
        from Ticket as t
        join Seat as se on se.code = t.codeSeat
        join Showing as s on s.code = t.codeShowing
        where s.codeMovie = "${movie}"
        GROUP BY t.code, t.bookAt, t.ticketEffecticeAt, t.ticketExpiryAt, t.status, t.codeShowing, t.codeSeat, t.codeUser, s.codeMovie;`
    }
    const dataResult = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataResult;
}

const statisticsTopMovieService = async (year, month) => {
    let query = "";

    if (year == "" && month == "") {
        query = `select m.code, m.movieName, count(t.code) as totalTicket
        from Movie as m
        join Showing as s on s.codeMovie = m.code
        left join Ticket as t on t.codeShowing = s.code
        group by m.code
        order by totalTicket desc
        LIMIT 5;`
    } else if (year != "" && month == "") {
        query = `select m.code, m.movieName, count(t.code) as totalTicket
        from Movie as m
        join Showing as s on s.codeMovie = m.code
        left join Ticket as t on t.codeShowing = s.code
        where s.showDate >= "${year}-01-01" and "${parseInt(year) + 1}-01-01" > s.showDate
        group by m.code
        order by totalTicket desc
        LIMIT 5;`
    } else if (year != "" && month != "") {
        let yearTam = 0;
        let monthTam = 0;
        if (month == "12") {
            yearTam = parseInt(year) + 1;
            monthTam = 0;
        } else {
            yearTam = year;
            monthTam = month;
        }
        query = `select m.code, m.movieName, count(t.code) as totalTicket
        from Movie as m
        join Showing as s on s.codeMovie = m.code
        left join Ticket as t on t.codeShowing = s.code
        where s.showDate >= "${year}-${month}-01" and "${yearTam}-${String(parseInt(monthTam) + 1).padStart(2, '0')}-01" > s.showDate
        group by m.code
        order by totalTicket desc
        LIMIT 5;`
    }
    const resultData = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return resultData;
}

const statisticsPriceService = async (year, month) => {
    let query = '';
    if (year == "" && month == "") {
        const dateCurrent = moment().format("YYYY-MM-DD")
        query = `select sum(o.priceTotal) as totalPrice,  YEAR(o.datePay) as title
        from cineza.Order as o
        group by title
        order by title
        LIMIT 5;`
    } else if (year != "" && month == "") {
        query = `select sum(o.priceTotal) as totalPrice,  MONTH(o.datePay) as title
        from cineza.Order as o
        where datePay >= '${year}-01-01' and datePay < '${parseInt(year) + 1}-01-01'
        group by title
        order by title;`
    } else if (year != "" && month != "") {
        let yearTam = 0;
        let monthTam = 0;
        if (month == "12") {
            yearTam = parseInt(year) + 1;
            monthTam = 0;
        } else {
            yearTam = year;
            monthTam = month;
        }

        query = `select sum(o.priceTotal) as totalPrice, DAY(o.datePay) as title
        from cineza.Order as o
        where datePay >= '${year}-${month}-01' and datePay < '${yearTam}-${String(parseInt(monthTam) + 1).padStart(2, '0')}-01'
        group by title
        order by title;`
    }
    const dataStatis = await db.sequelize.query(query, { type: QueryTypes.SELECT });
    return dataStatis;
}

module.exports = {
    getTotalOrderService,
    getTotalTicketService,
    getTotalOrderByTimeUserMovieService,
    getTotalTicketByTimeUserMovieService,
    statisticsTopMovieService,
    statisticsPriceService
}