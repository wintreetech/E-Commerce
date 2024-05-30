import dotenv from "dotenv";
dotenv.config();

const keys = {
  app: {
    name: "Mern Ecommerce",
    apiURL: `${process.env.BASE_API_URL}`,
    clientURL: process.env.CLIENT_URL,
  },
  port: process.env.PORT || 8080,
  database: {
    url: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenLife: "7d",
  },
};

export default keys;
