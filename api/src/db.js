require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// let sequelize =
//   process.env.NODE_ENV === "production"
//     ? new Sequelize({
//         database: DB_NAME,
//         dialect: "postgres",
//         host: DB_HOST,
//         port: 5432,
//         username: DB_USER,
//         password: DB_PASSWORD,
//         pool: {
//           max: 3,
//           min: 1,
//           idle: 10000,
//         },
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//           keepAlive: true,
//         },
//         ssl: true,
//       })
//     : new Sequelize(
//         `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//         {
//           logging: false,
//           native: false,
//         }
//       );

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false,
  native: false,
}); 

const tryConnec = async ()=>{
  try {
    await sequelize.authenticate()
    console.log('Connection succesfully 👍');    
  } catch (e) {
    console.log('error on connection 😢😢😢 ',e);
  }
}
tryConnec()

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Cellphone, Bill, Brand, Os, Cart, Users, DetailCart, Rating } =
  sequelize.models;

// Aca vendrian las relaciones
Users.hasMany(Bill);
Bill.belongsTo(Users);

Users.hasMany(Cart);
Cart.belongsTo(Users);

Cart.belongsToMany(Cellphone, { through: DetailCart });
Cellphone.belongsToMany(Cart, { through: DetailCart });

// Bill.belongsToMany(Cellphone, { through: "CellphoneBill" }); // Futura funcionalidad 
// Cellphone.belongsToMany(Bill, { through: "CellphoneBill" }); // Futura funcionalidad

Os.hasMany(Cellphone);
Cellphone.belongsTo(Os);

Brand.hasMany(Cellphone);
Cellphone.belongsTo(Brand);

Users.hasMany(Rating);
Rating.belongsTo(Users);

Cellphone.hasMany(Rating);
Rating.belongsTo(Cellphone);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
