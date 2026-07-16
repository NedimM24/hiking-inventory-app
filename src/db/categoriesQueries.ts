import { pool } from "./pool.js";
import type { Category} from "../models/category.js";

//Query to print all categories on my homepage
export async function getAllCategories():Promise<Category[]>{
    const { rows } = await pool.query<Category>("SELECT * FROM categories");
    return rows;
}

//Query to add a new category based on user input on categoryForm
export async function insertNewCategory(
    name: string, description: string, image_url: string): Promise<void>{
            await pool.query(
            "INSERT INTO categories(name, description, image_url) values ($1, $2, $3)",
            [name, description, image_url]
        );
}

