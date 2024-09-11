require('dotenv').config();
const express = require('express');
const connectDb = require('./db/db');
const indexRoutes = require('./routes/index.routes');
const server = express();
const port = process.env.PORT || 4000;
const cors = require('cors')
const path = require('path')

// Increase the limit for JSON and URL-encoded data
server.use(express.json());
server.use('/public', express.static(path.join(__dirname, 'public')))
server.use(express.urlencoded({ extended: true }));

// server.use(cors({
//   origin: 'https://client11-chi.vercel.app',
//   // origin: 'https://solar-frontend-pi.vercel.app',
//   credentials: true
// }));

server.use(cors({
  origin: ['https://client11-chi.vercel.app', 'http://localhost:3000'], // Allow multiple origins
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

connectDb();

// Define a root route
server.get('/', (req, res) => {
  res.send('Hello World! 😁 🎈');
});

server.use('/api', indexRoutes);

server.listen(port, () => {
  console.log(`Server Is Connected At ${port}`);
})     
