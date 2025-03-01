import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import { TiStar } from 'react-icons/ti';

export default function ProLoading() {

    return <React.Fragment>

        <motion.div variants={Animations.loadingVariants} initial='hidden' animate='visible' className='h-96 rounded-md shadow-[0_0px_10px_var(--opacity-gray-color)] overflow-hidden bg-[var(--gray-color)]'></motion.div>

        <motion.div variants={Animations.opacityVariantsNoStagger} initial='hidden' animate='visible' className='col-span-2 pl-6 flex flex-col gap-6 max-[1024px]:col-span-1 max-[945px]:pl-0'>

            <div className='flex flex-col gap-2.5'>

                <motion.div variants={Animations.loadingVariants} className='w-28 h-6 rounded-4xl bg-[var(--gray-color)]'></motion.div>

                <motion.div variants={Animations.loadingVariants} className='w-full h-6 rounded-4xl bg-[var(--gray-color)]'></motion.div>

            </div>

            <motion.div variants={Animations.loadingVariants} className='w-full h-4 rounded-4xl bg-[var(--gray-color)]'></motion.div>

            <div className='flex justify-between'>

                <motion.div variants={Animations.loadingVariants} className='w-10 h-5 rounded-4xl bg-[var(--gray-color)]'></motion.div>

                <div className='flex items-center gap-1'>
                    <TiStar className='text-2xl text-[var(--orange-color)]' />
                    <motion.div variants={Animations.loadingVariants} className='w-10 h-5 rounded-4xl bg-[var(--gray-color)]'></motion.div>
                </div>

            </div>

            <div className='grid grid-cols-2 items-center gap-4 max-[375px]:grid-cols-1'>

                <button className='h-10 rounded-md px-5 py-2.5 text-base font-medium flex items-center justify-center gap-2.5 bg-[var(--orange-color)] text-[var(--white-color)] cursor-pointer'></button>

                <button className='h-10 rounded-md px-5 py-2.5 text-base font-medium flex items-center justify-center gap-2.5 border border-solid border-[var(--orange-color)] text-[var(--orange-color)] cursor-pointer'></button>

            </div>

        </motion.div>

    </React.Fragment>

}
