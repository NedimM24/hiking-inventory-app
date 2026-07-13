import { pool } from "./pool.js";
import type { Category } from "../models/category.js";

export async function getAllCategories():Promise<Category[]>{
    const { rows } = await pool.query<Category>("SELECT * FROM categories");
    return rows;
}