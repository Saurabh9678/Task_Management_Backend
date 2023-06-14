const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "https");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-api-key"
  );
  next();
});

//Route Imports
const userRoutes = require("./routes/userRoutes");

//Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello i m working" });
});
app.use("/api/v1/user", userRoutes);


// MiddleWare for Error

app.use(errorMiddleware);



module.exports = app;
