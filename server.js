const express = require("express");
const dotenv = require("dotenv");

// Route files
const bootcamps = require("./routes/bootcamps");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

//Mounting routers
app.use("/api/v1/bootcamps", bootcamps);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
