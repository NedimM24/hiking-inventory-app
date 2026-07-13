import type { Request, Response } from "express";
import { getAllCategories } from "../db/queries.js";

export async function printHi(_req: Request, res: Response) {
    const categories = await getAllCategories();
    res.render("index", {categories})
}

