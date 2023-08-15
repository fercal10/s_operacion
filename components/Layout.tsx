import React from 'react'
import SideBar from './SideBar'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div
            className='w-screen h-screen flex justify-center content-center  bg-blue-200'>
            < div className='flex flex-auto text-xs md:text-base  flex-col sm:flex-row ' >
                <div className='flex min-h-min'>
                    <SideBar />
                </div>
                <div className=' flex-auto bg-white'>

                    <div className=" bg-cyan-50 overflow-x-auto border border-gray-100 rounded  shadow-2xl">

                        {children}
                    </div>
                </div>


            </div >


        </div>
    )
}

export default Layout