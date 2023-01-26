const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use([morgan("dev"), express.json(), cors()]);
// for router middleware:
app.use("/api/v1/tours", require("./routes/tours.routes"));

// global error handler middleware:
app.use((req, res, next) => {
  const err = new Error("Pages not found!");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send(`<h1>${err.message}</h1>`);
  }

  //   server error:
  return res.status(500).send(`<h1>Server error occured!</h1>`);
});

app.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };
  res.status(200).json(data);
});

module.exports = app;
