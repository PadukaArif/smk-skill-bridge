'use client'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HomeElem from "./components/Home";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import Aos from "aos";
export interface Data {
    ID: number;
    icon: string;
    uuid: string;
    name: string;
    description: string;
    skills: string[];
    projects: string[];
    careers: string[];
    colors: Colors;
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}
export default function Home() {
    const [scroll , setScroll] = useState<number>(0)
    useEffect(() => {
        Aos.init()
        const lenis = new Lenis({
            autoRaf: true,
            lerp:0.1,
            smoothWheel:true,
            duration:1.5
        })
        lenis.start()
        lenis.on("scroll", (e) => {
            setScroll(e.progress !== 0 ? e.progress : .1)
        })
    }, [])
    return (
        <>
            <Navbar isGlass={scroll > .1 ? true : false}/>
            <Hero />
            <HomeElem />
            <Footer />
        </>
    )
}