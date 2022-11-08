import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'

const server = express()

server.use(bodyParser.urlencoded({ extended: true, limit: "50Mb"}))
server.use(bodyParser.json({limit: "50Mb"}))
server.use(cookieParser())
server.use(morgan('dev'))
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// server.use(cors())

console.log("server is running in port ");

server.get('/', (req, res)=>{
  res.json("Hello world")
})

server.listen(3001)