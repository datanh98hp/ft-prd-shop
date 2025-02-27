import React from 'react'

export default function Card({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='dark:bg-[#191C24] shadow-md dark:text-white text-black '>
            {children}
        </div>
    )
}
