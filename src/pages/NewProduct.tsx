import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

//el action del formen react-router es una funcion que agrego en el router para que se conecte
//siempre esos action tienen que retornar algo
export const action = async ({ request }: ActionFunctionArgs) => {
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
    await addProduct(data)
    //redirect es una función que toma como argumento un string que es adonde lleva al usuario
    return redirect('/')

}

const NewProduct = () => {
    //aca tomo el eventual error que surge de mi action y le pongo el as para que lo tome como un string y no como un desconocido o unknow
    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}

export default NewProduct