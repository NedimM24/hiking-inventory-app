import express from "express";
import { printAllCategories, getItemsInCategory, getItemById, showCategoryForm } from "../controllers/indexController.js";

const router = express.Router();

router.get('/', printAllCategories);
router.get('/categoryDetails/:id', getItemsInCategory);
router.get('/itemDetails/:id', getItemById);
router.get('/newCategory', showCategoryForm);
//router.post('/newCategory)




export default router