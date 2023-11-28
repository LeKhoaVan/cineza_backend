const { db } = require("../models/index");
const { QueryTypes } = require("sequelize");

const createOrderService = async (order, codeTicket) => {
  const newOrder = await db.Order.create(order);
  let checkSaveOrderDetail = true;
  codeTicket.codeTicket.forEach(async (ct) => {
    const orderDetail = { codeOder: newOrder.code, codeTicket: ct };
    const newOrderDetail = await db.OrderDetail.create(orderDetail);
    if (newOrderDetail != undefined) {
      checkSaveOrderDetail = false;
    }
  });
  if (checkSaveOrderDetail) {
    return newOrder;
  }
  return null;
};

const getOrderServiceByCode = async (codeOrder) => {
  const query = `select ord.codeOder, sh.showDate, sh.showStart, sh.showEnd, s.code, s.position, p.value, m.movieName, r.name as rapName, ro.name as roomName, o.datePay, o.description, us.code as codeUser, us.fullName
from orderdetail as ord
join cineza.order as o on o.code = ord.codeOder
join user as us on us.code = o.codeUser
join ticket as t on t.code = ord.codeTicket
join showing as sh on t.codeShowing = sh.code
join seat as s on s.code = t.codeSeat
join typeseat as ts on ts.code = s.codeTypeSeat
join price as p on p.codeTypeSeat = ts.code
join priceheader as ph on ph.code = p.codeHeader
join movie as m on m.code = sh.codeMovie
join rap as r on r.code = sh.codeRap
join room as ro on ro.code = sh.codeRoom
where ord.codeOder = "${codeOrder}" and ph.status = "Hoạt động"  and p.status = "Hoạt động";`;

  const dataOrder = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return dataOrder;
};

const getTotalPriceByService = async (codeOrder) => {
  const query = `select sum(p.value) as value
    from orderdetail as ord
    join cineza.order as o on o.code = ord.codeOder
    join ticket as t on t.code = ord.codeTicket
    join showing as sh on t.codeShowing = sh.code
    join seat as s on s.code = t.codeSeat
    join typeseat as ts on ts.code = s.codeTypeSeat
    join price as p on p.codeTypeSeat = ts.code
    join priceheader as ph on ph.code = p.codeHeader
    where ord.codeOder = "${codeOrder}" and ph.status = "Hoạt động"  and p.status = "Hoạt động";`;

  const [total, metadata] = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return total;
};

const getOrderByUserService = async (codeUser) => {
  const query = `select o.code, o.datePay, o.description, o.priceTotal 
    from cineza.order as o 
    where o.codeUser = "${codeUser}"
    order by datePay desc;`;

  const dataOrders = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return dataOrders;
};

const getAllOrderService = async (datePay) => {
  const query = `select o.datePay, o.description, o.priceTotal, o.codeUser, o.code, us.fullName, us.numberPhone
    from cineza.order as o
    join user as us on us.code = o.codeUser 
    where o.datePay LIKE '%${datePay}%'`;
  if (datePay) {
    const dataOrders = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return dataOrders;
  } else {
    const query = `select o.datePay, o.description, o.priceTotal, o.codeUser, o.code, us.fullName, us.numberPhone
    from cineza.order as o
    join user as us on us.code = o.codeUser `;

    const dataOrders = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return dataOrders;
  }
};

module.exports = {
  createOrderService,
  getOrderServiceByCode,
  getOrderByUserService,
  getTotalPriceByService,
  getAllOrderService,
};
