import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProduct, updateProductAvaiability } from "../services/ProductService"
import ProductDetail from "../components/ProductDetail"
import { Product } from "../types"

//aqui puedo implementar un loader, una herramienta que me permite consultas a un api de forma mas eficiente que un useeffect, axios o fetch
export const loader = async () => {
    const products = await getProduct()
    return products
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData())
    await updateProductAvaiability(+data.id)

    return {}
}

const Products = () => {
    //le doy el tipo con as Product[]
    const products = useLoaderData() as Product[]

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                {/* este link lo que hace es ir de esta pagina a la que yo le ponga en el 'to' */}
                <Link
                    to='products/new'
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar Producto</Link>
            </div>
            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((item) => {
                                return <ProductDetail key={item.id} item={item} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products