const { Sequelize, DataTypes } = require("sequelize");

const { development, test, production } = require("../config/configDB");

const db = {};

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    dialect: development.dialect,

    timezone: "+07:00",
    // // hide query sql in sequelize
    logging: false,
  }
);

//test connect
// const testConnect = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.HierachyStructure = require("./hierarchyStructure")(sequelize, DataTypes);
db.Address = require("./address")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.PromotionHeader = require("./promotionHeader")(sequelize, DataTypes);
db.PromotionLine = require("./promotionLine")(sequelize, DataTypes);
db.PromotionDetail = require("./promotionDetail")(sequelize, DataTypes);
db.Movie = require("./movie")(sequelize, DataTypes);
db.MovieType = require("./movieType")(sequelize, DataTypes);
db.Rap = require("./rap")(sequelize, DataTypes);
db.Room = require("./room")(sequelize, DataTypes);
db.Seat = require("./seat")(sequelize, DataTypes);
db.OtherProduct = require("./otherProduct")(sequelize, DataTypes);
db.PriceHeader = require("./priceHeader")(sequelize, DataTypes);
db.Price = require("./price")(sequelize, DataTypes);
db.TypeSeat = require("./typeSeat")(sequelize, DataTypes);
db.Showing = require("./showing")(sequelize, DataTypes);
db.Ticket = require("./ticket")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.OrderDetail = require("./orderDetail")(sequelize, DataTypes);

db.HierachyStructure.hasMany(db.Address, { foreignKey: "type" });
db.Address.belongsTo(db.HierachyStructure, { foreignKey: "type" });

db.Address.hasMany(db.Address, { foreignKey: "parentId" });
db.Address.belongsTo(db.Address, { foreignKey: "parentId" });

db.Address.hasMany(db.User, { foreignKey: "countryAddress" });
db.User.belongsTo(db.Address, { foreignKey: "countryAddress" });

db.Address.hasMany(db.User, { foreignKey: "cityAddress" });
db.User.belongsTo(db.Address, { foreignKey: "cityAddress" });

db.Address.hasMany(db.User, { foreignKey: "districtAddress" });
db.User.belongsTo(db.Address, { foreignKey: "districtAddress" });

db.Address.hasMany(db.User, { foreignKey: "wardAddress" });
db.User.belongsTo(db.Address, { foreignKey: "wardAddress" });


db.PromotionHeader.hasMany(db.PromotionLine, { foreignKey: "promotionHeaderCode" });
db.PromotionLine.belongsTo(db.PromotionHeader, { foreignKey: "promotionHeaderCode" });

db.PromotionLine.hasMany(db.PromotionDetail, { foreignKey: "promotionLineCode" });
db.PromotionDetail.belongsTo(db.PromotionLine, { foreignKey: "promotionLineCode" });

db.Movie.hasMany(db.PromotionDetail, { foreignKey: "movieCode" });
db.PromotionDetail.belongsTo(db.Movie, { foreignKey: "movieCode" });

db.MovieType.hasMany(db.Movie, { foreignKey: "movieType" });
db.Movie.belongsTo(db.MovieType, { foreignKey: "movieType" });

db.Address.hasMany(db.Rap, { foreignKey: "countryAddress" });
db.Rap.belongsTo(db.Address, { foreignKey: "countryAddress" });

db.Address.hasMany(db.Rap, { foreignKey: "cityAddress" });
db.Rap.belongsTo(db.Address, { foreignKey: "cityAddress" });

db.Address.hasMany(db.Rap, { foreignKey: "districtAddress" });
db.Rap.belongsTo(db.Address, { foreignKey: "districtAddress" });

db.Address.hasMany(db.Rap, { foreignKey: "wardAddress" });
db.Rap.belongsTo(db.Address, { foreignKey: "wardAddress" });

db.Rap.hasMany(db.Room, { foreignKey: "codeRap" });
db.Room.belongsTo(db.Rap, { foreignKey: "codeRap" });

db.Room.hasMany(db.Seat, { foreignKey: "codeRoom" });
db.Seat.belongsTo(db.Room, { foreignKey: "codeRoom" });

db.TypeSeat.hasMany(db.Price, { foreignKey: "codeTypeSeat" });
db.Price.belongsTo(db.TypeSeat, { foreignKey: "codeTypeSeat" });

db.TypeSeat.hasMany(db.Seat, { foreignKey: "codeTypeSeat" });
db.Seat.belongsTo(db.TypeSeat, { foreignKey: "codeTypeSeat" });

db.Movie.hasMany(db.Showing, { foreignKey: "codeMovie" });
db.Showing.belongsTo(db.Movie, { foreignKey: "codeMovie" });

db.Rap.hasMany(db.Showing, { foreignKey: "codeRap" });
db.Showing.belongsTo(db.Rap, { foreignKey: "codeRap" });

db.Room.hasMany(db.Showing, { foreignKey: "codeRoom" });
db.Showing.belongsTo(db.Room, { foreignKey: "codeRoom" });

db.Showing.hasMany(db.Ticket, { foreignKey: "codeShowing" });
db.Ticket.belongsTo(db.Showing, { foreignKey: "codeShowing" });

db.Seat.hasMany(db.Ticket, { foreignKey: "codeSeat" });
db.Ticket.belongsTo(db.Seat, { foreignKey: "codeSeat" });

db.User.hasMany(db.Ticket, { foreignKey: "codeUser" })
db.Ticket.belongsTo(db.User, { foreignKey: "codeUser" })

db.User.hasMany(db.Order, { foreignKey: "codeUser" })
db.Order.belongsTo(db.User, { foreignKey: "codeUser" });

db.Order.hasMany(db.OrderDetail, { foreignKey: "codeOder" })
db.OrderDetail.belongsTo(db.Order, { foreignKey: "codeOder" });

db.Ticket.hasOne(db.OrderDetail, { foreignKey: "codeTicket", targetKey: "code" });
db.OrderDetail.belongsTo(db.Ticket, { foreignKey: "codeTicket", targetKey: "code" });

db.OtherProduct.hasMany(db.OrderDetail, { foreignKey: "codeProduct" })
db.OrderDetail.belongsTo(db.OtherProduct, { foreignKey: "codeProduct" });


module.exports = {
  // testConnect,
  db,
  sequelize,
};
