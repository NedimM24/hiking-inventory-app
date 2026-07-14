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