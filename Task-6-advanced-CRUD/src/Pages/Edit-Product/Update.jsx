import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from "yup";
import { Axios, getAllProducts } from './../../API/API';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../../Components/Pages-Status/LoadingPage';
import ResponsePage from '../../Components/Pages-Status/ResponsePage';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { FiEdit } from 'react-icons/fi';

export default function Update() {

    // ====== get-product ====== //

    const {id} = useParams();

    const getSinglePro = async() => {
        const {data} = await Axios.get(`${getAllProducts}/${Number(id)}`);
        return data
    }

    const {data, isLoading, isError} = useQuery({queryKey: ['getOneProductToUpdate'], queryFn: getSinglePro});

    // ====== send-data-to-server ====== //

    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);

    const values = {
        id: data?.id,
        name: data?.name,
        category: data?.category,
        price: data?.price || 0,
        discount: data?.discount || 0,
    }

    const sendData = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {
            const res = await Axios.patch(`${getAllProducts}/${Number(id)}`, values);
            if(res.status === 200 || res.status === 201){
                setSuccessMsg('Product added successfully');
            }
            setTimeout(() => {
                setSuccessMsg(null);
                setTimeout(() => {
                    navigate('/');
                }, 300);
            }, 2000);
        } catch (error) {
            setErrMsg(error.response.message || 'Error adding product');
            setTimeout(() => {
                setErrMsg(null);
            }, 2000);
        } finally {
            setAddLoading(false);
        }

    }

    const formikObj = useFormik({

        initialValues: values,

        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required"),
            category: Yup.string().required("Category is required"),
            price: Yup.number().typeError("Price must be a number").required("Price is required"),
            discount: Yup.number().typeError('Discount must be a number').nullable()
        }),

        enableReinitialize: true,

        onSubmit: sendData

    });

    return <React.Fragment>

        <AnimatePresence>
            {addLoading && <LoadingPage />}
        </AnimatePresence>

        <AnimatePresence>
            {successMsg && <ResponsePage type={true} msg={successMsg} />}
        </AnimatePresence>

        <AnimatePresence>
            {errMsg && <ResponsePage type={false} msg={errMsg} />}
        </AnimatePresence>

        <section className='common_cont single_height flex items-center justify-center'>

            <form 
                onSubmit={formikObj.handleSubmit}
                className='
                    w-2xl p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                    flex flex-col items-center gap-5 max-[760px]:w-full
                '
            >

                <div className='flex items-center gap-5 text-[var(--blue-color)]'>
                    <FiEdit className='text-3xl' />
                    <p className='text-2xl font-medium'>Update Product</p>
                </div>

                <div className='w-full grid grid-cols-2 gap-2.5 max-[760px]:grid-cols-1'>

                    <div className='w-full col-span-2 flex flex-col gap-1'>

                        <label className='
                            text-base font-medium text-[var(--black-color)]
                            flex items-center justify-between gap-2'  
                            htmlFor="name"
                        >
                            Name
                            {formikObj.touched.name && formikObj.errors.name && 
                                <p className='text-xs text-[var(--red-color)]'>* {formikObj.errors.name}</p>
                            }
                        </label>

                        <input 
                            id='name' type="text" placeholder='Enter the product name'
                            className='
                                w-full h-10 px-2.5 rounded-md outline-0 border border-solid border-[var(--gray-color)]
                                text-base text-[var(--black-color)] duration-300 focus:border-[var(--blue-color)]
                            ' 
                            value={isLoading ? 'loading...' : isError ? 'Error loading data' : formikObj.values.name ?? ''}
                            onChange={formikObj.handleChange}
                            onBlur={formikObj.handleBlur}
                        />

                    </div>

                    <div className='w-full col-span-2 flex flex-col gap-1'>

                        <label className='
                            text-base font-medium text-[var(--black-color)]
                            flex items-center justify-between gap-2'  
                            htmlFor="category"
                        >
                            Category
                            {formikObj.touched.category && formikObj.errors.category && 
                                <p className='text-xs text-[var(--red-color)]'>* {formikObj.errors.category}</p>
                            }
                        </label>

                        <input 
                            id='category' type="text" placeholder='Enter the product category'
                            className='
                                w-full h-10 px-2.5 rounded-md outline-0 border border-solid border-[var(--gray-color)]
                                text-base text-[var(--black-color)] duration-300 focus:border-[var(--blue-color)]
                            ' 
                            value={isLoading ? 'loading...' : isError ? 'Error loading data' : formikObj.values.category ?? ''}
                            onChange={formikObj.handleChange}
                            onBlur={formikObj.handleBlur}
                        />

                    </div>

                    <div className='w-full col-span-1 flex flex-col gap-1 max-[760px]:col-span-2'>

                        <label className='
                            text-base font-medium text-[var(--black-color)]
                            flex items-center justify-between gap-2'  
                            htmlFor="price"
                        >
                            Price
                            {formikObj.touched.price && formikObj.errors.price && 
                                <p className='text-xs text-[var(--red-color)]'>* {formikObj.errors.price}</p>
                            }
                        </label>

                        <input 
                            id='price' type="number" placeholder='Enter the product price'
                            className='
                                w-full h-10 px-2.5 rounded-md outline-0 border border-solid border-[var(--gray-color)]
                                text-base text-[var(--black-color)] duration-300 focus:border-[var(--blue-color)]
                            ' 
                            value={formikObj.values.price}
                            onChange={(e) => formikObj.setFieldValue("price", parseFloat(e.target.value) || 0)}
                            onBlur={formikObj.handleBlur}
                        />

                    </div>

                    <div className='w-full col-span-1 flex flex-col gap-1 max-[760px]:col-span-2'>

                        <label className='
                            text-base font-medium text-[var(--black-color)]
                            flex items-center justify-between gap-2'  
                            htmlFor="discount"
                        >
                            <div className='flex items-center gap-2'>
                                <p>Discount</p>
                                <p className='text-xs text-[var(--gray-color)]'>(Optional)</p>
                            </div>

                            {formikObj.touched.discount && formikObj.errors.discount && 
                                <p className='text-xs text-[var(--red-color)]'>* {formikObj.errors.discount}</p>
                            }
                        </label>

                        <input 
                            id='discount' type="number" placeholder='Enter the product discount'
                            className='
                                w-full h-10 px-2.5 rounded-md outline-0 border border-solid border-[var(--gray-color)]
                                text-base text-[var(--black-color)] duration-300 focus:border-[var(--blue-color)]
                            ' 
                            value={formikObj.values.discount}
                            onChange={(e) => formikObj.setFieldValue("discount", parseFloat(e.target.value) || 0)}
                            onBlur={formikObj.handleBlur}
                        />

                    </div>

                    <button 
                        type='submit'
                        className='
                            py-2.5 px-5 col-span-2 rounded-md bg-[var(--blue-color)] font-medium text-[var(--salt-color)]
                            cursor-pointer
                        '
                    >
                        Update
                    </button>

                </div>

            </form>

        </section>

    </React.Fragment>

}
