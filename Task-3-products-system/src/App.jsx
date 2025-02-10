import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Products from './Pages/Products/Products';

const routes = createBrowserRouter([

    {path: '/', element: <Layout />, children: [

        {path: '/', element: <Products />},

    ]},

])

export default function App() {

    return <React.Fragment>

        <RouterProvider router={routes} />

    </React.Fragment>

}
