
const app = require('./app')
const dotenv = require("dotenv");

const connectDataBase = require("./databse/database");
const { v2 } = require("cloudinary");
dotenv.config({ path: "./config/.env" });
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


connectDataBase();

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
