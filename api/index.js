const server = require('./src/app.js');
const { getAllProducts } = require('./src/controllers/index.js');
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(async () => {
  await getAllProducts();
  server.listen(3001, () => {
    console.log('Servidor listening at 3001');
  });
});
