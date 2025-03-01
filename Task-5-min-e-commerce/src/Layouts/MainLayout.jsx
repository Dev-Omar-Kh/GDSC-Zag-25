import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

export default function MainLayout() {

    const location = useLocation();

    // ====== scroll-to-top ====== //

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.key]);

    return <React.Fragment>

        <Header />

        <main className='flex flex-col gap-10'>
            <Outlet />
        </main>

        <Footer />

    </React.Fragment>

}
