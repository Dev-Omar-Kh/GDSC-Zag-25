import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home/Home';
import Product from './Pages/Single-Product/Product';

const routes = createHashRouter([

    {path: '/', element: <MainLayout />, children: [

        {path: '/', element: <Home />},
        {path: '/single-pro/:id', element: <Product />},

    ]},

])

export default function App() {

    return <React.Fragment>

        <RouterProvider router={routes} />

    </React.Fragment>

}
