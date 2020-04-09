/**
 * Title: server.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const securityQuestions = require("./routes/security-questions");

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Development logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/security-questions", securityQuestions);

// Initilize errorHandler middleware
// mounted routes must be mounted before this statement
// in order to use the middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled Promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`ERROR: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
