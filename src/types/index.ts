import { boolean, number, object, string, array, InferOutput } from "valibot";

//draft todavia no tiene ID
export const DraftProductsSchema = object({
    name: string(),
    price: number()
})

//product ya viene con todo
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    avaiability: boolean()
})

export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>