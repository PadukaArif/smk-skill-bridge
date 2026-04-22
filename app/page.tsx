'use client'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HomeElem from "./components/Home";
export interface Data {
    ID: number;
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
    return (
        <>
            <Navbar />
            <div className=" mt-8"></div>
            <Hero />
            <HomeElem />
            <Footer />
        </>
    )
}