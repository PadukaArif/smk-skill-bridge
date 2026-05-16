import React from 'react'

export interface IProps {
    colors: Colors
    children: React.ReactNode
    outline: boolean,
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}
const Primarybox = ({ colors, children, outline }: IProps) => {
    if (outline) {
        return (
            <div className=" p-1 px-4 rounded-full w-fit cursor-pointer my-2 shadow truncate border lg:p-2 lg:px-6"
                style={{ borderColor: colors.subtle_color, color: colors.base_color, boxShadow: colors.base_color }}>
                {children}
            </div>
        )
    } else {
        return (
            <div className=" p-1 px-4 rounded-full w-fit cursor-pointer my-2 shadow truncate lg:p-2 lg:px-6"
                style={{ backgroundColor: colors.subtle_color, color: colors.base_color, boxShadow: colors.base_color }}>
                {children}
            </div>
        )
    }
}

export default Primarybox