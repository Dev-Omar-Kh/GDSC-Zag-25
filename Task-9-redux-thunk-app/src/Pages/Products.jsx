import React, { useEffect } from 'react';
import Card from '../Components/Cards/Card';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/store';
import CardLoading from '../Components/Cards/CardLoading';
import { PiSealWarning } from 'react-icons/pi';

export default function Products() {

    const { products, loading, error } = useSelector(state => ({
        products: state.products,
        loading: state.loading,
        error: state.error
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddToCart = (productId) => {
        dispatch({ type: 'ADD_TO_CART', payload: productId });
    };

    return <React.Fragment>

        <section className='w-full full-min-h-screen common-padding flex items-center justify-center'>

            <div className='w-3xl grid grid-cols-2 gap-5 max-[845px]:w-full max-[670px]:grid-cols-1'>

                {!loading && !error && products.map(card => (
                    <Card 
                        key={card.id} 
                        data={card} 
                        onAddToCart={() => handleAddToCart(card.id)} 
                    />
                ))}

                {loading && !error && ["1", "2"].map((_, idx) => <CardLoading key={idx} />)}

                {error && <div className="col-span-2 flex flex-col items-center gap-2.5 text-red-500">
                    <PiSealWarning className='text-9xl' />
                    <p className='text-2xl text-center font-bold'>{error}</p>
                </div>}

            </div>



        </section>

    </React.Fragment>
}
