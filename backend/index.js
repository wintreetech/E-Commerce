import express from "express";
import { config } from "dotenv";
import cors from "cors";
import keys from "./config/keys.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/dbConnection.js";
config();
import chalk from "chalk";

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

const { port } = keys;

app.use(routes);

app.listen(port, () => {
  console.log(
    `${chalk.green("✓")} ${chalk.blue(
      `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
    )}`
  );
  dbConnection();
});
