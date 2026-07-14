import { pool } from "./pool.js";
import type { Category} from "../models/category.js";
import type { Item} from "../models/item.js";

export async function getAllCategories():Promise<Category[]>{
    const { rows } = await pool.query<Category>("SELECT * FROM categories");
    return rows;
}

export async function fetchItemsInCategory(id:number):Promise<Item[]>{
    const { rows } = await pool.query<Item>("SELECT * FROM items WHERE category_id = $1", [id]);
    return rows;
}

export async function fetchItemById(id:number):Promise<Item | undefined>{
    const { rows } = await pool.query<Item>("SELECT * FROM items WHERE id = $1", [id]);
    return rows[0];
}

export async function insertNewCategory(
    name: string, description: string, image_url: string): Promise<void>{
            await pool.query(
            "INSERT INTO categories(name, description, image_url) values ($1, $2, $3)",
            [name, description, image_url]
        );
}