import React, { useEffect, useMemo, useState } from 'react'
import Filter from '../../Components/Filter-Button/Filter'
import Card from '../../Components/Pro-Card/Card';
import { Axios, getAllProducts } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import LoadingCard from '../../Components/Pro-Card/LoadingCard';
import ErrorCard from '../../Components/Error/ErrorCard';
import { IoIosArrowDown } from 'react-icons/io';

export default function Home() {

    // ====== get-all-products ====== //

    const [visibleProduct, setVisibleProduct] = useState(8);

    const handleSeeMoreBtn = () => {

        setVisibleProduct(prev => prev + 4);

    }

    const getProducts = async() => {
        const {data} = await Axios.get(getAllProducts);
        return data
    }

    const {data, isLoading, isError, refetch} = useQuery({queryKey: ['getProductsData'], queryFn: getProducts});

    // ====== filter-products ====== //

    const cateList = useMemo(() => {
        return ['All Products', ...new Set((data || []).map(cate => cate.category))];
    }, [data]);

    const [filteredData, setFilteredData] = useState(data);
    const [filterKey, setFilterKey] = useState(cateList[0]);

    useEffect(() => {

        if(filterKey !== cateList[0]){
            setFilteredData(data.filter(pros => pros.category === filterKey));
        }
        else{
            setFilteredData(data);
        }

    }, [cateList, data, filterKey])

    return <React.Fragment>

        <section className='common_cont flex flex-col gap-5'>

            <div className='w-full flex justify-end'>
                <Filter data={cateList} setFilterKey={setFilterKey} />
            </div>

            <div className='w-full grid grid-cols-4 gap-5 max-[1240px]:grid-cols-3 max-[920px]:grid-cols-2 max-[650px]:grid-cols-1'>

                {isLoading && <LoadingCard />}

                {isError && !isLoading && <ErrorCard />}

                {!isLoading && !isError && data && filteredData && filteredData.length > 0 && 
                    filteredData.slice(0, visibleProduct).map(pro => <Card refetch={refetch} key={pro.id} data={pro} />)
                }

            </div>

            <div className='w-full flex justify-end'>
                <button onClick={handleSeeMoreBtn} disabled={filteredData?.length <= visibleProduct} className={`
                    w-fit py-2.5 px-5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                    text-base text-[var(--salt-color)] duration-300 
                    ${filteredData?.length <= visibleProduct ? 'opacity-65 hover:scale-100' : 'hover:scale-110 cursor-pointer'}
                `}>
                    <p>See More</p>
                    <IoIosArrowDown className='text-2xl' />
                </button>
            </div>

        </section>

    </React.Fragment>

}
