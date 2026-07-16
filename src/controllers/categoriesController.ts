import type { Request, Response } from "express";
import { getAllCategories, 
    insertNewCategory,
    fetchCategoryById,
    updateCategory
  
} from "../db/categoriesQueries.js";
import { body, validationResult } from "express-validator";

//Function that displays all categories and lives on the homepage
//Calls a get all function from quesries that selects all from categories 
export async function printAllCategories(_req: Request, res: Response) {
    const categories = await getAllCategories();
    res.render("index", {categories})
}

//Renders the new category form
export async function showCategoryForm(req: Request, res: Response) {
    res.render("categoryForm")
}

//Renders the update category form
export async function getUpdateCategoryForm(req: Request, res: Response) {
    const id = Number(req.params.id);
    const category = await fetchCategoryById(id)
    if(!category){
        res.status(404).send("Category not found");
        return
    }

    res.render("updateCategory", {category})
}

//VALIDATION GOES HERE 
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

export const updateCategoryForm = [
    ...validateCategory,
    async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("updateCategory", {
                title: "Update category",
                errors: errors.array(),
                category:{id, ...req.body}
            })
        }
    const { name, description, image_url } = req.body;
    const categoryImage = image_url || defaultImageUrl;
    await updateCategory(id, name, description, categoryImage);
    res.redirect('/');
    }
]