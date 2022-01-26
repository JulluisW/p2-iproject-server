if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const indexRouter = require("./routes/index.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  let statusCode = 500;
  let errorMsg = "Internal server error";

  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    errorMsg = err.errors[0].message;
  } else if (err.name === "EMAIL_EMPTY") {
    statusCode = 400;
    errorMsg = "Email is required";
  } else if (err.name === "PASSWORD_EMPTY") {
    statusCode = 400;
    errorMsg = "Password is required";
  } else if (err.name === "JsonWebTokenError" || err.name === "INVALID_TOKEN") {
    statusCode = 401;
    errorMsg = "Invalid token";
  } else if (err.name === "PRODUCT_NOT_FOUND") {
    statusCode = 404;
    errorMsg = "Product not found!";
  } else if (err.name === "FORBIDDEN") {
    statusCode = 401;
    errorMsg = "You are unauthorized";
  } else if (err.name === "INVALID_EMAIL_PASSWORD") {
    statusCode = 400;
    errorMsg = "Invalid email or password";
  } else if (err.name === "PHONE_INVALID") {
    statusCode = 400;
    errorMsg = "Invalid Phone Number";
  }

  res.status(statusCode).json({
    message: errorMsg,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
