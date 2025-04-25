import React from 'react';
import { IoClose } from 'react-icons/io5';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Cart({setDisplayCartPage}) {

    const products = useSelector(state => state.cartItems);

    return <React.Fragment>

        <motion.section 
            initial={{ opacity: 0}} animate={{ opacity: 1}}
            exit={{ opacity: 0}} transition={{ duration: 0.5 }}
            className='fixed flex justify-end w-full h-screen z-50 bg-[var(--violet-opacity-color)]'
        >

            <motion.div 
                initial={{ x: 1000 }} animate={{ x: 0 }}
                exit={{ x: 1000 }} transition={{ duration: 0.5 }}
                className='w-lg h-full flex flex-col gap-5 bg-[var(--white-color)] cart-padding'
            >

                <div className='
                    w-full flex items-center justify-between gap-2.5 text-[var(--violet-color)] 
                    px-2.5 pb-5 border-b border-solid border-[var(--light-violet-color)] max-[600px]:px-0
                '>

                    <div className='flex items-center gap-2.5'>
                        <RiShoppingCartLine className='text-4xl' />
                        <h3 className='text-3xl font-bold text-[var(--violet-color)]'>Your Cart</h3>
                    </div>

                    <button 
                        onClick={() => setDisplayCartPage(false)}
                        className='
                            w-10 h-10 flex items-center justify-center rounded-full bg-[var(--light-violet-color)] cursor-pointer
                        '
                    >
                        <IoClose className='text-3xl text-[var(--violet-color)]' />
                    </button>

                </div>

                {products.length > 0 ? <div className='w-full h-full flex flex-col gap-2.5 overflow-y-auto max-[670px]:gap-2.5'>

                    {products.map(item => <div key={item.id} className='
                        w-full p-2.5 rounded-md border border-solid border-[var(--light-violet-color)] flex items-center gap-2.5
                    '>

                        <img className='w-20 h-20 object-cover rounded-md' src={item.image} alt={item.name} />

                        <div className='cart-card-w flex flex-col gap-2.5'>

                            <h2 className='text-xl font-bold text-[var(--violet-color)]'>{item.name}</h2>

                            <div className='w-full flex items-center justify-between'>
                                <p className='text-lg font-medium text-[var(--lighter-gray-color)]'>{item.quantity}</p>
                                <p className='text-lg font-bold text-[var(--violet-color)]'>
                                    $ {(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>

                        </div>

                    </div>)}

                </div> : <p className='w-full text-center text-base text-[var(--lighter-gray-color)]'>Cart is empty</p>}

            </motion.div>

        </motion.section>

    </React.Fragment>

}
