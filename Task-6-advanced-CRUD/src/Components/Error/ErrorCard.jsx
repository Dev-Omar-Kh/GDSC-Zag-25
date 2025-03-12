import React from 'react';
import Lottie from 'lottie-react';

import icon from '../../assets/JSON/wrong.json';

export default function ErrorCard() {

    return <React.Fragment>

        <div className='
            col-span-full min-h-80 rounded-md bg-[var(--salt-color)] shadow-[0_0px_10px_var(--gray-color-3)]
            flex items-center justify-center flex-col text-[var(--red-color)]
        '>

            <Lottie className='w-28' animationData={icon} loop={false} />
            <p className='text-xl font-semibold'>Error on fetching data</p>

        </div>

    </React.Fragment>

}
