import express from "express";
import {
    printAllCategories,
    showCategoryForm,
    createCategory,
    getUpdateCategoryForm,
    updateCategoryForm
} from "../controllers/categoriesController.js"

import { 
    getItemsInCategory, 
    getItemById, 
    showItemForm,
    createItem
} from "../controllers/itemsController.js";

const router = express.Router();

router.get('/', printAllCategories);
router.get('/categoryDetails/:id', getItemsInCategory);
router.get('/itemDetails/:id', getItemById);
router.get('/newCategory', showCategoryForm);
router.post('/createCategory', createCategory);
router.get('/categoryDetails/:id/newItem', showItemForm);
router.post('/categoryDetails/:id/createItem', createItem);

router.get("/:id/updateCategory", getUpdateCategoryForm)
router.post("/:id/updateCategory", updateCategoryForm)


//CREATE

//READ

//UPDATE

//DELETE




export default router