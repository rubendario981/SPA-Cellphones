const server = require("./src/App.js");
const { conn } = require("./src/db.js");
const { getAllProducts } = require("./src/controllers/index.js");

conn.sync({ force: true }).then(async () => {
  await getAllProducts();
  server.listen(process.env.PORT, () => {
    console.log("Server listening at " + process.env.PORT);
  });
});
