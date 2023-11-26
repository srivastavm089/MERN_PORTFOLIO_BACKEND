const express = require("express");
const path = require("path")
const myRoute = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());
app.use("/api/v1", myRoute);
app.use(cors({
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true

}))

module.exports = app;
