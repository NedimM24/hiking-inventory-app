import express from "express";
import { printAllCategories, getItemsInCategory } from "../controllers/indexController.js";

const router = express.Router();

router.get('/', printAllCategories);
router.get('/categoryDetails/:id', getItemsInCategory);


export default router