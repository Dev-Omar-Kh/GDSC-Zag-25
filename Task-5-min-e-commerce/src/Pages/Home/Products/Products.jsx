import React, { useEffect, useState } from 'react';
import { HiOutlineSquaresPlus } from 'react-icons/hi2';
import Filter from '../../../Components/Filter-Button/Filter';
import Card from '../../../Components/Pro-Card/Card';
import LoadingCard from '../../../Components/Pro-Card/LoadingCard';
import { Axios, getAllProducts } from '../../../assets/APIs/API';
import { IoIosArrowDown } from 'react-icons/io';

export default function Products() {

    const [proData, setProData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);
    const [errorDataFetch, setErrorDataFetch] = useState(false);
    const [visibleProjects, setVisibleProjects] = useState(8);
    const [filteredData, setFilteredData] = useState('All Products')

    const handleLoadMore = () => {
        setVisibleProjects(prev => prev + 4);
    };

    const getProducts = async() =>{

        setLoadingData(true);

        try {
            const {data} = await Axios.get(getAllProducts);
            setProData(data?.data || []);
        } catch (error) {
            setErrorDataFetch(error.response.data.message || 'Failed to fetch products');
        } finally {
            setLoadingData(false);
        }

    }

    useEffect(() => {

        getProducts();

    }, []);

    const displayedProducts = proData
        ? proData.filter(pros => filteredData === 'All Products' || pros.category.name === filteredData)
        : [];

    return <React.Fragment>

        <section id='products' className='w-full px-10 py-5 flex flex-col gap-10 max-[500px]:px-5'>

            <div className='w-full h-fit flex items-center justify-between gap-5 max-[693px]:flex-col'>

                <h3 className='w-fit px-5 pl-0 py-2.5 flex items-center gap-2.5 text-3xl font-semibold text-[var(--dark-color)] border-b-4 border-solid border-[var(--orange-color)] max-[450px]:text-2xl'>
                    <HiOutlineSquaresPlus className='text-4xl text-[var(--orange-color)] max-[450px]:text-3xl' />
                    Trending Products
                </h3>

                <Filter data={proData} setFilterKey={setFilteredData} />

            </div>

            <div className='w-full grid grid-cols-4 gap-5 max-[1200px]:grid-cols-3 max-[860px]:grid-cols-2 max-[620px]:grid-cols-1'>

                {loadingData && <React.Fragment>
                    <LoadingCard /> 
                    <LoadingCard />
                </React.Fragment>}

                {errorDataFetch && !loadingData && (
                    <p className="text-red-500 font-semibold col-span-4 m-auto">{errorDataFetch}</p>
                )}

                {!loadingData && displayedProducts.slice(0, visibleProjects).map((card) => (
                    <Card key={card.id} data={card} />
                ))}

            </div>

            <div className='w-full flex justify-end'>
                <button disabled={displayedProducts.length <= visibleProjects} onClick={handleLoadMore} className={`px-5 py-2.5 flex items-center justify-center gap-1 rounded-md bg-[var(--orange-color)] text-base text-[var(--white-color)] cursor-pointer max-[620px]:w-full ${displayedProducts.length <= visibleProjects ? 'opacity-50' : ''}`}>See More <IoIosArrowDown className='text-2xl' /></button>
            </div>

        </section>

    </React.Fragment>

}
