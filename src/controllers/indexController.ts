import type { Request, Response } from "express";
import { getAllCategories, 
    fetchItemsInCategory, 
    fetchItemById, 
    insertNewCategory,
    insertNewItem,
} from "../db/queries.js";
import { body, validationResult } from "express-validator";

//Function that displays all categories and lives on the homepage
//Calls a get all function from quesries that selects all from categories 
export async function printAllCategories(_req: Request, res: Response) {
    const categories = await getAllCategories();
    res.render("index", {categories})
}

//Function displays all of the items in the category when a user clicks on view all
//Id is passed based on the matching category_id and themn the categoryDetails views is rendered
export async function getItemsInCategory(req: Request, res: Response) {
    const id = Number(req.params.id);
    const items = await fetchItemsInCategory(id)
    res.render("categoryDetails", { items, categoryId: id })
}

//Function displays all of the items in the category when a user clicks on view all
//Id is passed based on the matching category_id and themn the categoryDetails views is rendered
export async function getItemById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await fetchItemById(id)

    if(!item){
        res.status(404).send("Oops, item not found!");
        return;
    }
    res.render("itemDetails", { item })
}

//Renders the new category form
export async function showCategoryForm(req: Request, res: Response) {
    res.render("categoryForm")
}

//Getting the category id here to pass to item form so we can submmit the item to the correct category
export async function showItemForm(req: Request, res: Response) {
    const id = Number(req.params.id);
    res.render("itemForm", {categoryId: id})
}

//VALIDATION GOES HERE 
const alphaErr = "must only contain letters";
const nameLengthErr = "must be between 1 and 25 characters"
const descriptionLengthErr = "must be between 1 and 500 characters"
const imgLengthErr = "must be between 1 and 500 characters";
const invalidUrlErr = "must be a valid url"

//DEFAULT PIC UL
const defaultImageUrl = "https://media.istockphoto.com/id/1131169859/photo/traveling-packing-for-adventure-trip-concept.jpg?s=612x612&w=is&k=20&c=vcOMVpHTT3aJvfq8GhBNRDRse3i0mSfQHapsXChfpL0=";
const defaultImageItem = "https://media.istockphoto.com/id/2196091561/photo/backpack-for-hiking.jpg?s=612x612&w=is&k=20&c=d2XSWgR2h9fLVVbx06SexOtBz7mCaAd2_avog3FQeME=";

const validateCategory = [
    body("name").trim()
        .isLength({min:1, max: 25}).withMessage(`Name ${nameLengthErr}`),
    body("description").trim()
        .isLength({min:1, max: 500}).withMessage(`Description ${descriptionLengthErr}`),
    body("image_url").trim()
        .optional({ checkFalsy: true })
        .isURL().withMessage(`URL ${invalidUrlErr}`)
        .isLength({min:1, max: 500}).withMessage(`Image url ${imgLengthErr}`),
]

//POST category
//Gets necessary info from the form
//Inserts info to query 
export const createCategory = [
    ...validateCategory,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("categoryForm", {
                title: "Create new category",
                errors: errors.array(),
            })
        }
    
    const { name, description, image_url } = req.body;
    const categoryImage = image_url || defaultImageUrl;
    await insertNewCategory(name, description, categoryImage);
    res.redirect('/');
 }
];

//ITEM validation
const negative = "cannot be a negative number";
const numLength = "must be between 0 and 9999"

const validateItem = [
    body("name").trim()
        .isLength({min:1, max: 25}).withMessage(`Name ${nameLengthErr}`),
    body("description").trim()
        .isLength({min:1, max: 500}).withMessage(`Description ${descriptionLengthErr}`),
    body("price")
        .isFloat({min: 0, max: 9999}).withMessage(`price ${negative} and ${numLength}`),
    body("quantity")
        .isInt({min: 0, max: 9999}).withMessage(`quantity ${negative} and ${numLength}`),
    body("image_url").trim()
        .optional({ checkFalsy: true })
        .isURL().withMessage(`URL ${invalidUrlErr}`)
        .isLength({min:1, max: 500}).withMessage(`Image url ${imgLengthErr}`),
]

//POST item
//Get the category id from url to pass into insert new item
//Once the new item is created we go back to the category
export const createItem = [
    ...validateItem, 
    async (req: Request, res: Response) => {
        const itemErrors = validationResult(req);
        if(!itemErrors.isEmpty()){
            return res.status(400).render("itemForm", {
                title: "Create new item",
                categoryId: Number(req.params.id),
                errors: itemErrors.array(),
            })
        }
    const categoryId = Number(req.params.id);
    const { name , description, price, quantity, image_url } = req.body;
    const itemImage = image_url || defaultImageItem;
    await insertNewItem( name , description, price, quantity, categoryId, itemImage);
    res.redirect(`/categoryDetails/${categoryId}`)
}
];