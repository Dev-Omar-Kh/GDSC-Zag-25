import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animation';

export default function LoadingCard() {

    return <React.Fragment>

        <motion.div 
            variants={Animations.opacityVariantsNoStagger} initial='hidden' animate='visible' exit={'exit'}
            className='rounded-md shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden'
        >

            <motion.div variants={Animations.loadingVariants} className='h-80 w-full bg-[var(--gray-color-1)]'></motion.div>

            <div className='p-5 flex flex-col gap-2.5'>

                <motion.div variants={Animations.loadingVariants} className='w-4/5 h-7 rounded-4xl bg-[var(--gray-color-1)]'>
                </motion.div>

                <motion.div variants={Animations.loadingVariants} className='w-1/3 h-7 rounded-md bg-[var(--gray-color-1)]'>
                </motion.div>

                <div className='flex items-center gap-2.5'>

                    <motion.div variants={Animations.loadingVariants} className='w-2/5 h-5 rounded-4xl bg-[var(--gray-color-1)]'>
                    </motion.div>
                    <motion.div variants={Animations.loadingVariants} className='w-1/4 h-4 rounded-4xl bg-[var(--gray-color-1)]'>
                    </motion.div>

                </div>

            </div>

        </motion.div>

    </React.Fragment>

}
