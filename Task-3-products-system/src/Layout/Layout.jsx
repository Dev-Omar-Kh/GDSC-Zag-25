import React, { useState } from 'react'
import Header from '../Components/Header/Header'
import { Outlet } from 'react-router-dom'

import proData from '../assets/products.json';

export default function Layout() {

    const [filteredDate, setFilteredDate] = useState(proData);
    const [searchPro, setSearchPro] = useState('');

    return <React.Fragment>

        <Header searchPro={searchPro} setSearchPro={setSearchPro} setFilteredDate={setFilteredDate} />

        <Outlet context={{filteredDate, searchPro}} />

    </React.Fragment>

}
