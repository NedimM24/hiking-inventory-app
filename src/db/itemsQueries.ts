import { pool } from "./pool.js";
import type { Item} from "../models/item.js";

//Finds the matching category_id in items and prints all items matching the category
//(Print all shoe items in the category shoes)
export async function fetchItemsInCategory(id:number):Promise<Item[]>{
    const { rows } = await pool.query<Item>("SELECT * FROM items WHERE category_id = $1 ORDER BY name", [id]);
    return rows;
}

export async function fetchItemById(id:number):Promise<Item | undefined>{
    const { rows } = await pool.query<Item>("SELECT * FROM items WHERE id = $1", [id]);
    return rows[0];
}

export async function insertNewItem(
    name: string, description: string, price: number, quantity:number, category_id: number, image_url: string): Promise<void>{
            await pool.query(
            "INSERT INTO items(name, description, price, quantity, category_id, image_url) values ($1, $2, $3, $4, $5, $6)",
            [name, description, price, quantity, category_id, image_url]
        );
}

export async function updateItem(
    id: number,name: string, description: string, price: number, quantity:number, category_id: number, image_url: string): Promise<void>{
            await pool.query(
            "UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5, image_url = $6 WHERE id = $7",
            [name, description, price, quantity, category_id, image_url, id]
    );
}

export async function deleteItem(id: number): Promise<void>{
    await pool.query(
        "DELETE FROM items WHERE id = $1",
        [id]
    )
}