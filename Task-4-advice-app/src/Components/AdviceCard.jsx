import React, { useEffect, useState } from 'react';

import cardCSS from './advice_card.module.css';
import { FaDiceFive } from 'react-icons/fa';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

export default function AdviceCard() {

    // ====== call-api ====== //

    const [randomAdvice, setRandomAdvice] = useState(null);
    const [loading, setLoading] = useState(true);

    const getAdvice = async() => {

        setLoading(true);

        const {data} = await axios.get("https://api.adviceslip.com/advice");

        setRandomAdvice(data.slip);

        setLoading(false);

    }

    useEffect(() => {

        getAdvice();

    }, []);

    // ====== animation ====== //

    const variant = {

        hidden: {opacity: 0, scale: 0},
        visible: {opacity: 1, scale: 1, transition: {duration: 0.3}},
        exit: {opacity: 0, scale: 0, transition: {duration: 0.3}},

    }

    return <React.Fragment>

        <AnimatePresence>

            {!loading && <motion.div variants={variant} initial='hidden' animate='visible' exit={'exit'} className={cardCSS.container}>

                <h3>Advice #{randomAdvice.id}</h3>

                <p>{`" ${randomAdvice.advice} "`}</p>

                <div className={cardCSS.style_cont}>
                    <span className={cardCSS.span_1}></span>
                    <span className={cardCSS.span_2}></span>
                </div>

                <button onClick={getAdvice}><FaDiceFive /></button>

            </motion.div>}

        </AnimatePresence>

    </React.Fragment>

}
