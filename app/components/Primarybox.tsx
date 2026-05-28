import React from 'react'

export interface IProps {
    colors: Colors
    children: React.ReactNode
    outline: boolean,
    secondary?: boolean
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}
const Primarybox = ({ colors, children, outline, secondary }: IProps) => {
    if (outline) {
        if (secondary) {
            return (
                <div className=" p-1 e-4 rounded-full w-fit cursor-pointer my-2 shadow truncate border lg:p-2 lg:pe-6"
                    style={{ borderColor: colors.subtle_color, color: colors.secondary_color, boxShadow: colors.base_color }}>
                    {children}
                </div>
            )
        } else {
            return (
                <div className=" p-1 pe-4 rounded-full w-fit cursor-pointer my-2 shadow truncate border lg:p-2 lg:pe-6"
                    style={{ borderColor: colors.base_color, color: colors.primary_color, boxShadow: colors.base_color }}>
                    {children}
                </div>
            )
        }
    } else {
        if (secondary) {
            return (
                <div className=" p-1 e-4 rounded-full w-fit cursor-pointer my-2 shadow truncate lg:p-2 lg:pe-6"
                    style={{ backgroundColor: colors.subtle_color, color: colors.secondary_color, boxShadow: colors.base_color }}>
                    {children}
                </div>
            )
        } else {
            return (
                <div className=" p-1 e-4 rounded-full w-fit cursor-pointer my-2 shadow truncate lg:p-2 lg:pe-6"
                    style={{ backgroundColor: colors.base_color, color: colors.primary_color, boxShadow: colors.base_color }}>
                    {children}
                </div>
            )
        }
    }
}

export default Primarybox