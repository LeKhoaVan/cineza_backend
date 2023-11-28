const { db } = require("../models/index");
const moment = require("moment"); // require
const getAllShowService = async (movieName) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName as nameMovie, r.name as nameRap,  ro.name as nameRoom
  from showing as s 
  join movie as m on s.codeMovie = m.code
  join rap as r on s.codeRap = r.code
  join room as ro on s.codeRoom = ro.code
  ORDER BY s.showDate DESC;`;
  const queryFind = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName as nameMovie, r.name as nameRap,  ro.name as nameRoom
  from showing as s 
  join movie as m on s.codeMovie = m.code
  join rap as r on s.codeRap = r.code
  join room as ro on s.codeRoom = ro.code
  where m.movieName LIKE '%${movieName}%'
  ORDER BY s.showDate DESC;`;
  if (movieName) {
    const [allShow, metadata] = await db.sequelize.query(queryFind);
    return allShow;
  } else {
    const [allShow, metadata] = await db.sequelize.query(query);
    return allShow;
  }
};

const getShowByCodeService = async (code) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
      from showing as s 
      join movie as m on s.codeMovie = m.code
      join rap as r on s.codeRap = r.code
      join room as ro on s.codeRoom = ro.code
      where s.code = '${code}'`;
  const [showing, metadata] = await db.sequelize.query(query);
  return showing[0];
};

const getShowByMovieAndDateService = async (codeMovie, date) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate, s.showStart, s.showEnd, s.status, m.movieName,
  r.name as rapName, ro.name as roomName
  from showing as s
  join movie as m on m.code = s.codeMovie
  join Rap as r on r.code = s.codeRap
  join Room as ro on ro.code = s.codeRoom
  where s.codeMovie = '${codeMovie}' and s.showDate like '${date}%';`;
  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
};

const getShowByRapAndDateService = async (codeRap, date) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate, s.showStart, s.showEnd, s.status, m.movieName,
  r.name as rapName, ro.name as roomName
  from showing as s
  join movie as m on m.code = s.codeMovie
  join Rap as r on r.code = s.codeRap
  join Room as ro on ro.code = s.codeRoom
  where s.codeRap = '${codeRap}' and s.showDate like '${date}%';`;
  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
};

const getShowByRapMovieAndDateService = async (codeRap, codeMovie, date) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate, s.showStart, s.showEnd, s.status, m.movieName,
  r.name as rapName, ro.name as roomName
  from showing as s
  join movie as m on m.code = s.codeMovie
  join Rap as r on r.code = s.codeRap
  join Room as ro on ro.code = s.codeRoom
  where s.codeRap = '${codeRap}' and s.codeMovie = '${codeMovie}' and s.showDate like '${date}%';`;
  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
};

const createShowService = async (show) => {
  const newShow = await db.Showing.create(show);
  return newShow;
};

const updateShowService = async (code, show) => {
  const updateShow = await db.Showing.update(show, {
    where: {
      code: code,
    },
  });
  return updateShow;
};

const checkShow = async (codeRap, codeRoom, showDate, showStart, showEnd) => {
  const newShowStart = new Date(showDate);
  const newShowEnd = new Date(showDate);

  const timeShowStart = showStart.split(":");
  const timeShowEnd = showEnd.split(":");

  newShowStart.setHours(timeShowStart[0], timeShowStart[1], 0, 0);
  newShowEnd.setHours(timeShowEnd[0], timeShowEnd[1], 0, 0)

  const start = `${newShowStart.getFullYear()}-${newShowStart.getMonth() + 1}-${newShowStart.getDate()} ${newShowStart.getHours()}:${newShowStart.getMinutes()}:${newShowStart.getSeconds()}`
  const end = `${newShowEnd.getFullYear()}-${newShowEnd.getMonth() + 1}-${newShowEnd.getDate()} ${newShowEnd.getHours()}:${newShowEnd.getMinutes()}:${newShowEnd.getSeconds()}`

  const query = `select s.code, s.showDate
  from cineza.showing as s
  where s.codeRap = '${codeRap}'
  and s.codeRoom = '${codeRoom}'
  and s.showDate = '${showDate}'
  and '${start}' <= s.showEnd
  and '${end}' >= s.showStart
  and s.status = 'Hoạt động';`;

  const [shows, metadata] = await db.sequelize.query(query);
  return shows;
};

const updateStatusShowService = async (
  codeRap,
  codeRoom,
  showDate,
  showStart
) => {
  const newShowStart = new Date(showDate);
  const timeShowStart = showStart.split(":");
  newShowStart.setHours(timeShowStart[0], timeShowStart[1], 0, 0);
  const start = moment(newShowStart).format("YYYY-MM-DD hh:mm:ss");
  const query = `
  UPDATE cineza.showing as s
  SET s.status = "Khóa tạm thời"
  where s.codeRap = '${codeRap}' 
  and s.codeRoom = '${codeRoom}' 
  and s.showDate like '%${showDate}%'
  and '${start}' <= s.showEnd
  and '${start}' >= s.showStart
  and s.status = 'Hoạt động';`;

  const resultData = await db.sequelize.query(query, {
    type: QueryTypes.UPDATE,
  });
  return resultData;
};

const getAllShowByMovieService = async (codeMovie) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom,  s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
        from showing as s 
        join movie as m on s.codeMovie = m.code
        join rap as r on s.codeRap = r.code
        join room as ro on s.codeRoom = ro.code
        where s.codeMovie = '${codeMovie}'`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};

const getAllShowByRapService = async (codeRap) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
     from showing as s 
     join movie as m on s.codeMovie = m.code
     join rap as r on s.codeRap = r.code
     join room as ro on s.codeRoom = ro.code
     where s.codeRap = '${codeRap}';`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};

const getAllShowByRoomService = async (codeRoom) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
     from cineza.showing as s 
     join cineza.movie as m on s.codeMovie = m.code
     join cineza.rap as r on s.codeRap = r.code
     join cineza.room as ro on s.codeRoom = ro.code
     where s.codeRoom = '${codeRoom}';`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};

const getAllShowByMovieAndRapService = async (codeMovie, codeRap) => {
  const query = `select s.code, s.codeMovie, s.codeRap, s.codeRoom, s.showDate , s.showStart, s.showEnd, s.status, m.movieName, r.name as nameRap,  ro.name as nameRoom
     from showing as s 
     join movie as m on s.codeMovie = m.code
     join rap as r on s.codeRap = r.code
     join room as ro on s.codeRoom = ro.code
     where s.codeMovie = '${codeMovie}' and s.codeRap = '${codeRap}';`;
  const [allShow, metadata] = await db.sequelize.query(query);
  return allShow;
};
module.exports = {
  getAllShowService,
  getShowByCodeService,
  createShowService,
  updateShowService,
  getAllShowByMovieService,
  getAllShowByRapService,
  getAllShowByRoomService,
  checkShow,
  updateStatusShowService,
  getAllShowByMovieAndRapService,
  getShowByMovieAndDateService,
  getShowByRapAndDateService,
  getShowByRapMovieAndDateService,
};
