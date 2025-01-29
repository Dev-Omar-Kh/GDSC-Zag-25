import React, { useState } from 'react';
import { CiCalculator2 } from 'react-icons/ci';
import { motion } from 'framer-motion';
import mainCSS from './main.module.css';
import { useFormik } from 'formik';
import { IoReload } from 'react-icons/io5';

export default function Main() {

    // ====== formik ====== //

    const [buttonStatus, setButtonStatus] = useState('submit');
    // const [age, setAge] = useState({ years: '--', months: '--', days: '--' });
    const [age, setAge] = useState([
        {id: 1, title: 'years', count: '--'},
        {id: 2, title: 'months', count: '--'},
        {id: 3, title: 'days', count: '--'},
    ]);

    const values = { day: '', month: '', year: '' };

    const countAge = (values) => {

        const birthDate = new Date(values.year, values.month - 1, values.day);
        const currentDate = new Date();

        if (birthDate > currentDate) return;

        const diffTime = Math.abs(currentDate - birthDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.floor(diffDays / 365.25);
        const diffMonths = Math.floor((diffDays % 365.25) / 30);
        const remainingDays = Math.floor((diffDays % 365.25) % 30);

        setAge([
            { id: 1, title: 'years', count: diffYears },
            { id: 2, title: 'months', count: diffMonths },
            { id: 3, title: 'days', count: remainingDays },
        ]);
        setButtonStatus('reset');

    }

    const formikObj = useFormik({

        initialValues: values,

        validate: (values) => {

            const errors = {};
            const currentYear = new Date().getFullYear();
            const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            if (values.year % 4 === 0 && (values.year % 100 !== 0 || values.year % 400 === 0)) {
                monthDays[1] = 29;
            }

            if (!values.day) {
                errors.day = "empty input";
            } else if (!/^\d+$/.test(values.day)) {
                errors.day = "numbers only";
            } else if (values.day < 1 || values.day > 31) {
                errors.day = "invalid day";
            }

            if (!values.month) {
                errors.month = "empty input";
            } else if (!/^\d+$/.test(values.month)) {
                errors.month = "numbers only";
            } else if (values.month < 1 || values.month > 12) {
                errors.month = "invalid month";
            }

            if (!values.year) {
                errors.year = "empty input";
            } else if (!/^\d+$/.test(values.year)) {
                errors.year = "numbers only";
            } else if (values.year > currentYear) {
                errors.year = "invalid year";
            }

            if (values.day && values.month && values.year) {

                const birthDate = new Date(values.year, values.month - 1, values.day);

                if (values.day > monthDays[values.month - 1]) {
                    errors.day = "invalid date";
                }

                if (
                    birthDate.getDate() !== Number(values.day) ||
                    birthDate.getMonth() + 1 !== Number(values.month) ||
                    birthDate.getFullYear() !== Number(values.year)
                ) {
                    errors.day = "invalid date";
                }

            }

            return errors;
        },

        onSubmit: countAge

    });

    const handleReset = () => {

        formikObj.resetForm();
        formikObj.setTouched({}, false);
        setAge([
            { id: 1, title: 'years', count: '--' },
            { id: 2, title: 'months', count: '--' },
            { id: 3, title: 'days', count: '--' },
        ]);
        setButtonStatus('submit');

    };

    const onClickEnter = (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            formikObj.handleSubmit();
        }

    }

    // ====== animation ====== //

    const boxVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
    }

    return <React.Fragment>

        <div className={mainCSS.container}>

            <motion.div variants={boxVariants} initial="hidden" animate="visible" className={mainCSS.box_cont}>

                <form onSubmit={formikObj.handleSubmit} onKeyDown={onClickEnter}>

                    <div className={`${mainCSS.input_cont} ${mainCSS.half_input_cont}`}>

                        <label htmlFor="">DAY</label>

                        <input
                            id='day'
                            type="text" placeholder='DD'
                            onBlur={formikObj.handleBlur}
                            onChange={formikObj.handleChange} value={formikObj.values.day}
                        />

                        <p className={mainCSS.err_msg}>
                            {formikObj.errors.day && formikObj.touched.day ? <>* {formikObj.errors.day}</> : ''}
                        </p>

                    </div>

                    <div className={`${mainCSS.input_cont} ${mainCSS.half_input_cont}`}>

                        <label htmlFor="">MONTH</label>

                        <input
                            id='month'
                            type="text" placeholder='MM'
                            onBlur={formikObj.handleBlur}
                            onChange={formikObj.handleChange} value={formikObj.values.month}
                        />

                        <p className={mainCSS.err_msg}>
                            {formikObj.errors.month && formikObj.touched.month ? <>* {formikObj.errors.month}</> : ''}
                        </p>

                    </div>

                    <div className={mainCSS.input_cont}>

                        <label htmlFor="">YEAR</label>

                        <input
                            id='year'
                            type="text" placeholder='YYYY'
                            onBlur={formikObj.handleBlur}
                            onChange={formikObj.handleChange} value={formikObj.values.year}
                        />

                        <p className={mainCSS.err_msg}>
                            {formikObj.errors.year && formikObj.touched.year ? <>* {formikObj.errors.year}</> : ''}
                        </p>

                    </div>

                    <button 
                        type='button'
                        className={mainCSS.submit}
                        onClick={buttonStatus === 'reset' ? handleReset : formikObj.handleSubmit} 
                    >
                        {buttonStatus === 'submit' ? <CiCalculator2 /> : <IoReload />}
                    </button>

                </form>

                <div className={mainCSS.result_cont}>

                    {age.map(count => <div key={count.id} className={mainCSS.result}>
                        <p className={mainCSS.result_num}>{count.count}</p>
                        <p className={mainCSS.result_content}>{count.title}</p>
                    </div>)}

                </div>

            </motion.div>

        </div>

    </React.Fragment>

}