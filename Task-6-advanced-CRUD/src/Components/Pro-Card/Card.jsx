import React, { useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

import ErrorImg from '../../assets/Images/notFound.jpg'
import { Axios, getAllProducts } from '../../API/API';
import { AnimatePresence } from 'framer-motion';
import LoadingPage from '../Pages-Status/LoadingPage';
import ResponsePage from '../Pages-Status/ResponsePage';

export default function Card({data, refetch}) {

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
                refetch();
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

        <div className='relative rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden'>

            <div className='absolute right-5 top-5 flex items-center gap-2.5'>
                <Link to={`/update/${data.id}`} className='
                    w-10 h-10 flex items-center justify-center rounded-full bg-[var(--salt-color)]
                    shadow-[0_0px_10px_var(--gray-color-3)] border border-solid border-[var(--gray-color-1)] duration-300
                    text-xl text-[var(--blue-color)] cursor-pointer hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)]
                '>
                    <FiEdit2 />
                </Link>
                <button onClick={handleDeleteProduct} className='
                    w-10 h-10 flex items-center justify-center rounded-full bg-[var(--salt-color)]
                    shadow-[0_0px_10px_var(--gray-color-3)] border border-solid border-[var(--gray-color-1)] duration-300
                    text-xl text-[var(--blue-color)] cursor-pointer hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)]
                '>
                    <MdOutlineDeleteOutline />
                </button>
            </div>

            <Link to={`/${data.id}`}>

                <div className='w-full h-80 flex items-center justify-center'>
                    {data.img ? 
                        <img className='max-h-full max-w-full object-cover p-5' src={data.img} alt={data.name} /> :
                        <img className='w-full h-full object-cover' src={ErrorImg} alt={data.name} />
                    }
                </div>

                <div className='p-5 flex flex-col gap-2.5'>

                    <h3 className='text-2xl font-semibold text-[var(--black-color)]'>{data.name}</h3>

                    <div className='w-fit py-1 px-2.5 rounded-md bg-[var(--gray-color-3)] text-sm text-[var(--blue-color)]'>
                        <p>{data.category}</p>
                    </div>

                    <div className='flex items-center gap-2.5'>

                        <p className='text-base font-medium text-[var(--black-color)]'>
                            {(data.price - (data.price * (data.discount || 0) / 100)).toFixed(2)} USD
                        </p>
                        <p className='text-sm font-medium text-[var(--gray-color-2)] line-through'>
                            {data.price.toFixed(2)} USD
                        </p>

                    </div>

                </div>

            </Link>

        </div>

    </React.Fragment>

}

Card.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discount: PropTypes.number,
        status: PropTypes.string
    }).isRequired,
    refetch: PropTypes.func.isRequired
};