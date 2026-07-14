//models/item.ts
export interface Item{
    id: number;
    name: string;
    description: string | null;
    price: number;
    quantity: number;
    categoty_id:number;
    image_url: string | null;
}