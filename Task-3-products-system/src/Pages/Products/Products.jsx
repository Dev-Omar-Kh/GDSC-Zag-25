import React from 'react';
import Card from '../../Components/Card/Card';

import productsCSS from './products.module.css';

import { useOutletContext } from 'react-router-dom';

export default function Products() {

    const {filteredDate, searchPro} = useOutletContext();

    console.log(searchPro);

    return <React.Fragment>

        <section className={`common_container ${productsCSS.container}`}>

            {searchPro.length > 0 ? 
                filteredDate.filter(pro => pro.name.toLowerCase().includes(searchPro.toLowerCase()))
                .map(pro => <Card key={pro.id} data={pro} />)
                : filteredDate.map(pro => <Card key={pro.id} data={pro} />)
            }

        </section>

    </React.Fragment>

}
