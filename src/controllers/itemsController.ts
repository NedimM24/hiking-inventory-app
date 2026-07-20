import type { Request, Response } from 'express';
import {
    fetchItemsInCategory,
    fetchItemById,
    insertNewItem,
    updateItem,
    deleteItem,
} from '../db/itemsQueries.js';
import { body, validationResult } from 'express-validator';
import { fetchCategoryById } from '../db/categoriesQueries.js';

//Function displays all of the items in the category when a user clicks on view all
//Id is passed based on the matching category_id and themn the categoryDetails views is rendered
export async function getItemsInCategory(req: Request, res: Response) {
    const id = Number(req.params.id);
    const items = await fetchItemsInCategory(id);
    const category = await fetchCategoryById(id);
    res.render('categoryDetails', { category, items, categoryId: id });
}

//Function displays all of the items in the category when a user clicks on view all
//Id is passed based on the matching category_id and themn the categoryDetails views is rendered
export async function getItemById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await fetchItemById(id);

    if (!item) {
        res.status(404).send('Oops, item not found!');
        return;
    }
    res.render('itemDetails', { item });
}

//Function to delete an item
export async function removeItem(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await fetchItemById(id);

    if (!item) {
        return res.status(404).send('item not found');
    }

    await deleteItem(id);
    res.redirect(`/categoryDetails/${item.category_id}`);
}

//Getting the category id here to pass to item form so we can submmit the item to the correct category
export async function showItemForm(req: Request, res: Response) {
    const id = Number(req.params.id);
    res.render('itemForm', { categoryId: id });
}

//Getting the category id here to pass to item form so we can submmit the item to the correct category
export async function getUpdateItemForm(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await fetchItemById(id);

    if (!item) {
        return res.status(404).send('item not found');
    }
    res.render('updateItem', { item, categoryId: item.category_id });
}

//VALIDATION GOES HERE
const nameLengthErr = 'must be between 1 and 25 characters';
const descriptionLengthErr = 'must be between 1 and 500 characters';
const imgLengthErr = 'must be between 1 and 500 characters';
const invalidUrlErr = 'must be a valid url';
const negative = 'cannot be a negative number';
const numLength = 'must be between 0 and 9999';

//DEFAULT PIC URL
const defaultImageItem =
    'https://media.istockphoto.com/id/2196091561/photo/backpack-for-hiking.jpg?s=612x612&w=is&k=20&c=d2XSWgR2h9fLVVbx06SexOtBz7mCaAd2_avog3FQeME=';

const validateItem = [
    body('name').trim().isLength({ min: 1, max: 25 }).withMessage(`Name ${nameLengthErr}`),
    body('description')
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage(`Description ${descriptionLengthErr}`),
    body('price').isFloat({ min: 0, max: 9999 }).withMessage(`price ${negative} and ${numLength}`),
    body('quantity')
        .isInt({ min: 0, max: 9999 })
        .withMessage(`quantity ${negative} and ${numLength}`),
    body('image_url')
        .trim()
        .optional({ checkFalsy: true })
        .isURL()
        .withMessage(`URL ${invalidUrlErr}`)
        .isLength({ min: 1, max: 500 })
        .withMessage(`Image url ${imgLengthErr}`),
];

//POST item
//Get the category id from url to pass into insert new item
//Once the new item is created we go back to the category
export const createItem = [
    ...validateItem,
    async (req: Request, res: Response) => {
        const itemErrors = validationResult(req);
        if (!itemErrors.isEmpty()) {
            return res.status(400).render('itemForm', {
                title: 'Create new item',
                categoryId: Number(req.params.id),
                errors: itemErrors.array(),
            });
        }
        const categoryId = Number(req.params.id);
        const { name, description, price, quantity, image_url } = req.body;
        const itemImage = image_url || defaultImageItem;
        await insertNewItem(name, description, price, quantity, categoryId, itemImage);
        res.redirect(`/categoryDetails/${categoryId}`);
    },
];

export const updateItemForm = [
    ...validateItem,
    async (req: Request, res: Response) => {
        const itemErrors = validationResult(req);
        if (!itemErrors.isEmpty()) {
            return res.status(400).render('itemForm', {
                title: 'Create new item',
                categoryId: Number(req.params.id),
                errors: itemErrors.array(),
            });
        }

        const { name, description, price, quantity, image_url } = req.body;
        const itemImage = image_url || defaultImageItem;
        const id = Number(req.params.id);
        const categoryId = Number(req.body.category_id);
        await updateItem(id, name, description, price, quantity, categoryId, itemImage);
        res.redirect(`/itemDetails/${id}`);
    },
];
