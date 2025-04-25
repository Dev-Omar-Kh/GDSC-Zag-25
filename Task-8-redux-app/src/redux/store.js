import { createStore } from 'redux';
import pro1Img from '../assets/Images/cake_img.jpeg';
import pro2Img from '../assets/Images/ice_cream_img.jpeg';

const initialState = {

    cartCount: 0,

    cartItems: [],

    products: [

        {
            id: 1,
            name: 'Chocolate Cake',
            description: 'chocolate cake is a rich and decadent dessert made with layers of moist chocolate sponge cake.',
            available: 10,
            price: 99.99,
            image: pro1Img
        },

        {
            id: 2,
            name: 'Oreo Ice Cream',
            description: 'oreo ice cream is a delicious dessert made with crushed oreo cookies and creamy vanilla ice cream.',
            available: 5,
            price: 49.99,
            image: pro2Img
        }

    ]

};

function reducer(state = initialState, action) {

    switch (action.type) {
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

const store = createStore(reducer);

export default store;
