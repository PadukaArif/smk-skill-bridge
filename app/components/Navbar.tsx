'use client'
import axios from 'axios'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'


export interface NavbarProps {
    isGlass: boolean
}
const Navbar = ({ isGlass }: NavbarProps) => {
    const [mounted, setMounted] = useState(false)
    const path = usePathname()
    useEffect(() => {
        axios.get('/api/clear')
            .then((data) => {
                setMounted(true)
                console.log(data.data)
            })
    }, [])
    if (!mounted) return null;
    const isHome = path == '/' ? true : false
    const isAnswer = typeof window !== 'undefined' ? (localStorage.getItem("username") ? true : false) : false;
    const isResult = typeof window !== 'undefined' ? (localStorage.getItem("user_id") ? true : false) : false;
    const user_id = typeof window !== 'undefined' ? localStorage.getItem("user_id") : null;
    return (
        <>
            <nav className={`w-full p-3 px-2 lg:p-4 lg:px-3 flex jakarta-sans fixed z-50 duration-500 justify-between
            ${isGlass
                    ? 'bg-amber-50/60 backdrop-blur-md scale-75 rounded-4xl my-2 shadow-2xl'
                    : 'bg-amber-100/80 shadow-amber-300 scale-100'}`}>
                <div className=" flex gap-2 items-center">
                    <div className=" font-semibold bg-linear-75 from-amber-300 to-amber-400 align-middle p-1 rounded-xl text-neutral-50 
                shadow shadow-amber-300 text-xl lg:p-3 lg:rounded-2xl">
                        SB
                    </div>
                    <p className=' text-2xl font-semibold m-0 drop-shadow hidden lg:block'>Skill<span className='font-bold text-amber-500'>Bridge</span></p>
                </div>
                <div className="items-center gap-8 pe-8 flex">
                    {!isHome && (
                        <>
                            <Link href={'/'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} hover:opacity-75 text-lg font-bold drop-shadow duration-500 hover:text-neutral-800`}>
                                Beranda
                            </Link>
                            <Link href={'/#explore'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} 
                        hover:opacity-75 text-lg font-bold drop-shadow duration-500 hover:text-neutral-800`}>
                                Eksplorasi
                            </Link>
                        </>
                    )}
                    {isAnswer && isHome && !isResult && (
                        <Link href={'/questions'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} 
                            hover:opacity-75 text-lg font-bold drop-shadow duration-500 
                            hover:text-neutral-800`}>
                            Lanjutkan Asesmen
                        </Link>
                    )}
                </div>
                {isHome && (

                    <div className=" flex items-center">
                        {isHome && !isResult && (
                            <Link href='/#start' className=' bg-linear-75 from-amber-400 to-amber-500 p-4 rounded-3xl 
                        text-neutral-50 font-semibold duration-500 hover:shadow-xl hover:shadow-amber-100 
                        hover:text-neutral-800 outline-0'>
                                <span>Get Started</span>
                                <i className="bi bi-arrow-up-right mx-4"></i>
                            </Link>
                        )}

                        {isResult && isHome && (
                            <Link href={`/result/${user_id}`} className=' bg-linear-75 from-amber-400 to-amber-500 p-2 rounded-xl 
                        text-neutral-50 font-semibold duration-500 hover:shadow-xl hover:shadow-amber-100 hover:text-neutral-800 outline-0 lg:p-4 
                        lg:rounded-3xl'>
                                <span>Lihat Hasil</span>
                                <i className="bi bi-arrow-up-right mx-4"></i>
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar