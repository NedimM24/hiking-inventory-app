//models/Category.ts
export interface Category{
    id: number;
    name: string;
    description: string | null;
    image_url: string | null;
}