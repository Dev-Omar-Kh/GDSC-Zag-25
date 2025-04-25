import React from 'react';
import Card from '../Components/Cards/Card';
import { useSelector, useDispatch } from 'react-redux'

export default function Products() {

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const handleAddToCart = (productId) => {
        dispatch({ type: 'ADD_TO_CART', payload: productId });
    };

    return <React.Fragment>

        <section className='w-full full-min-h-screen common-padding flex items-center justify-center'>

            <div className='w-3xl grid grid-cols-2 gap-5 max-[845px]:w-full max-[670px]:grid-cols-1'>

                {products.map(card => (
                    <Card 
                        key={card.id} 
                        data={card} 
                        onAddToCart={() => handleAddToCart(card.id)} 
                    />
                ))}

            </div>

        </section>

    </React.Fragment>
}
