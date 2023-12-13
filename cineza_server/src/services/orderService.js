const { db } = require("../models/index");
const { QueryTypes } = require("sequelize");


const createOrderService = async (order, codeTicket) => {
  const newOrder = await db.Order.create(order);
  let checkSaveOrderDetail = true;
  codeTicket.codeTicket.forEach(async (ct) => {
    const orderDetail = { codeOder: newOrder.code, codeTicket: ct.codeTicket, priceItemOrder: ct.priceTicket };
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
  const query = `select ord.codeOder, ord.priceItemOrder , sh.showDate, sh.showStart, sh.showEnd, s.code, s.position, m.movieName, r.name as rapName, ro.name as roomName, o.datePay, o.description, us.code as codeUser, us.fullName
from OrderDetail as ord
join cineza.order as o on o.code = ord.codeOder
join User as us on us.code = o.codeUser
join Ticket as t on t.code = ord.codeTicket
join Showing as sh on t.codeShowing = sh.code
join Seat as s on s.code = t.codeSeat
join Movie as m on m.code = sh.codeMovie
join Rap as r on r.code = sh.codeRap
join Room as ro on ro.code = sh.codeRoom
where ord.codeOder = "${codeOrder}";`;

  const dataOrder = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return dataOrder;
};


const getTotalPriceByService = async (codeOrder) => {
  const query = `select sum(p.value) as value
    from OrderDetail as ord
    join cineza.Order as o on o.code = ord.codeOder
    join Ticket as t on t.code = ord.codeTicket
    join Showing as sh on t.codeShowing = sh.code
    join Seat as s on s.code = t.codeSeat
    join TypeSeat as ts on ts.code = s.codeTypeSeat
    join Price as p on p.codeTypeSeat = ts.code
    join Priceheader as ph on ph.code = p.codeHeader
    where ord.codeOder = "${codeOrder}" and ph.status = "Hoạt động"  and p.status = "Hoạt động";`;

  const [total, metadata] = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
    raw: false,
  });
  return total;
};

const getOrderByUserService = async (codeUser) => {
  const query = `select o.code, o.datePay, o.description, o.priceTotal 
    from cineza.Order as o 
    where o.codeUser = "${codeUser}"
    order by datePay desc;`;

  const dataOrders = await db.sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  return dataOrders;
};

const getAllOrderService = async (datePay) => {
  const query = `select o.datePay, o.description, o.priceTotal, o.codeUser, o.code, us.fullName, us.numberPhone
    from cineza.Order as o
    join User as us on us.code = o.codeUser 
    where o.datePay LIKE '%${datePay}%'
    order by o.datePay DESC;`;
  if (datePay) {
    const dataOrders = await db.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return dataOrders;
  } else {
    const query = `select o.datePay, o.description, o.priceTotal, o.codeUser, o.code, us.fullName, us.numberPhone
    from cineza.Order as o
    join User as us on us.code = o.codeUser
    order by o.datePay DESC;`;

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
