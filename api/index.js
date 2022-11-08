const server = require('./src/app.js');

server.listen(3001, () => {
  console.log('server escuchando en el puerto 3001');
});
