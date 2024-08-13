import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

//este loader me servira para leer la info del producto que quiero editar
export const loader = async ({ params }: LoaderFunctionArgs) => {
    const id = params.id
    if (id !== undefined) {
        const productById = await getProductById(+id)
        if (!productById) {
            return redirect('/')
        }
        return productById
    }
}

//el action del form en react-router es una funcion que agrego en el router para que se conecte
//siempre esos action tienen que retornar algo
export const action = async ({ request, params }: ActionFunctionArgs) => {
    //aca recupero la data que pone el usuario
    const data = Object.fromEntries(await request.formData())
    //aca valido que no me mande un input vacio
    let error = ''
    if (Object.values(data).includes('')) {
        error = "Todos los campos son obligatorios"
    }
    //si el error tiene algo, lo retorno para que quede disponible en el resto de mi
    //archivo y pueda utilizarlo con el hook useActionData
    if (error.length) {
        return error
    }
    if (params.id !== undefined) {
        await updateProduct(data, +params.id)
    }
    //redirect es una función que toma como argumento un string que es adonde lleva al usuario
    return redirect('/')

}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

const EditProduct = () => {
    //aca tomo el eventual error que surge de mi action y le pongo el as para que lo tome como un string y no como un desconocido o unknow
    const error = useActionData() as string

    //acá leo el producto por id
    const productById = useLoaderData() as Product

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                {/* este link lo que hace es ir de esta pagina a la que yo le ponga en el 'to' */}
                <Link
                    to='/'
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Volver a Productos</Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-10"
                method="POST"
            >
                <ProductForm productById={productById} />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={productById?.avaiability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    )
}

export default EditProduct