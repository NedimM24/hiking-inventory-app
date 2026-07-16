import { pool } from "./pool.js";
import type { Category} from "../models/category.js";

//Query to print all categories on my homepage
export async function getAllCategories():Promise<Category[]>{
    const { rows } = await pool.query<Category>("SELECT * FROM categories ORDER BY name");
    return rows;
}

export async function fetchCategoryById(id:number):Promise<Category | undefined>{
    const { rows } = await pool.query<Category>("SELECT * FROM categories WHERE id = $1", [id]);
    return rows[0];
}

//Query to add a new category based on user input on categoryForm
export async function insertNewCategory(
    name: string, description: string, image_url: string): Promise<void>{
            await pool.query(
            "INSERT INTO categories(name, description, image_url) values ($1, $2, $3)",
            [name, description, image_url]
        );
}

export async function updateCategory(
    id: number, name: string, description: string, image_url: string): Promise<void>{
            await pool.query(
            "UPDATE categories SET name = $1, description = $2, image_url = $3 WHERE id = $4",
            [name, description, image_url, id]
    );
}

