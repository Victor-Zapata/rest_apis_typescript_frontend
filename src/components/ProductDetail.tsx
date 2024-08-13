import { Link, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { Product } from "../types"
import { deleteProduct } from "../services/ProductService"

type ProductDetailProps = {
    item: Product
}

export const action = async ({ params }: ActionFunctionArgs) => {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }

}

const ProductDetail = ({ item }: ProductDetailProps) => {
    //cuando quiero interactuar en una pagina sin irmde de ella (like de IG, por ejemplo) uso el hook useFetcher
    const fetcher = useFetcher()
    const isAvaiable = item.avaiability

    /*A diferencia de Link, useNavigate puede usarse antes o despues del return
    La siguiente es otra forma de redireccionar al usuario
    */
    //al guardar el hook en una constate, ese navigate tiene todos los metodos ahi y puede ser utilizado en cualquier parte del componente

    //const navigate = useNavigate()
    /** despues del return, en lugar de un link hacemos esto
     * 
     * <button
     * onClick={() => navigate(`/products/${item.id}/edit`)}
     * >Editar</button>
     */
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {item.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {" "}{formatCurrency(item.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        //para manejar la disponibilida unicamente requerimos que nos pasen el ID
                        name="id"
                        value={item.id}
                        className={`${isAvaiable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >

                        {isAvaiable ? 'Disponible' : "No disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <Link
                        to={`/products/${item.id}/edit`}
                        className="rounded-lg w-full bg-indigo-600 p-2 text-xs text-center uppercase font-bold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Editar
                    </Link>
                    <Form
                        className="w-full"
                        method="POST"
                        //le agrego un action para que vaya a esa url y no nos tire un 405 (metodo no soportado)
                        //el action tiene que ser el mismo que tengo en mi router para que funcione
                        action={`products/${item.id}/delete`}
                        //para preguntar si REALMENTE quiere eliminar un producto, implemento un onSubmit, que se ejecuta primero que el action
                        onSubmit={(e) => {
                            if (!confirm('Eliminar?')) {
                                //si no prevengo la accion por default se ejecuta el action
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type="submit"
                            value='Eliminar'
                            className="rounded-lg bg-red-600 w-full p-2 text-xs text-center uppercase font-bold text-white shadow-sm hover:bg-red-500"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}

export default ProductDetail