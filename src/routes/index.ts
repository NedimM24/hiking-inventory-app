import express from "express";
import { printAllCategories, getItemsInCategory, getItemById } from "../controllers/indexController.js";

const router = express.Router();

router.get('/', printAllCategories);
router.get('/categoryDetails/:id', getItemsInCategory);
router.get('/itemDetails/:id', getItemById);


export default router