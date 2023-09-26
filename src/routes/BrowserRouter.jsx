import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import { ProductLoader, ItemPreviewPage, CheckoutPage } from '../pages';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <ProductLoader />
    },
    {
        path: '/product/:productId',
        element: <ItemPreviewPage/>
    },
    ,
    {
        path: '/category/:id',
        element: <ProductLoader/>
    },
    {
        path: '/checkout',
        element: <CheckoutPage />
    }
]);

const CustomBrowserRouter = () => {
    return ( 
        <RouterProvider router={routes}/>
    )
}

export default CustomBrowserRouter;