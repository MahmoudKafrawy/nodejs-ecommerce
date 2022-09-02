const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/errorMiddleWare");
dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");

const categoryRoute = require("./routes/categoryRoute");

//DB connect
dbConnection();

// App
const app = express();

// Middlewares
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`NODE ENV is ${process.env.NODE_ENV}`);
}

// Mount Route
app.use("/api/v1/categories", categoryRoute);

//create error and send it to middelwar
app.all("*", (req, res, next) => {
  // const err = new Error(`cant find this route : ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`cant find this route : ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalError);

const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
  console.log(`app run at port : ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error :${err}`);
  process.exit(1);
});
