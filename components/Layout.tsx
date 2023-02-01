import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <div

            className='w-screen h-screen flex justify-center content-center  bg-blue-200'>{children}</div>
    )
}

export default Layout