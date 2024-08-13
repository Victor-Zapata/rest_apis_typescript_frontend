import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Products, { loader as productsLoader, action as updateAvaiabilityAction } from "./pages/Products";
import NewProduct, { action as newProductAction } from "./pages/NewProduct";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./pages/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";

/**RECORDAR
 * loader son para obtener datos
 * action son para modificar los datos existentes
 */

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvaiabilityAction
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', //ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'products/:id/delete',
                action: deleteProductAction
            }
        ]
    }
])