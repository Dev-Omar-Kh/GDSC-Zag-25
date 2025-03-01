import React from 'react';
import {Link} from 'react-scroll';

import mainBgImg from '../../../assets/Images/main-bg.jpg';
import { IoCartOutline } from 'react-icons/io5';

export default function Main() {

    return <React.Fragment>

        <section className='relative w-full h-screen overflow-hidden'>

            <img className='absolute top-0 left-0 w-full h-full object-cover z-0' src={mainBgImg} alt="main background" />

            <div className='absolute top-0 left-0 w-full h-full px-10 py-5 pt-28 bg-[var(--opacity-darker-color)] flex items-center justify-end z-10 max-[500px]:px-5'>

                <div className='w-1/2 p-5 rounded-xl flex flex-col gap-5 bg-[var(--white-color)] max-[855px]:w-3/4 max-[590px]:w-full'>

                    <div className='w-full flex flex-col gap-1'>

                        <p className='text-base font-medium text-[var(--dark-color)] max-[430px]:text-sm'>Online Shopping</p>

                        <h3 className='w-3/4 text-5xl font-bold text-[var(--orange-color)] max-[1075px]:w-full max-[430px]:text-3xl'>Discover Our New Collection</h3>

                    </div>

                    <p className='text-base font-medium text-[var(--dark-color)] max-[430px]:text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>

                    <Link to="products" spy={true} smooth={true} duration={300} className='w-fit px-5 py-2.5 flex items-center justify-center gap-1 rounded-sm bg-[var(--orange-color)] text-base text-[var(--white-color)] cursor-pointer max-[430px]:w-full'>
                        <IoCartOutline className='text-2xl' />
                        Start Shopping
                    </Link>

                </div>

            </div>

        </section>

    </React.Fragment>

}
