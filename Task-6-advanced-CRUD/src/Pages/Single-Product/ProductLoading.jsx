import React from 'react';
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animation';

export default function ProductLoading() {

    return <React.Fragment>

        <motion.div 
            variants={Animations.loadingVariants} initial='hidden' animate='visible' 
            className='
                p-5 h-100 rounded-md bg-[var(--gray-color-1)] overflow-hidden flex items-center justify-center
                shadow-[0_0px_10px_var(--gray-color-3)]
            '
        ></motion.div>

        <div className='p-5 col-span-2 flex flex-col gap-10'>

            <motion.div 
                variants={Animations.loadingVariants} initial='hidden' animate='visible'
                className='w-3/4 h-10 rounded-4xl bg-[var(--gray-color-1)]'
            ></motion.div>

            <motion.div 
                variants={Animations.loadingVariants} initial='hidden' animate='visible'
                className='w-1/4 h-10 rounded-md bg-[var(--gray-color-1)]'
            ></motion.div>

            <div className='flex items-center gap-5'>

                <motion.div 
                    variants={Animations.loadingVariants} initial='hidden' animate='visible'
                    className='w-1/4 h-7 rounded-4xl bg-[var(--gray-color-1)]'
                ></motion.div>

                <motion.div 
                    variants={Animations.loadingVariants} initial='hidden' animate='visible'
                    className='w-1/6 h-5 rounded-4xl bg-[var(--gray-color-1)]'
                ></motion.div>

            </div>

            <div className='grid grid-cols-2 gap-5'>

                <motion.div 
                    variants={Animations.loadingVariants} initial='hidden' animate='visible'
                    className='h-12 rounded-md bg-[var(--gray-color-1)]'
                ></motion.div>

                <motion.div 
                    variants={Animations.loadingVariants} initial='hidden' animate='visible'
                    className='h-12 rounded-md bg-[var(--gray-color-1)]'
                ></motion.div>

            </div>

        </div>

    </React.Fragment>

}
