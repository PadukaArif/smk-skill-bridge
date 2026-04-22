import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Link from 'next/link'
const Hero = () => {
    return (
        <main className=' flex justify-center items-center font-sans'>
            <section className=" flex flex-col gap-8 items-center">
                <div className=" p-3 px-4 bg-amber-50 w-fit rounded-4xl flex gap-4 border text-amber-600 border-amber-400 shadow">
                    <i className="bi bi-circle-fill text-amber-400"></i>
                    <p className=' font-semibold drop-shadow'>IOFest 2026 . Human Capital Skills</p>
                </div>
                <div className="  flex flex-col items-center font-sans">
                    <p className=' text-3xl font-bold m-0'>GPS Kesiapan Industri</p>
                    <p className=' text-7xl font-bold m-0 text-amber-400'>Talenta SMK</p>
                    <p className=' text-7xl font-bold m-0 text-amber-600'>Indonesia.</p>
                    <p className=' max-w-[24dvw] text-center mt-8 textxl text-neutral-400'>
                        Platform assesment interaktif yang membantu siswa SMK mengukur kesiapan dan kmopetensi industri 2026 melalui pemetaan skill gap dan roadmap belajar personal
                    </p>
                    <button></button>
                </div>
                <div className="border border-amber-400 p-2 rounded-4xl flex mt-8">
                    <input type="text" name="" id="" className=' p-2 outline-0 w-[24dvw]' placeholder='Masukkan nama'/>
                    <Link href={'/'} className=' bg-linear-270 from-amber-300 to-amber-400 p-3 px-5 text-neutral-100 rounded-3xl text-xl'>
                        <span>Mulai Tes</span>
                        <i className="bi bi-arrow-right mx-2"></i>
                    </Link>
                </div>
                <div className=" flex gap-8 justify-center items-center font-sans mt-2">
                    <div className=" flex gap-2 items-center justify-center">
                        <i className="bi bi-circle-fill me-4 text-amber-300 drop-shadow drop-shadow-amber-300"></i>
                        <p className='text-neutral-400 drop-shadow'>5 Jurusan</p>
                    </div>
                    <div className=" flex gap-2 items-center justify-center">
                        <i className="bi bi-circle-fill me-4 text-amber-400 drop-shadow drop-shadow-amber-400"></i>
                        <p className='text-neutral-400 drop-shadow'>30 Soal Assesment</p>
                    </div>
                    <div className=" flex gap-2 items-center justify-center">
                        <i className="bi bi-circle-fill me-4 text-amber-800 drop-shadow drop-shadow-amber-800"></i>
                        <p className='text-neutral-400 drop-shadow'>100% Gratis</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Hero