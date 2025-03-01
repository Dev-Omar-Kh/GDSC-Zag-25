import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import { PropTypes } from 'prop-types';

export default function Filter({data, setFilterKey}) {

    const [displayList, setDisplayList] = useState(false);
    const [selectedType, setSelectedType] = useState('All Products');
    const ulRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (ulRef.current && !ulRef.current.contains(event.target)) {
            setDisplayList(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    const handleSelectType = (type) => {

        setFilterKey(type);
        setSelectedType(type);
        setDisplayList(false);

    }

    const filtersData = useMemo(() => {
        if (data) {
            return ['All Products', ...new Set(data.map(item => item.category.name))];
        }
        return ['All Products'];
    }, [data]);

    return <React.Fragment>

        <div ref={ulRef} className='relative rounded-md bg-[var(--orange-color)] text-base font-medium text-[var(--white-color)] max-[620px]:w-full'>

            <div onClick={() => setDisplayList(prev => !prev)} className='h-12 px-5 py-2.5 flex items-center justify-between gap-2.5 cursor-pointer'>
                <CiFilter className='text-2xl' />
                <p>{selectedType}</p>
                <IoIosArrowForward className={`text-2xl duration-300 ${displayList ? 'rotate-90' : ''}`} />
            </div>

            <AnimatePresence>
                {displayList && <motion.ul variants={Animations.displayList} initial='hidden' animate='visible' exit={'exit'} className='absolute left-0 top-14 w-full overflow-y-auto bg-[var(--white-color)] rounded-md shadow-[0_0px_10px_var(--opacity-gray-color)] z-20'>
                    {filtersData.map((type, idx)=> <li onClick={() => handleSelectType(type)} key={idx} className={`w-full p-5 flex items-center justify-center text-base font-medium border-b border-solid border-[var(--gray-color)] last:border-0 cursor-pointer duration-300 hover:bg-[var(--orange-color)] hover:text-[var(--white-color)] ${selectedType === type ? 'bg-[var(--orange-color)] text-[var(--white-color)]' : 'bg-[var(--white-color)] text-[var(--dark-color)]'}`}>{type}</li>)}
                </motion.ul>}
            </AnimatePresence>

        </div>

    </React.Fragment>

}

Filter.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            category: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
        })
    ).isRequired,
    setFilterKey: PropTypes.func.isRequired,
};