import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import Header from './Components/Header/Header'
import Products from './Pages/Products'

export default function App() {

    return <React.Fragment>

        <Provider store={store}>

            <Header />
            <Products />

        </Provider>

    </React.Fragment>

}
