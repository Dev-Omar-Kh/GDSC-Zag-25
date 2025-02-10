import React from 'react';

import headerCSS from './header.module.css';
import Search from '../Search-Bar/Search';
import Filter from '../Filters/Filter';
import PropTypes from 'prop-types';

export default function Header({filteredDate, setFilteredDate, searchPro, setSearchPro}) {

    return <React.Fragment>

        <header className={`common_container ${headerCSS.container}`}>

            <Search searchPro={searchPro} setSearchPro={setSearchPro} />

            <Filter filteredDate={filteredDate} setFilteredDate={setFilteredDate} />

        </header>

    </React.Fragment>

}

Header.propTypes = {
    filteredDate: PropTypes.array.isRequired,
    setFilteredDate: PropTypes.func.isRequired,
    searchPro: PropTypes.string,
    setSearchPro: PropTypes.func
};