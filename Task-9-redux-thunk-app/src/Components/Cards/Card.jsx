import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';

import { RiShoppingCartLine } from 'react-icons/ri';

export default function Card({ data, onAddToCart }) {

    return <React.Fragment>

        <div className='relative p-2.5 flex flex-col gap-2.5 rounded-md bg-[var(--light-violet-color)] overflow-hidden'>

            <AnimatePresence>
                {data.available === 0 &&
                    (<motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='absolute top-0 right-0 w-full h-full flex items-center 
                        justify-center bg-[var(--violet-opacity-color)] z-20'
                    >

                        <p className='
                            p-5 rounded-md border-2 border-solid border-[var(--white-color)]
                            text-2xl font-medium uppercase text-[var(--white-color)] rotate-12
                        '>Out of the stock</p>

                    </motion.div>)
                }
            </AnimatePresence>

            <div className='absolute top-0 right-0 z-0'>
                <button 
                    onClick={onAddToCart} disabled={data.available === 0}
                    className='w-12 h-12 flex items-center justify-center bg-[var(--light-violet-color)] rounded-md cursor-pointer'
                >
                    <RiShoppingCartLine className='text-2xl text-[var(--violet-color)]' />
                </button>
            </div>

            <img src={data.image} alt={data.name} className='w-full max-h-80 object-cover rounded-md max-[670px]:min-h-max' />

            <h2 className='text-xl font-bold text-[var(--violet-color)]'>{data.name}</h2>

            <p className='text-base text-[var(--lighter-gray-color)]'>{data.description}</p>

            <div className='w-full flex items-center gap-1'>
                <p className='text-base font-bold text-[var(--violet-color)]'>Available :</p>
                <p className='text-base text-[var(--lighter-gray-color)]'>
                    {`${data.available} Item${data.available > 1 ? 's' : ''}`}
                </p>
            </div>

            <p className='text-lg font-bold text-[var(--violet-color)]'>$ {data.price}</p>

        </div>

    </React.Fragment>

}
