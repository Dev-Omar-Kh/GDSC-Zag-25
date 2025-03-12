import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layouts/Layout';
import Home from './Pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Product from './Pages/Single-Product/Product';
import AddProduct from './Pages/Add-Product/AddProduct';
import Update from './Pages/Edit-Product/Update';

const routes = createHashRouter([

    {path: '/', element: <Layout />, children: [

        {path: '/', element: <Home />},
        {path: '/:id', element: <Product />},
        {path: '/add', element: <AddProduct />},
        {path: '/update/:id', element: <Update />},

    ]}

]);

export default function App() {

    const queryClient = new QueryClient();

    return <React.Fragment>

        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
        </QueryClientProvider>

    </React.Fragment>

}
