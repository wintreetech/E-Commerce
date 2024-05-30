import express from "express";
const router = express.Router();

// Import
import AuthRoutes from "./auth.js";

// Auth Routes

router.use("/auth", AuthRoutes);

export default router;
