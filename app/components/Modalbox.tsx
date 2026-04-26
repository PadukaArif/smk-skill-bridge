import React from 'react'

const Modalbox = ({children}:{children:React.ReactNode}) => {
  return (
    <main className=' w-fit h-fit p-4 rounded-4xl border shadow-lg modalBox bg-neutral-100'>
        {children}
    </main>
  )
}

export default Modalbox