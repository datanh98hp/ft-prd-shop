import Card from '@/components/admin-components/common/Card'
import TableData from '@/components/admin-components/common/TableData'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <>

            <div className='md:flex items-center gap-4 w-full md:my-0 my-4 '>
                <div className='md:w-1/2 w-full'>
                    <h3 className='text-2xl my-4'>Products</h3>
                    <Card>
                        <TableData data={[]} />
                    </Card>
                </div>

                <div className='md:w-1/2 w-full'>
                    <h3 className='text-2xl my-4'>Products Item</h3>
                    <Card>
                        dad
                    </Card>
                </div>
            </div>
        </>
    )
}
