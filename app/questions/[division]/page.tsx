"use client"

import Navbar from '@/app/components/Navbar'
import Aos from 'aos'
import Lenis from 'lenis'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const params = useParams()
    const { division } = params
    const [scroll, setScroll] = useState<number>(0)
    useEffect(() => {
        Aos.init()
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.1,
            smoothWheel: true,
            duration: 1.5
        })
        lenis.start()
        lenis.on("scroll", (e) => {
            setScroll(e.progress !== 0 ? e.progress : .1)
        })
    }, [])
    return (
        <>
            <Navbar isGlass={scroll > .1 ? true : false} />
            <main className='p-4 text-neutral-800 rounded-4xl m-8 mx-auto font-sans w-[88dvw] lg:w-[72dvw] lg:p-8 lg:bg-neutral-100 lg:shadow-2xl'
                style={{ marginTop: "12dvh", marginBottom: "24dvh" }}>
                Tes untuk jurusan {division}
            </main>
        </>
    )
}

export default Page