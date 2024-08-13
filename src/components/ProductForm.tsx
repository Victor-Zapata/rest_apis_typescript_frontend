import { Product } from "../types"

type ProductFormProps = {
    //le voy a decir que puede o no haber un producto, para que este componente sea reutilizable en edicion o registro (donde NO hay un producto)
    productById?: Product
}

const ProductForm = ({ productById }: ProductFormProps) => {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={productById?.name}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={productById?.price}
                />
            </div>
        </>
    )
}

export default ProductForm