const app = require("./app");
const dotenv = require("dotenv");
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3001'); // Replace with your actual frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Origin', '*'); 
  next();
});


const connectDataBase = require("./databse/database");
const { v2 } = require("cloudinary");
dotenv.config({ path: "./config/.env" });
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET,
});
connectDataBase();


app.listen(process.env.PORT || 4001, () => {
  console.warn(`server is runnning on ${process.env.PORT}`);
});
