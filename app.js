const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const {
  globalErrorStatus,
  globalErrorHandler,
} = require("./error/globalError");

app.use([morgan("dev"), express.json(), cors()]);
// for router middleware:
app.use("/api/v1/tours", require("./routes/tours.routes"));

// for global error handler middleware:
app.use([globalErrorStatus, globalErrorHandler]);

app.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };
  res.status(200).json(data);
});

module.exports = app;
