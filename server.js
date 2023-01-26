const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");

const app = require("./app");

const server = http.createServer(app);

// for mongoose connections:
mongoose.connect(process.env.DB_LOCAL).then(() => {
  console.log(process.env.DB_LOCAL);
  console.log("Mongoose connection successfully established");
});

// server
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// server file e amra sob connect kore rakhbo tai ei server file e amra listen kore diyechi
