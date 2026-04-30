import Link from 'next/link'
import { usePathname } from 'next/navigation'


export interface NavbarProps {
    isGlass: boolean
}
const Navbar = ({ isGlass }: NavbarProps) => {
    const path = usePathname()
    const isHome = path == '/' ? true : false
    const isAnswer = localStorage.getItem("username") ? true : false
    const isResult = localStorage.getItem("user_id") ? true : false
    const user_id = localStorage.getItem("user_id")
    const username = localStorage.getItem("username")
    return (
        <>
            <nav className={`w-full p-4 px-3 flex jakarta-sans fixed z-50 duration-500 justify-between font-sans
            ${isGlass
                    ? 'bg-amber-50/60 backdrop-blur-md scale-75 rounded-4xl my-2 shadow-2xl'
                    : 'bg-amber-100/80 shadow-amber-300 scale-100'}`}>
                <div className=" flex gap-2 items-center">
                    <div className=" font-bold bg-linear-75 from-amber-300 to-amber-400 align-middle p-3 rounded-2xl text-neutral-50 
                shadow shadow-amber-300 text-2xl">
                        SB
                    </div>
                    <p className=' text-2xl font-semibold m-0 drop-shadow'>Skill<span className='font-bold text-amber-500'>Bridge</span></p>
                </div>
                <div className=" flex items-center gap-8 pe-8">
                    <Link href={'/'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} hover:opacity-75 text-lg font-bold drop-shadow duration-500 hover:text-neutral-800`}>
                        Beranda
                    </Link>
                    <Link href={'#explore'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} 
                        hover:opacity-75 text-lg font-bold drop-shadow duration-500 hover:text-neutral-800`}>
                        Eksplorasi
                    </Link>
                    {isAnswer && isHome && !isResult && (
                        <Link href={'/questions'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} 
                            hover:opacity-75 text-xl font-bold drop-shadow duration-500 
                            hover:text-neutral-800`}>
                            Lanjutkan Asesmen
                        </Link>
                    )}
                </div>
                {!isHome && username !== "" && (
                    <Link href='/#start' className=' bg-linear-75 from-amber-400 to-amber-500 p-4 rounded-3xl 
                        text-neutral-50 font-semibold duration-500 hover:shadow-xl hover:shadow-amber-100 
                        hover:text-neutral-800 outline-0 text-xl'>
                        <span>{username}</span>
                        <i className="bi bi-person-circle mx-4"></i>
                    </Link>
                )}
                {isHome && (

                    <div className=" flex items-center">
                        {isHome && !isResult && (
                            <Link href='/#start' className=' bg-linear-75 from-amber-400 to-amber-500 p-4 rounded-3xl 
                        text-neutral-50 font-semibold duration-500 hover:shadow-xl hover:shadow-amber-100 text-xl
                        hover:text-neutral-800 outline-0'>
                                <span>Get Started</span>
                                <i className="bi bi-arrow-up-right mx-4"></i>
                            </Link>
                        )}

                        {isResult && isHome && (
                            <Link href={`/result/${user_id}`} className=' bg-linear-75 from-amber-400 to-amber-500 p-4 rounded-3xl 
                        text-neutral-50 font-semibold duration-500 hover:shadow-xl hover:shadow-amber-100 text-xl
                        hover:text-neutral-800 outline-0'>
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