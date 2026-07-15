import express from "express";
import { printAllCategories, 
    getItemsInCategory, 
    getItemById, 
    showCategoryForm, 
    createCategory,
    showItemForm,
    createItem
} from "../controllers/indexController.js";

const router = express.Router();

router.get('/', printAllCategories);
router.get('/categoryDetails/:id', getItemsInCategory);
router.get('/itemDetails/:id', getItemById);
router.get('/newCategory', showCategoryForm);
router.post('/createCategory', createCategory);

router.get('/categoryDetails/:id/newItem', showItemForm);
router.post('/categoryDetails/:id/createItem', createItem);




export default router