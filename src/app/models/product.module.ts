import { Category } from "./category.module";

export interface Product{
    id:string;
    title:string;
    price:number;
    category:Category;
    description:string;
    images:string[];
    rating?:number;
    rebate?:boolean;
    priceWithOutDiscount?:number;
    discount?:number;
}

export interface CreateProductDTO extends Omit<Product,'id'|'category'|'rating'>{
    categoryId:number;
}

export interface UpdateProductDTO extends Partial<Product>{}