const server = require("./src/App.js");
const { conn } = require("./src/db.js");
const { getAllProducts } = require("./src/controllers/index.js");

const port = process.env.PORT || 0

const app = server.listen(port, () => {
	console.log("Server listening at port", app.address().port);
});

conn.sync({ force: true }).then(async () => {
  await getAllProducts();
});
