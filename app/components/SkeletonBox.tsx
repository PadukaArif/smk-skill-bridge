import React from 'react'

const SkeletonBox = ({children}:{children:React.ReactNode}) => {
    return (
        <div className=" p-2 px-6 rounded-full w-fit cursor-pointer my-2 shadow truncate border skeleton">
            {children}
        </div>
    )
}

export default SkeletonBox