const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

// dev logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Mounting routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`.red);
  //Close server and end process
  server.close(() => process.exit(1));
});
