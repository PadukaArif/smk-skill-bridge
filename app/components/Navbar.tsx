import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className=' w-full p-4 px-3 flex justify-around shadow shadow-amber-300 jakarta-sans'>
            <div className=" flex gap-2 items-center">
                <div className=" font-semibold bg-linear-75 from-amber-300 to-amber-400 align-middle p-4 rounded-2xl text-neutral-50 shadow shadow-amber-300 text-xl">
                    SB
                </div>
                <p className=' text-2xl font-semibold m-0 drop-shadow'>Skill<span className='font-bold text-amber-500'>Bridge</span></p>
            </div>
            <div className=" flex items-center gap-8">
                <Link href={'/'} className=' text-neutral-400 hover:opacity-75 hover:text-amber-500 text-lg font-bold drop-shadow duration-500'>
                    Beranda
                </Link>
                <Link href={'/'} className=' text-neutral-400 hover:opacity-75 hover:text-amber-500 text-lg font-bold drop-shadow duration-500'>
                    Eksplorasi
                </Link>
            </div>
            <div className=" flex items-center">
                <Link href={'/'} className=' bg-linear-75 from-amber-400 to-amber-500 p-3 rounded-4xl text-neutral-50 font-semibold'>
                    <span>Get Started</span>
                    <i className="bi bi-arrow-up-right mx-4"></i>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar