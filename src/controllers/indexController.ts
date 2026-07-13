
import type { Request, Response } from "express";

export async function printHi(_req: Request, res: Response) {
    res.render("index")
}

