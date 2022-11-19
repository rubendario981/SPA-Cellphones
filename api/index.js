const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { getAllProducts } = require('./src/controllers/index.js');

conn.sync({ force: false }).then(async () => {
  await getAllProducts();
  server.listen(3001, () => {
    console.log('Servidor listening at 3001');
  });
});
