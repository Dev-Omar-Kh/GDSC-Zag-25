import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import axios from 'axios';

const initialState = {

    cartCount: 0,
    cartItems: [],
    products: [],
    loading: false,
    error: null,

};

function reducer(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return { ...state, loading: false, products: action.payload };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'ADD_TO_CART': {
            const updatedProducts = state.products.map(product => {
                if (product.id === action.payload && product.available > 0) {
                    return { ...product, available: product.available - 1 };
                }
                return product;
            });

            const existingCartItem = state.cartItems.find(item => item.id === action.payload);

            const updatedCartItems = existingCartItem ? 
                state.cartItems.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)
                : [...state.cartItems, { ...state.products.find(product => product.id === action.payload), quantity: 1 }];

            return {
                ...state,
                cartCount: state.cartCount + 1,
                cartItems: updatedCartItems,
                products: updatedProducts
            };
        }
        default:
            return state;
    }

}

export const fetchProducts = () => async (dispatch) => {

    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });
    try {
        const response = await axios.get('https://traffic-fake-data-production.up.railway.app/reduxAppData');
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
    }

};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
