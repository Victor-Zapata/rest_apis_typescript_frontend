
//EN ESTE ARCHIVO SEPARO TODOS LOS LLAMADOS A MI REST API
import { number, parse, pipe, safeParse, string, transform } from "valibot";
import { DraftProductsSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
    [k: string]: FormDataEntryValue
}

export const addProduct = async (data: ProductData) => {
    try {
        //como segundo argumento de safeparse le paso un objeto ya modificado para que conserve el type y no me tire error
        const result = safeParse(DraftProductsSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            const { data } = await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })

        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {

    }
}

export const getProduct = async () => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios.get(url)

        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios.get(url)

        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (data: ProductData, id: Product['id']) => {
    /**Según la documentación de valibot se debe usar { pipe, string, transform y number } para poder crear el schema que convierte un string a número. Tengo que hacerlo porque el price lo recibo como string */

    try {
        //Este es el schema ya listo
        const NumberSchema = pipe(string(), transform(Number), number());
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            avaiability: toBoolean(data.availability.toString())
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error);
    }

}

export const deleteProduct = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error);
    }
}

export const updateProductAvaiability = async (id: Product['id']) => {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error);
    }
}
