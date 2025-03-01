import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoSearchOutline } from 'react-icons/io5';

import logoImg from '../../assets/Images/logo-bg.png';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import { Axios, getAllProducts } from '../../assets/APIs/API';

export default function Header() {

    const [displayContSearch, setDisplayContSearch] = useState(false);

    // ====== get-data-to-search ====== //

    const [proData, setProData] = useState(null);
    const [errorDataFetch, setErrorDataFetch] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const getProducts = async() =>{

        try {
            const {data} = await Axios.get(getAllProducts);
            setProData(data?.data || []);
        } catch (error) {
            setErrorDataFetch('Failed to search');
            console.log(error.response.data.message);
        }

    }

    useEffect(() => {

        getProducts();

    }, []);

    const filteredProducts = proData?.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const closeSearchPage = () => {

        setDisplayContSearch(false);
        setSearchTerm('');

    }

    return <React.Fragment>

        <header className='fixed top-0 left-0 z-50 w-full px-10 py-5 flex items-center justify-between shadow-[0_0px_10px_var(--opacity-gray-color)] bg-[var(--white-color)]  max-[500px]:px-5'>

            <Link>
                <img className='h-12' src={logoImg} alt={'shopping-logo'} />
            </Link>

            <div className='relative w-80 h-10 rounded-md flex items-center max-[560px]:hidden'>

                <input className='w-full h-full px-2 outline-none text-base rounded-tl-md rounded-bl-md border border-solid border-[var(--gray-color)] border-r-0 text-[var(--dark-color)] duration-300 focus:border-[var(--orange-color)]' placeholder='Search...' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <button className='w-10 h-full px-2 flex items-center justify-center border rounded-tr-md rounded-br-md border-solid border-[var(--orange-color)] text-2xl cursor-pointer bg-[var(--orange-color)] text-[var(--white-color)]' type="button">
                    <IoSearchOutline />
                </button>

                <AnimatePresence>

                    {searchTerm.length > 0 && <motion.div variants={Animations.displayList} initial='hidden' animate='visible' exit={'exit'} className='absolute left-0 top-12 w-full flex flex-col max-h-60 overflow-auto bg-[var(--white-color)] rounded-md border border-solid border-[var(--gray-color)] shadow-[0_0px_10px_var(--opacity-gray-color)] z-50'>

                        { filteredProducts && !errorDataFetch && filteredProducts.length > 0 ? filteredProducts.map((item, idx) => <Link onClick={() => setSearchTerm('')} to={`/single-pro/${item.id}`} key={idx} className='w-full px-5 py-2.5 border-b border-solid border-[var(--gray-color)] text-center text-base font-medium text-[var(--dark-color)] last:border-b-0 cursor-pointer duration-300 hover:bg-[var(--orange-color)] hover:text-[var(--white-color)]'>{`${item.title.split(' ').slice(0, 3).join(' ')}${item.title.split(' ').length > 3 ? '...' : ''}`}</Link>) : !errorDataFetch && <p className='px-5 py-2.5 border-b border-solid border-[var(--gray-color)] text-center text-base font-medium text-[var(--dark-color)] last:border-b-0'>No results matched</p>}

                        {errorDataFetch && <p className='px-5 py-2.5 border-b border-solid border-[var(--gray-color)] text-center text-base font-medium text-[var(--dark-color)] last:border-b-0'>{errorDataFetch}</p>}

                    </motion.div>}

                </AnimatePresence>

            </div>

            <button onClick={() => setDisplayContSearch(true)} className='h-12 px-2.5 flex items-center justify-center gap-1.5 text-base text-[var(--white-color)] rounded-md bg-[var(--orange-color)] cursor-pointer min-[560px]:hidden'>
                <IoSearchOutline className='text-2xl' />
                Search
            </button>

            <AnimatePresence>

                    {displayContSearch && <motion.div variants={Animations.opacityVariantsNoStagger} initial='hidden' animate='visible' exit={'exit'} className='fixed inset-0 w-full h-full px-10 py-5 backdrop-blur-sm bg-[var(--opacity-dark-color)] flex items-center justify-center max-[500px]:px-5'>

                        <button onClick={closeSearchPage} className='fixed top-5 right-10 w-12 h-12 text-3xl cursor-pointer rounded-full bg-[var(--white-color)] flex items-center justify-center max-[500px]:right-5'>
                            <IoClose />
                        </button>

                        <motion.div variants={Animations.opacityVariants} className='relative w-full gap-6 flex items-center justify-center max-[580px]:flex-col'>

                            <motion.input variants={Animations.toTopVariants} className='w-96 h-12 px-2 font-medium outline-none border border-solid border-[var(--gray-color)] text-base text-[var(--dark-color)] rounded-md bg-[var(--white-color)] duration-300 focus:border-[var(--orange-color)] max-[580px]:w-full' placeholder='Search...' type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                            <AnimatePresence>

                                {searchTerm.length > 0 && <motion.div variants={Animations.displayList} initial='hidden' animate='visible' exit={'exit'} className='w-full flex flex-col max-h-40 overflow-auto bg-[var(--white-color)] rounded-md border border-solid border-[var(--gray-color)] shadow-[0_0px_10px_var(--opacity-gray-color)] z-50'>

                                    { filteredProducts && filteredProducts.length > 0 ? filteredProducts.map((item, idx) => <Link onClick={closeSearchPage} to={`/single-pro/${item.id}`} key={idx} className='w-full px-5 py-2.5 border-b border-solid border-[var(--gray-color)] text-center text-base font-medium text-[var(--dark-color)] last:border-b-0 cursor-pointer duration-300 hover:bg-[var(--orange-color)] hover:text-[var(--white-color)]'>{`${item.title.split(' ').slice(0, 3).join(' ')}${item.title.split(' ').length > 3 ? '...' : ''}`}</Link>) : <p className='px-5 py-2.5 border-b border-solid border-[var(--gray-color)] text-center text-base font-medium text-[var(--dark-color)] last:border-b-0'>No results matched</p>}

                                </motion.div>}

                            </AnimatePresence>

                            <motion.button variants={Animations.toTopVariants} className='h-12 px-2.5 flex items-center justify-center font-medium gap-1.5 text-base rounded-md cursor-pointer bg-[var(--orange-color)] text-[var(--white-color)] max-[580px]:w-full' type="button">
                                <IoSearchOutline className='text-2xl' />
                                Search
                            </motion.button>

                        </motion.div>

                    </motion.div>}

            </AnimatePresence>

        </header>

    </React.Fragment>

}
