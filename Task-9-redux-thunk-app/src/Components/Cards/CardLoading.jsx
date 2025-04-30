import React from 'react';
import { motion } from 'framer-motion';

export default function CardLoading() {

    return <React.Fragment>

        <div className='relative p-2.5 flex flex-col gap-2.5 rounded-md bg-[var(--light-violet-color)] overflow-hidden'>

            <div className='absolute top-0 right-0 z-10'>
                <button 
                    className='w-12 h-12 flex items-center justify-center bg-[var(--light-violet-color)] rounded-md cursor-pointer'
                >
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0.25 }}
                animate={{opacity: 0.5, transition : {type : 'wheel' , duration : 1 , repeat : Infinity , repeatType : 'mirror'}}} 
                className='w-full h-80 object-cover rounded-md max-[670px]:min-h-max bg-[var(--white-color)] opacity-50'
            ></motion.div>

            <motion.div
                initial={{ opacity: 0.25 }}
                animate={{opacity: 0.5, transition : {type : 'wheel' , duration : 1 , repeat : Infinity , repeatType : 'mirror'}}}  
                className='w-2/3 h-10 bg-[var(--white-color)] opacity-50 rounded-4xl'
            ></motion.div>

            {Array.from({ length: 3 }, (_, index) => (
                <motion.div
                    initial={{ opacity: 0.25 }}
                    animate={{opacity: 0.5, transition : {type : 'wheel' , duration : 1 , repeat : Infinity , repeatType : 'mirror'}}}  
                    key={index} className='w-full h-2.5 bg-[var(--white-color)] opacity-50 rounded-4xl'
                ></motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0.25 }}
                animate={{opacity: 0.5, transition : {type : 'wheel' , duration : 1 , repeat : Infinity , repeatType : 'mirror'}}} 
                className='w-2/3 h-5 bg-[var(--white-color)] opacity-50 rounded-4xl'
            ></motion.div>

            <motion.div
                initial={{ opacity: 0.25 }}
                animate={{opacity: 0.5, transition : {type : 'wheel' , duration : 1 , repeat : Infinity , repeatType : 'mirror'}}} 
                className='w-1/2 h-5 bg-[var(--white-color)] opacity-50 rounded-4xl'
            ></motion.div>

        </div>

    </React.Fragment>

}
