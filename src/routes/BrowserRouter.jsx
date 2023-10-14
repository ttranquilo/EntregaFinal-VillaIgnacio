import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProductLoader, ItemPreviewPage, CheckoutPage, SummaryPage, LoginPage } from '../pages';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <ProductLoader />
    },
    {
        path: '/product/:productId',
        element: <ItemPreviewPage />
    },
    ,
    {
        path: '/category/:id',
        element: <ProductLoader />
    },

    {
        path: '/order/:id',
        element: <SummaryPage />
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        //Status for processing cart order
        path: '/checkout/:status',
        element: <CheckoutPage />,
    },
    {
        path: '/login',
        element: <LoginPage />
    }
]);

const CustomBrowserRouter = () => {
    return (
        <RouterProvider router={routes} />
    )
}

export default CustomBrowserRouter;