import React, { useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import Cart from '../../Pages/Cart';
import { AnimatePresence } from 'framer-motion';

import logo from '../../assets/Images/fs-logo.png';

export default function Header() {

    const [displayCartPage, setDisplayCartPage] = useState(false)

    const cartCount = useSelector(state => state.cartCount)

    return <React.Fragment>

        <AnimatePresence>
            {displayCartPage && <Cart setDisplayCartPage={setDisplayCartPage} />}
        </AnimatePresence>

        <header className="
            w-full common-padding flex items-center justify-between border-b border-solid border-[var(--light-violet-color)]
            sticky top-0 left-0 z-40 bg-[var(--white-color)]
        ">

            <img className='h-12' src={logo} alt="fake-store-logo" />

            <button 
                onClick={() => setDisplayCartPage(true)} 
                className='relative p-2.5 bg-[var(--light-violet-color)] rounded-md cursor-pointer'
            >
                <span 
                    className='
                        absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center 
                        rounded-full bg-[var(--violet-color)] text-[var(--white-color)] text-[0.65rem]
                    '
                >
                    {cartCount}
                </span>
                <RiShoppingCartLine className='text-2xl text-[var(--violet-color)]' />
            </button>

        </header>

    </React.Fragment>

}
