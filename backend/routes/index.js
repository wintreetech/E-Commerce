import express from "express";
import keys from "../config/keys.js";
import apiroutes from "./api/index.js";
const router = express.Router();

const { apiURL } = keys.app;

const api = `/${apiURL}`;

router.use(api, apiroutes);

export default router;
