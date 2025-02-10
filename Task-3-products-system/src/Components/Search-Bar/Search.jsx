import React from 'react';
import { IoSearch } from 'react-icons/io5';
import PropTypes from 'prop-types';


import SearchCSS from './search.module.css';

export default function Search({searchPro, setSearchPro}) {

    const handleChange = (e) => {
        setSearchPro(e.target.value);
    };

    return <React.Fragment>

        <form className={SearchCSS.container}>

            <input type="text" placeholder='Search for a product...' value={searchPro} onChange={handleChange} />

            <button type="button"> <IoSearch /> </button>

        </form>

    </React.Fragment>

}

Search.propTypes = {
    searchPro: PropTypes.string,
    setSearchPro: PropTypes.func
}