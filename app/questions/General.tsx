import Link from 'next/link'
import React, { useState } from 'react'

interface IGeneral {
    func: (value:string) => void
    func1: () => void
    // value: string
}

const General = ({func,func1}:IGeneral) => {
    const [show, setShow] = useState<boolean>(true)
    const [value, setValue] = useState<string>("")

    const division = typeof window !== 'undefined' ? localStorage.getItem("division") : null
    const inforSelected: boolean = value == "informatika" ? true : false
    const bangunanSelected: boolean = value == "bangunan" ? true : false
    const mesinSelected: boolean = value == "mesin" ? true : false
    const notKnowSelected: boolean = value == "notKnow" ? true : false
    const icon = inforSelected ? "bi bi-laptop-fill" : bangunanSelected ? "bi bi-building-fill" : mesinSelected ? "bi bi-gear-fill" : ""

    const handleChoice = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setValue(e.target.value)
        localStorage.setItem("division", e.target.value)
    }
    const handleShow = () => {
        setShow(false)
    }
    return (
        <main className=' overflow-hidden'>
            {show && (
                <section className=''>
                    <section className=' mb-4'>
                        <div className=" flex justify-start items-center gap-4 w-full mb-2">
                            <div className=" p-4 rounded-2xl bg-amber-100 flex items-center justify-center">
                                <i className={`bi bi-check-circle-fill text-3xl drop-shadow text-amber-400 text-center align-middle`}></i>
                            </div>
                            <div className=" flex flex-col font-mono">
                                <p className=' text-xl text-neutral-400 font-sans'>Sebelum memulai tes</p>
                                <p className=' text-xl font-semibold'>Bidang mana menarik bagimu</p>
                            </div>
                        </div>
                        {/* <p className=' text-lg'>Sebelum memulai tes, apakah kamu sudah tahu ingin memilih bidang mana ? </p> */}
                    </section>
                    <section className=' flex flex-col gap-4 justify-start'>
                        <label htmlFor="informatika" className={` flex gap-4 p-3 pe-12 rounded-full border ${inforSelected ? "border-green-600" : "border-neutral-200"} bg-neutral-100`}>
                            <div className={`w-6 h-6 border rounded-full ${inforSelected ? "bg-green-200 border-2 border-green-600" : "bg-transparent border-neutral-400"} `}></div>
                            <span>INFORMATIKA</span>
                            <input type="radio" name="choice" id="informatika" className=' sr-only' onChange={(e) => {
                                handleChoice(e)
                                func(e.target.value)
                                }} value="informatika" />
                        </label>
                        <label htmlFor="bangunan" className={` flex gap-4 p-3 pe-12 rounded-full border ${bangunanSelected ? "border-green-600" : "border-neutral-200"} bg-neutral-100`}>
                            <div className={`w-6 h-6 border rounded-full ${bangunanSelected ? "bg-green-200 border-2 border-green-600" : "bg-transparent border-neutral-400"} `}></div>
                            <span>BANGUNAN</span>
                            <input type="radio" name="choice" id="bangunan" className=' sr-only' onChange={(e) => {
                                handleChoice(e)
                                func(e.target.value)
                                }} value="bangunan" />
                        </label>
                        <label htmlFor="mesin" className={` flex gap-4 p-3 pe-12 rounded-full border ${mesinSelected ? "border-green-600" : "border-neutral-200"} bg-neutral-100`}>
                            <div className={`w-6 h-6 border rounded-full ${mesinSelected ? "bg-green-200 border-2 border-green-600" : "bg-transparent border-neutral-400"} `}></div>
                            <span>MESIN</span>
                            <input type="radio" name="choice" id="mesin" className=' sr-only' onChange={(e) => {
                                handleChoice(e)
                                func(e.target.value)
                                }} value="mesin" />
                        </label>
                        <label htmlFor="notKnow" className={` flex gap-4 p-3 pe-12 rounded-full border ${notKnowSelected ? "border-amber-600" : "border-neutral-200"} bg-neutral-100`}>
                            <div className={`w-6 h-6 border rounded-full ${notKnowSelected ? "bg-amber-200 border-2 border-amber-600" : "bg-transparent border-neutral-400"} `}></div>
                            <span>Belum Tahu</span>
                            <input type="radio" name="choice" id="notKnow" className=' sr-only' onChange={(e) => {
                                handleChoice(e)
                                func(e.target.value)
                                }} value="notKnow" />
                        </label>
                    </section>
                    {value && !notKnowSelected && (
                        <section className=' flex flex-col gap-2'>
                            <div className=' text-lg text-neutral-400'>
                                Pilihan kamu
                                <div className=" p-1 px-4 rounded-full w-fit cursor-pointer my-2 shadow truncate lg:p-2 lg:px-6 bg-green-100/64">
                                    <i className={`${icon} me-4 text-green-600`}></i>
                                    <span className=' text-green-600 mx-2'>{value[0].toUpperCase()}{value.slice(1, value.length)}</span>
                                </div>
                            </div>
                            <button className=' p-2 px-4 w-full text-xl bg-linear-90 from-amber-400 to-amber-500 text-neutral-100 rounded-xl cursor-pointer hover:opacity-75 active:scale-90' 
                            onClick={()=>{
                                func(value)
                                func1()
                                handleShow()
                                }}>
                                <span>Mulai tes</span>
                                <i className="bi bi-arrow-right mx-2"></i>
                            </button>
                        </section>
                    )}
                    {notKnowSelected && (
                        <section>
                            <p className=' text-lg text-neutral-400'>
                                Belum tahu pilihanmu
                            </p>
                            <button className=' p-2 px-4 w-full text-xl bg-linear-90 from-amber-400 to-amber-500 text-neutral-100 rounded-xl cursor-pointer hover:opacity-75 active:scale-90'
                                onClick={() => { 
                                    func(value)
                                    func1()
                                    handleShow() 
                                    }}>
                                <span>Mulai tes terlebih dahulu</span>
                                <i className="bi bi-arrow-right mx-2"></i>
                            </button>
                        </section>
                    )}
                </section>
            )}
        </main>
    )
}

export default General