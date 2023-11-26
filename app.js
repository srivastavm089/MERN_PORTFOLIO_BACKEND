const express = require("express");
const path = require("path")
const myRoute = require("./routes/userRoutes");
const { createProxyMiddleware } = require('http-proxy-middleware');
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
app.use('/api', createProxyMiddleware({ target: 'https://portolfio-0jv8.onrender.com', changeOrigin: true }));



module.exports = app;
