import type { Request, Response } from "express";
import { getAllCategories, fetchItemsInCategory, fetchItemById, insertNewCategory } from "../db/queries.js";

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

//POST category
export async function createCategory(req: Request, res: Response) {
    const { name, description, image_url } = req.body;
    await insertNewCategory(name, description, image_url);
    res.redirect('/');
}





