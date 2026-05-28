import React from 'react'

const Modalbox = ({children}:{children:React.ReactNode}) => {
  return (
    <main className=' w-fit h-fit rounded-4xl shadow-lg modalBox overflow-hidden z-30'>
        {children}
    </main>
  )
}

export default Modalbox