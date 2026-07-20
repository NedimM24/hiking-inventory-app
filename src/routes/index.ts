import express from 'express';
import {
    printAllCategories,
    showCategoryForm,
    createCategory,
    getUpdateCategoryForm,
    updateCategoryForm,
    removeCategory,
} from '../controllers/categoriesController.js';

import {
    getItemsInCategory,
    getItemById,
    showItemForm,
    createItem,
    getUpdateItemForm,
    updateItemForm,
    removeItem,
} from '../controllers/itemsController.js';

const router = express.Router();

//CREATE
router.post('/createCategory', createCategory);
router.post('/categoryDetails/:id/createItem', createItem);
//READ
router.get('/', printAllCategories);
router.get('/categoryDetails/:id', getItemsInCategory);
router.get('/itemDetails/:id', getItemById);
router.get('/newCategory', showCategoryForm);
router.get('/categoryDetails/:id/newItem', showItemForm);
router.get('/:id/updateCategory', getUpdateCategoryForm);
router.get('/:id/updateItem', getUpdateItemForm);
//UPDATE
router.post('/:id/updateCategory', updateCategoryForm);
router.post('/:id/updateItem', updateItemForm);
//DELETE
router.post('/:id/deleteCategory', removeCategory);
router.post('/:id/deleteItem', removeItem);

export default router;
