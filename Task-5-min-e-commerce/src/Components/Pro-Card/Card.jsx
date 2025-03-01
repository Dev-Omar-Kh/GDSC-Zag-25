import React from 'react';
import { TiStar } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function Card({data}) {

    return <React.Fragment>

        <Link to={`/single-pro/${data.id}`} className='rounded-lg flex flex-col gap-5 shadow-[0_0px_10px_var(--opacity-gray-color)] overflow-hidden'>

            <img className='h-80 max-w-full object-cover m-auto' src={data.imageCover} alt={data.title} />

            <div className='px-5 pb-5 flex flex-col gap-2.5'>

                <h3 className='text-2xl font-semibold text-[var(--dark-color)]'>{`${data.title.split(' ').slice(0, 3).join(' ')}${data.title.split(' ').length > 3 ? '...' : ''}`}</h3>

                <span className='w-fit text-sm py-1 px-2 rounded-4xl text-[var(--white-color)] font-medium bg-[var(--orange-color)]'>{data.category.name}</span>

                <div className='flex justify-between'>

                    <p className='text-xl font-medium text-[var(--dark-color)]'>{data.price} EGP</p>

                    <div className='flex items-center gap-1'>
                        <TiStar className='text-2xl text-[var(--orange-color)]' />
                        <p className='text-base font-medium text-[var(--dark-color)]'>{data.ratingsAverage}</p>
                    </div>

                </div>

            </div>

        </Link>

    </React.Fragment>

}

Card.propTypes = {

    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageCover: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }).isRequired,
        price: PropTypes.number.isRequired,
        ratingsAverage: PropTypes.number.isRequired,
    })

}