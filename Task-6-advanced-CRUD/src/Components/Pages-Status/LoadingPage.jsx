import React from 'react'

export default function LoadingPage() {

    return <React.Fragment>

        <section className='
            fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[var(--black-opacity-color)] z-[100]
        '>

            <div className="flex-col gap-5 w-full flex items-center justify-center">
                <div className="
                    w-20 h-20 border-5 border-transparent text-[var(--blue-color)] text-4xl 
                    animate-spin flex items-center justify-center 
                    border-t-[var(--blue-color)] rounded-full
                ">
                    <div className="
                        w-16 h-16 border-5 border-transparent text-[var(--salt-color)] text-2xl 
                        animate-spin flex items-center justify-center 
                        border-t-[var(--salt-color)] rounded-full
                    "></div>
                </div>
            </div>


        </section>

    </React.Fragment>

}
