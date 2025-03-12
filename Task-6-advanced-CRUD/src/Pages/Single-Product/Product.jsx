import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { Axios, getAllProducts } from '../../API/API'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ProductLoading from './ProductLoading'
import ErrorCard from '../../Components/Error/ErrorCard'

import errorImg from '../../assets/Images/notFound.jpg';
import { AnimatePresence } from 'framer-motion'
import LoadingPage from '../../Components/Pages-Status/LoadingPage'
import ResponsePage from '../../Components/Pages-Status/ResponsePage'

export default function Product() {

    const {id} = useParams();

    const getSinglePro = async() => {
        const {data} = await Axios.get(`${getAllProducts}/${Number(id)}`);
        return data
    }

    const {data, isLoading, isError} = useQuery({queryKey: ['getOneProduct'], queryFn: getSinglePro});

    // ====== delete-product ====== //

    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);

    const handleDeleteProduct = async() => {

        console.log('start delete');

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {
            const res = await Axios.delete(`${getAllProducts}/${Number(data.id)}`);
            if(res.status === 201 || res.status === 200){
                setSuccessMsg('Product deleted successfully');
            }
            setTimeout(() => {
                navigate('/')
            }, 2000);
        } catch (error) {
            setErrMsg(error.response.message || "Can't delete this product");
        } finally {
            setAddLoading(false);
        }

    }

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

        <section className='
            common_cont single_height grid grid-cols-3 items-center gap-5 max-[1220px]:grid-cols-2
            max-[975px]:grid-cols-1
        '>

            {!isError && !isLoading && data &&

                <React.Fragment>

                    <div className='
                        p-5 rounded-md bg-[var(--white-color)] overflow-hidden flex items-center justify-center
                        shadow-[0_0px_10px_var(--gray-color-3)]
                    '>
                        {data.img ? 
                            <img className='max-w-full object-cover' src={data.img} alt={data.name} /> :
                            <img className='w-full object-cover rounded-md' src={errorImg} alt={data.name} />
                        }
                    </div>

                    <div className='
                        p-5 col-span-2 flex flex-col gap-10 max-[1220px]:col-span-1 
                        max-[590px]:gap-5 max-[590px]:px-0
                    '>

                        <h3 className='text-5xl font-bold text-[var(--black-color)] max-[590px]:text-2xl'>{data.name}</h3>

                        <p className='
                            w-fit py-2.5 px-5 rounded-md bg-[var(--gray-color-3)] text-xl font-medium text-[var(--blue-color)]
                            max-[590px]:text-base max-[590px]:py-1 max-[590px]:px-2
                        '>
                            {data.category}
                        </p>

                        <div className='flex items-center gap-5 max-[590px]:gap-2.5'>

                            <p className='text-xl font-semibold text-[var(--black-color)] max-[590px]:text-base'>
                                {(data.price - (data.price * (data.discount || 0) / 100)).toFixed(2)} USD
                            </p>
                            <p className='text-base font-semibold text-[var(--gray-color-2)] line-through max-[590px]:text-sm'>
                                {data.price.toFixed(2)} USD
                            </p>

                        </div>

                        <div className='grid grid-cols-2 gap-5 max-[590px]:grid-cols-1'>

                            <Link to={`/update/${data.id}`} className='
                                rounded-md py-2.5 px-5 flex items-center justify-center gap-2.5 bg-[var(--blue-color)]
                                text-[var(--salt-color)] text-base font-semibold cursor-pointer duration-300
                                hover:scale-95
                            '>
                                <FiEdit2 />
                                <p>Edit Product</p>
                            </Link>

                            <button onClick={handleDeleteProduct} className='
                                rounded-md py-2.5 px-5 flex items-center justify-center gap-2.5 bg-[var(--gray-color-3)]
                                text-[var(--blue-color)] text-base font-semibold cursor-pointer duration-300
                                hover:scale-95
                            '>
                                <MdOutlineDeleteOutline />
                                <p>Delete Product</p>
                            </button>

                        </div>

                    </div>

                </React.Fragment>

            }

            {isLoading && <ProductLoading />}

            {!isLoading && isError && <ErrorCard />}

        </section>

    </React.Fragment>

}
