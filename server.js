const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ApiError = require("./utils/apiError");
const globalError = require("./middleware/errorMiddleWare");
dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");

const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");

//DB connect
dbConnection();

// App
const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`NODE ENV is ${process.env.NODE_ENV}`);
}

// Mount Route
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);

//create error and send it to middleware
app.all("*", (req, res, next) => {
  // const err = new Error(`cant find this route : ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`cant find this route : ${req.originalUrl}`, 400));
});

//global error handling middleware
app.use(globalError);

const { PORT } = process.env;
const server = app.listen(PORT || 8000, () => {
  console.log(`app run at port : ${PORT}`);
});

// Catch unhandled error by listen on error
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error :${err}`);
  server.close(() => {
    console.log("App Shutting down...");
    process.exit(1);
  });
});
