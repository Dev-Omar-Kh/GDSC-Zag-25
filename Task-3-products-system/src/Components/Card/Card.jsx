import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import PropTypes from 'prop-types';

import cardCSS from './card.module.css';

export default function Card({data}) {

    return <React.Fragment>

        <div className={cardCSS.container}>

            <img src={data.img} alt="" />

            <div className={cardCSS.pro_info}>

                <h3>{data.name}</h3>

                <div className={cardCSS.cate_cont}>
                    <p>{data.category}</p>
                </div>

                <div className={cardCSS.price}>
                    <p className={cardCSS.old_price}>{data.price} USD</p>
                    <p className={cardCSS.new_price}>{(data.price - (data.price * (data.discount) / 100))} USD</p>
                </div>

                <div className={cardCSS.card_actions}>
                    <button className={cardCSS.add_cart}> <IoCartOutline /> Add to cart</button>
                    <button className={cardCSS.buy}> <RiMoneyDollarCircleLine /> Buy now</button>
                </div>

            </div>

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
};