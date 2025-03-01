import React from 'react'
import { TiStar } from 'react-icons/ti'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function LoadingCard() {

    return <React.Fragment>

        <motion.div variants={Animations.opacityVariantsNoStagger} initial='hidden' animate='visible' className='rounded-lg flex flex-col gap-5 shadow-[0_0px_10px_var(--opacity-gray-color)] overflow-hidden'>

            <motion.div variants={Animations.loadingVariants} className='w-full h-80 bg-[var(--gray-color)]'></motion.div>

            <div className='px-5 pb-5 flex flex-col gap-5'>

                <motion.div variants={Animations.loadingVariants} className='w-full h-5 rounded-4xl bg-[var(--gray-color)]'></motion.div>

                <motion.div variants={Animations.loadingVariants} className='w-1/2 h-8 rounded-4xl bg-[var(--gray-color)]'></motion.div>

                <div className='flex justify-between'>

                    <motion.div variants={Animations.loadingVariants} className='w-10 h-5 rounded-4xl bg-[var(--gray-color)]'></motion.div>

                    <div className='flex items-center gap-1'>
                        <TiStar className='text-2xl text-[var(--orange-color)]' />
                        <motion.div variants={Animations.loadingVariants} className='w-10 h-5 rounded-4xl bg-[var(--gray-color)]'></motion.div>
                    </div>

                </div>

            </div>

        </motion.div>

    </React.Fragment>

}
