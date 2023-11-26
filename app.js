const express = require("express");
const path = require("path")
const myRoute = require("./routes/userRoutes");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());
app.use("/api/v1", myRoute);
app.use(cors())
app.use('/api', createProxyMiddleware({
    target: ['http://localhost:3000', 'https://portolfio-0jv8.onrender.com'],
    changeOrigin: true
  }));


module.exports = app;
