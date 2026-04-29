import Link from 'next/link'
import { useEffect } from 'react'


export interface NavbarProps {
    isGlass: boolean
}
const Navbar = ({ isGlass }: NavbarProps) => {
    // const [name, setName] = useState<string>()
    // const [show, setShow] = useState<boolean>()
    useEffect(() => {
    }, [])
    // const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setName(e.target.value)
    // }
    // const handleSubmit = () => {
    //     if (name) {
    //         localStorage.setItem("username", name)
    //     } else {
    //         Swal.fire({
    //             icon: "warning",
    //             title: "Incorrect",
    //             text: "Please add an username",
    //             timer: 1440,
    //             timerProgressBar: true,
    //             toast: true
    //         })
    //     }
    // }
    // const handleShow = () => {
    //     setShow(!show)
    // }
    return (
        <>
            <nav className={`w-full p-4 px-3 flex jakarta-sans fixed z-50 duration-500 justify-between
            ${isGlass
                    ? 'bg-amber-50/60 backdrop-blur-md scale-75 rounded-4xl my-2 shadow-2xl'
                    : 'bg-amber-100/80 shadow-amber-300 scale-100'}`}>
                <div className=" flex gap-2 items-center">
                    <div className=" font-semibold bg-linear-75 from-amber-300 to-amber-400 align-middle p-3 rounded-2xl text-neutral-50 
                shadow shadow-amber-300 text-xl">
                        SB
                    </div>
                    <p className=' text-2xl font-semibold m-0 drop-shadow'>Skill<span className='font-bold text-amber-500'>Bridge</span></p>
                </div>
                <div className=" flex items-center gap-8">
                    <Link href={'/'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} hover:opacity-75 hover:text-amber-500 text-lg font-bold drop-shadow duration-500`}>
                        Beranda
                    </Link>
                    <Link href={'/#explore'} className={`${isGlass ? "text-neutral-800" : "text-amber-500"} hover:opacity-75 hover:text-amber-500 text-lg font-bold drop-shadow duration-500`}>
                        Eksplorasi
                    </Link>
                </div>
                <div className=" flex items-center">
                    <button type='button' className=' bg-linear-75 from-amber-400 to-amber-500 p-4 rounded-3xl text-neutral-50 font-semibold duration-500 
                hover:shadow-xl hover:shadow-amber-100 hover:text-neutral-800 outline-0'>
                        <span>Get Started</span>
                        <i className="bi bi-arrow-up-right mx-4"></i>
                    </button>
                </div>
            </nav>
            {/* {show && (
                <Modalbox>
                    <section className=' flex flex-col gap-4'>
                        <label htmlFor="">Sebelum mengikuti tes, mohon masukkan nama dahulu</label>
                        <div className=" flex p-2 rounded-2xl border">
                            <input type="text" name="" id="" className=' p-2 outline-0 w-[24dvw]' placeholder='Masukkan nama' onChange={(e) => handleName(e)} />
                            <Link href={'/questions'} className=' bg-linear-270 from-amber-300 to-amber-400 p-4 text-neutral-100 rounded-2xl text-xl 
                        duration-500 hover:shadow-xl hover:shadow-amber-100' onClick={() => handleSubmit()}>
                                <span>Mulai Tes</span>
                                <i className="bi bi-arrow-right mx-2"></i>
                            </Link>
                        </div>
                    </section>
                </Modalbox>
            )} */}
        </>
    )
}

export default Navbar