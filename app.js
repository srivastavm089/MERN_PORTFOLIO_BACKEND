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
app.use(express.static(path.resolve("./frontend/build")))
app.get("*", (req,res)=>{
 res.sendFile(path.resolve("./frontend/build/index.html"))
})
module.exports = app;
