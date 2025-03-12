import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logoImg from '../../assets/Images/logo-bg.png';
import { IoBagAddOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { GoHome } from 'react-icons/go';

export default function Header() {

    const [displayPhoneNav, setDisplayPhoneNav] = useState(false);
    const handleDisplayNavClick = () => {
        setDisplayPhoneNav(prev => !prev);
    }

    const linksData = [

        {id: 1, title: 'Home', icon: <GoHome className='text-2xl' />, url: '/'},
        {id: 2, title: 'Add Product', icon: <IoBagAddOutline className='text-2xl' />, url: '/add'},

    ]

    return <React.Fragment>

        <header className='
            sticky top-0 left-0 z-40 w-full py-5 px-[4.5%] flex items-center justify-between 
            border-b border-solid border-[var(--gray-color-3)] bg-[var(--salt-color)]
        '>

            <Link>
                <img 
                    className='h-10' 
                    src={logoImg} alt={'logoImg'} 
                />
            </Link>

            <div onClick={handleDisplayNavClick} 
                className='
                    hidden relative w-14 h-11 bg-[var(--gray-color-3)] rounded-md cursor-pointer overflow-hidden
                    max-[700px]:block
                '
            >
                <span className={`
                    absolute rounded-4xl left-2 w-10 h-1 bg-[var(--blue-color)] duration-300
                    ${displayPhoneNav ? 'rotate-45 top-5' : 'top-2.5'}
                `}></span>
                <span className={`
                    absolute rounded-4xl left-2 top-5 w-10 h-1 bg-[var(--blue-color)] duration-300
                    ${displayPhoneNav ? '-translate-x-full opacity-0' : ''}
                `}></span>
                <span className={`
                    absolute rounded-4xl left-2 w-10 h-1 bg-[var(--blue-color)] duration-300
                    ${displayPhoneNav ? '-rotate-45 top-5 !important' : 'top-7.5'}
                `}></span>
            </div>

            <nav className={`
                bg-[var(--salt-color)]
                max-[700px]:fixed max-[700px]:left-0 max-[700px]:py-5 px-[4.5%] max-[700px]:w-full
                header_height duration-300
                ${displayPhoneNav ? 
                    'max-[700px]:top-21 max-[700px]:opacity-100 max-[700px]:visible' : 
                    'max-[700px]:top-14 max-[700px]:opacity-0 max-[700px]:invisible'
                }
            `}>

                <ul className='flex items-center gap-2.5 max-[700px]:flex-col max-[700px]:gap-5 max-[700px]:w-full'>

                    {linksData.map(link => <li key={link.id} onClick={() => setDisplayPhoneNav(false)} className='max-[700px]:w-full'>
                        <NavLink 
                                to={link.url} 
                                className='
                                    rounded-md flex items-center gap-2 py-2.5 px-5 text-[var(--gray-color-2)]
                                    duration-300 hover:bg-[var(--gray-color-3)] hover:text-[var(--blue-color)]
                                    max-[700px]:w-full max-[700px]:justify-center max-[700px]:py-5
                                '
                            >
                            {link.icon}
                            <p className='text-base font-semibold'>{link.title}</p>
                        </NavLink>
                    </li>)}

                    <button onClick={() => setDisplayPhoneNav(false)} className='
                        py-2.5 px-5 hidden items-center gap-2 rounded-md bg-[var(--gray-color-3)] text-[var(--blue-color)] cursor-pointer
                        duration-300 hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)] 
                        max-[700px]:flex max-[700px]:w-full max-[700px]:justify-center max-[700px]:py-5
                    '>
                        <IoIosSearch className='text-2xl' />
                        <p className='text-base font-semibold'>Search</p>
                    </button>

                </ul>

            </nav>

            <button className='
                py-2.5 px-5 flex items-center gap-2 rounded-md bg-[var(--gray-color-3)] text-[var(--blue-color)] cursor-pointer
                duration-300 hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)] max-[700px]:hidden
            '>
                <IoIosSearch className='text-2xl' />
                <p className='text-base font-semibold'>Search</p>
            </button>

        </header>

    </React.Fragment>

}
