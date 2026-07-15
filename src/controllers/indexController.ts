import type { Request, Response } from "express";
import { getAllCategories, fetchItemsInCategory, fetchItemById, insertNewCategory } from "../db/queries.js";
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
    res.render("categoryDetails", { items })
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

export async function showCategoryForm(req: Request, res: Response) {
    res.render("categoryForm")
}

//VALIDATION GOES HERE 
const alphaErr = "must only contain letters";
const nameLengthErr = "must be between 1 and 25 characters"
const descriptionLengthErr = "must be between 1 and 500 characters"
const imgLengthErr = "must be between 1 and 500 characters";
const invalidUrlErr = "must be a valid url"

//DEFAULT PIC UL
const defaultImageUrl = "https://media.istockphoto.com/id/1131169859/photo/traveling-packing-for-adventure-trip-concept.jpg?s=612x612&w=is&k=20&c=vcOMVpHTT3aJvfq8GhBNRDRse3i0mSfQHapsXChfpL0=";

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
