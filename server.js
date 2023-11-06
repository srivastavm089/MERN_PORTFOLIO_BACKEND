const app = require("./app");
const dotenv = require("dotenv");

const connectDataBase = require("./databse/database");
dotenv.config({ path: "./config/.env" });

connectDataBase();

app.listen(process.env.PORT, () => {
  console.log(`server is runnning on ${process.env.PORT}`);
});
