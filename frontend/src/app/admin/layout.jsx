import Sidebar from '@/components/sidebar'

import React from 'react'


export default function layout({children}) {
  return (
    <div className='flex min-h-screen'>
        <Sidebar/>
        {children}
    </div>
  )
}
