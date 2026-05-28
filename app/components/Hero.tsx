import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Aos from 'aos'
const Hero = () => {
    const [name, setName] = useState<string>()
    const [invalid, setInvalid] = useState<boolean>(false)
    const username = typeof window !== 'undefined' ? localStorage.getItem("username") : null;
    useEffect(() => {
        Aos.refresh()
    }, [])
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleSubmit = () => {
        if(username){
            setName(username)
        }
        if (name) {
            if (name.length > 4) {
                localStorage.setItem("username", name ? name : username!)
                location.href = '/questions'
            } else {
                setInvalid(true)
            }
        }else{
            console.log("2")
        }
    }
    const handleInvalid = () => {
        setInvalid(!invalid)
    }
    return (
        <main className=' flex justify-center items-center font-sans bg-neutral-50 pb-8 pt-8' style={{ paddingTop: "24dvh" }}>
            <section className=" flex flex-col gap-8 items-center">
                <div className=" p-3 px-4 bg-amber-50 w-fit rounded-4xl flex gap-4 border text-amber-600 border-amber-400 shadow 
                shadow-amber-50 cursor-pointer duration-500 hover:shadow-xl hover:shadow-amber-100 text-xs lg:text-base " data-aos="fade-up">
                    <i className="bi bi-circle-fill text-amber-400"></i>
                    <p className=' font-semibold'>✨ Temukan Jurusan SMK Impianmu</p>
                </div>
                <div className="  flex flex-col items-center font-sans cursor-pointer text-center" data-aos="fade-up" data-aos-delay={50}>
                    <p className=' text-2xl font-bold m-0 lg:text-5xl'>Bingung Pilih Jurusan?</p>
                    <p className=' text-5xl font-extrabold m-0 text-amber-400 lg:text-7xl'>Temukan Jurusan</p>
                    <p className=' text-5xl font-bold m-0 text-amber-600 lg:text-7xl'>SMK yang Cocok.</p>
                    <p className=' max-w-[72dvw] text-center mt-8 text-neutral-400 lg:max-w-[32dvw]'>
                        Yuk, kenali minat, bakat, dan potensimu lewat asesmen interaktif agar tidak salah pilih jurusan SMK. Mulai petualangan belajarmu sekarang!
                    </p>
                </div>
                <section data-aos="fade-up" data-aos-delay={10} className=' flex flex-col items-center'>
                    <div className=" flex flex-col w-fit items-start mt-8 gap-2">
                        {invalid && (
                            <p className=' text-red-600'>
                                <i className="bi bi-exclamation-circle-fill me-4"></i>
                                <span className=''>Mohon masukkan nama, minimal 4 karakter</span>
                            </p>
                        )}
                        <div className={`border p-2 rounded-4xl flex mx-auto justify-between w-fit lg:w-[48dvw] ${invalid ? "border-red-600" : "border-amber-400"}`}>
                            <input type="text" name="" id="start" className=' p-2 outline-0 w-fit lg:w-[24dvw]' placeholder='Masukkan nama' onChange={(e) => handleName(e)}
                                defaultValue={username ? username : ""} min={4} onInvalid={() => handleInvalid()} />
                            <button type='button' className=' bg-linear-270 from-amber-300 to-amber-400 p-1 px-3 text-neutral-100 rounded-3xl text-xl 
                        duration-500 hover:shadow-xl hover:shadow-amber-100 lg:p-3 lg:px-5' onClick={() => handleSubmit()}>
                                <span className=' hidden lg:inline'>Mulai Tes</span>
                                <span className=' inline lg:hidden'>Mulai</span>
                                <i className="bi bi-arrow-right mx-2"></i>
                            </button>
                        </div>
                    </div>
                    <div className=" flex gap-8 justify-center items-center font-sans mt-2 text-xs lg:text-base w-[80dvw]">
                        <div className=" flex gap-2 items-center justify-center">
                            <i className="bi bi-circle-fill me-4 text-amber-300 drop-shadow drop-shadow-amber-300"></i>
                            <p className='text-neutral-400 drop-shadow text-xs lg:text-base'>10 Pilihan Jurusan</p>
                        </div>
                        <div className=" flex gap-2 items-center justify-center">
                            <i className="bi bi-circle-fill me-4 text-amber-400 drop-shadow drop-shadow-amber-400"></i>
                            <p className='text-neutral-400 drop-shadow text-xs lg:text-base'>20 Soal Asesmen Minat</p>
                        </div>
                        <div className=" gap-2 items-center justify-center hidden lg:flex">
                            <i className="bi bi-circle-fill me-4 text-amber-800 drop-shadow drop-shadow-amber-800"></i>
                            <p className='text-neutral-400 drop-shadow text-xs lg:text-base'>100% Gratis</p>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    )
}

export default Hero