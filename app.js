const express = require("express");
const myRoute = require("./routes/userRoutes");
const cookieParser = require("cookie-parser")
const app = express();

app.use(express.json());
app.use("/api/v1", myRoute);
app.use(cookieParser)


module.exports = app;
