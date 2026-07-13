import express from "express";
import { printHi } from "../controllers/indexController.js";

const router = express.Router();

router.get('/', printHi);

export default router