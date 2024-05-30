import mongoose from "mongoose";

import keys from "../config/keys.js";

const { url } = keys.database;

const dbConnection = async () => {
  try {
    const connect = await mongoose.connect(url);
    console.log("App is Connected to ", connect.connection.host);
  } catch (error) {
    process.exit(1);
  }
};

export default dbConnection;
