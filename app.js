const express = require("express");
const path = require("path");
const myRoute = require("./routes/userRoutes");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/api/v1", myRoute);

module.exports = app;
