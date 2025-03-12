import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import { IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../Animations/Animation';
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

    }, [handleClickOutside]);

    const handleSelectType = (type) => {

        setFilterKey(type);
        setSelectedType(type);
        setDisplayList(false);

    }

    return <React.Fragment>

        <div ref={ulRef} className='
            w-fit relative rounded-md bg-[var(--gray-color-3)] text-base font-medium text-[var(--blue-color)] max-[620px]:w-full
        '>

            <div 
                onClick={() => setDisplayList(prev => !prev)} 
                className='h-12 px-5 py-2.5 flex items-center justify-between gap-2.5 cursor-pointer'
            >
                <CiFilter className='text-2xl' />
                <p>{selectedType}</p>
                <IoIosArrowForward className={`text-2xl duration-300 ${displayList ? 'rotate-90' : ''}`} />
            </div>

            <AnimatePresence>
                {displayList && 
                    <motion.ul 
                        variants={Animations.displayList} 
                        initial='hidden' animate='visible' exit={'exit'} 
                        className='
                            absolute left-0 top-14 w-full max-h-80 overflow-y-auto bg-[var(--salt-color)] 
                            rounded-md shadow-[0_0px_10px_var(--gray-color-3)] z-20
                        '
                    >
                        {data.map((type, idx)=> <li 
                            onClick={() => handleSelectType(type)} key={idx} 
                            className={`
                                w-full p-2.5 flex items-center justify-center text-base font-medium 
                                border-b border-solid border-[var(--gray-color-1)] last:border-0 cursor-pointer 
                                duration-300 hover:bg-[var(--blue-color)] hover:text-[var(--salt-color)] 
                                ${selectedType === type ? 
                                    'bg-[var(--blue-color)] text-[var(--salt-color)]' : 
                                    'bg-[var(--salt-color)] text-[var(--blue-color)]'
                                }`
                            }
                        >{type}</li>)}
                    </motion.ul>
                }
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