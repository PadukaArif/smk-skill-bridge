import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Swal from 'sweetalert2'
import Aos from 'aos'
const Hero = () => {
    const [name, setName] = useState<string>()
    const username = typeof window !== 'undefined' ? localStorage.getItem("username") : null;
    useEffect(() => {
        Aos.refresh()
    }, [])
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleSubmit = () => {
        if (name || username) {
            localStorage.setItem("username", name ? name : username!)
            location.href = '/questions'
        } else {
            Swal.fire({
                icon: "warning",
                title: "Incorrect",
                text: "Please add an username",
                timer: 1440,
                timerProgressBar: true,
                toast: true,
                showConfirmButton: false
            })
        }
    }
    return (
        <main className=' flex justify-center items-center font-sans bg-neutral-50 pb-8 pt-8' style={{ paddingTop: "24dvh" }}>
            <section className=" flex flex-col gap-8 items-center">
                <div className=" p-3 px-4 bg-amber-50 w-fit rounded-4xl flex gap-4 border text-amber-600 border-amber-400 shadow 
                shadow-amber-50 cursor-pointer duration-500 hover:shadow-xl 
                hover:shadow-amber-100" data-aos="fade-up">
                    <i className="bi bi-circle-fill text-amber-400"></i>
                    <p className=' font-semibold'>IOFest 2026 . Human Capital Skills</p>
                </div>
                <div className="  flex flex-col items-center font-sans cursor-pointer" data-aos="fade-up" data-aos-delay={50}>
                    <p className=' text-3xl font-bold m-0'>GPS Kesiapan Industri</p>
                    <p className=' text-7xl font-extrabold m-0 text-amber-400'>Talenta SMK</p>
                    <p className=' text-7xl font-bold m-0 text-amber-600'>Indonesia.</p>
                    <p className=' max-w-[24dvw] text-center mt-8 text-neutral-400'>
                        Platform assesment interaktif yang membantu siswa SMK mengukur kesiapan dan kmopetensi industri 2026 melalui pemetaan skill gap dan roadmap belajar personal
                    </p>
                </div>
                <section data-aos="fade-up" data-aos-delay={10}>
                    <div className="border border-amber-400 p-2 rounded-4xl flex mt-8 justify-between">
                        <input type="text" name="" id="start" className=' p-2 outline-0 w-[24dvw]' placeholder='Masukkan nama' onChange={(e) => handleName(e)}
                            defaultValue={username ? username : ""} />
                        <button type='button' className=' bg-linear-270 from-amber-300 to-amber-400 p-3 px-5 text-neutral-100 rounded-3xl text-xl 
                        duration-500 hover:shadow-xl hover:shadow-amber-100' onClick={() => handleSubmit()}>
                            <span>Mulai Tes</span>
                            <i className="bi bi-arrow-right mx-2"></i>
                        </button>
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
            </section>
        </main>
    )
}

export default Hero