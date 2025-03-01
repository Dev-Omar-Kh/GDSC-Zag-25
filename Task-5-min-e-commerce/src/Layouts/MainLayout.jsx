import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

export default function MainLayout() {

    return <React.Fragment>

        <Header />

        <main className='flex flex-col gap-10'>
            <Outlet />
        </main>

        <Footer />

    </React.Fragment>

}
