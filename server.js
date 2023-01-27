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
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server file e amra sob connect kore rakhbo tai ei server file e amra listen kore diyechi
