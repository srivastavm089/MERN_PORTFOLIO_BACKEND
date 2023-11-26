const app = require("./app");
const dotenv = require("dotenv");

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
