import React, { useEffect, useState } from 'react';
import { IoBasketOutline, IoCartOutline } from 'react-icons/io5';
import { TiStar } from 'react-icons/ti';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProLoading from './ProLoading';
import { Link, useParams } from 'react-router-dom';
import { Axios, getAllProducts } from '../../assets/APIs/API';
import { IoIosArrowBack } from 'react-icons/io';

export default function Product() {

    const {id} = useParams();

    const [proData, setProData] = useState(null);
    const [proLoading, setProLoading] = useState(false);
    const [proError, setProError] = useState(null);

    useEffect(() => {

        const getSingleProduct = async() =>{

            setProLoading(true);

            try {
                const {data} = await Axios.get(`${getAllProducts}/${id}`);
                setProData(data?.data || []);
            } catch (error) {
                setProError(error.response.data.errors.msg || 'Failed to fetch products');
            } finally {
                setProLoading(false);
            }

        }

        getSingleProduct();

    }, [id]);

    return <React.Fragment>

        <section className='w-full min-h-screen px-10 py-5 pt-28 grid grid-cols-3 items-center max-[1024px]:grid-cols-2 max-[945px]:grid-cols-1 max-[945px]:gap-10 max-[500px]:px-5'>

            <div className='col-span-3 max-[1024px]:col-span-2 max-[945px]:col-span-1'>
                <Link to={'/'} className='w-fit flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-[var(--orange-color)] text-base font-medium text-[var(--white-color)] cursor-pointer'>
                    <IoIosArrowBack className='text-2xl' />
                    Go Back
                </Link>
            </div>

            {proLoading && <ProLoading />}

            {proError && !proLoading && <p className="text-red-500 font-semibold col-span-3 m-auto">{proError}</p>}

            {!proLoading && proData && <React.Fragment>

                <div className='h-96 rounded-md shadow-[0_0px_10px_var(--opacity-gray-color)] overflow-hidden cursor-pointer'>
                    <Swiper slidesPerView={1} spaceBetween={10} pagination={{ clickable: true }} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} modules={[Autoplay, Pagination]}>
                        {proData.images.map((img, idx) => <SwiperSlide key={idx}><img className='h-96 max-w-full m-auto object-cover max-[945px]:h-fit' src={img} alt={img} /></SwiperSlide>)}
                    </Swiper>
                </div>

                <div className='col-span-2 pl-6 flex flex-col gap-6 max-[1024px]:col-span-1 max-[945px]:pl-0'>

                    <div className='flex flex-col gap-2.5'>

                        <span className='w-fit px-2.5 py-1.5 rounded-4xl bg-[var(--orange-color)] text-xs text-[var(--white-color)]'>{proData.category.name}</span>

                        <h3 className='text-4xl font-bold text-[var(--orange-color)]'>{proData.title}</h3>

                    </div>

                    <p className='text-base font-medium text-[var(--dark-color)]'>{proData.description}</p>

                    <div className='flex justify-between'>

                        <p className='text-xl font-medium text-[var(--dark-color)]'>{proData.price} EGP</p>
                        
                        <div className='flex items-center gap-1'>
                            <TiStar className='text-2xl text-[var(--orange-color)]' />
                            <p className='text-base font-medium text-[var(--dark-color)]'>{proData.ratingsAverage}</p>
                        </div>

                    </div>

                    <div className='grid grid-cols-2 items-center gap-4 max-[375px]:grid-cols-1'>

                        <button className='rounded-md px-5 py-2.5 text-base font-medium flex items-center justify-center gap-2.5 bg-[var(--orange-color)] text-[var(--white-color)] cursor-pointer'>
                            <IoCartOutline className='text-2xl' />
                            Add to cart
                        </button>

                        <button className='rounded-md px-5 py-2.5 text-base font-medium flex items-center justify-center gap-2.5 border border-solid border-[var(--orange-color)] text-[var(--orange-color)] cursor-pointer'>
                            <IoBasketOutline className='text-2xl' />
                            Buy now
                        </button>

                    </div>

                </div>

            </React.Fragment>}

        </section>

    </React.Fragment>

}
