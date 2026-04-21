'use client'

import React, { useState, useEffect } from "react"
import axios from "axios"

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
    const [jurusan, setJurusan] = useState<Data[]>([])
    const [pilihan, setPilihan] = useState<Data>();
    const [projects, setProjects] = useState<Data>();

    useEffect(() => {
        axios.get<Data[]>('/majors.json')
            .then((hasil) => {
                setJurusan(hasil.data)
            })
    }, [])

    const handlePilihan = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPilihan(jurusan[Number(e.target.value) - 1])
    }

    return (
        <div className="bg-white font-sans text-gray-900">
            <header className="border-b-2 border-gray-100">
                <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-5">
                    <h2 className="text-xl font-bold text-blue-600">SMK SKILL BRIDGE</h2>
                    <ul className="flex gap-6 text-sm font-medium">
                        <li><a href="#hero" className="hover:text-blue-600">Beranda</a></li>
                        <li><a href="#explore" className="hover:text-blue-600">Eksplorasi</a></li>
                    </ul>
                </nav>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <section id="hero" className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                        Ukur Kesiapan <span className="text-blue-600">Skill Kamu</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Pilih jurusan dan lihat apa saja yang perlu dipelajari untuk masa depan.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-3">
                        <input 
                            type="text" 
                            placeholder="Masukkan nama kamu..." 
                            className="p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none w-full md:w-64" 
                        />
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                            Mulai Sekarang
                        </button>
                    </div>
                </section>

                <section id="explore" className="border-2 border-gray-100 rounded-xl p-6 bg-gray-50">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Cari Informasi Jurusan</h2>
                        <p className="text-gray-500">Pilih salah satu jurusan di bawah ini:</p>
                    </div>

                    <div className="space-y-6">
                        <select 
                            className="w-full md:w-64 p-3 border-2 border-gray-200 rounded-lg bg-white"
                            onChange={(e) => handlePilihan(e)}
                        >
                            <option defaultValue={"default"} hidden>Pilih Jurusan</option>
                            {jurusan.map((a) => {
                                return (
                                    <option key={a.ID} value={a.ID}>{a.uuid}</option>
                                )
                            })}
                        </select>

                        {pilihan && (
                            <div className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden">
                                <div className="p-6 border-b-2 border-gray-50" style={{ backgroundColor: pilihan.colors.subtle_color }}>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: pilihan.colors.primary_color }}>
                                        {pilihan.name}
                                    </h3>
                                    <p className="text-gray-700">{pilihan.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                    <div className="p-6 border-r-2 border-gray-50">
                                        <h4 className="font-bold mb-4 text-blue-600 uppercase text-xs tracking-wider">Skill Yang Dipelajari:</h4>
                                        <ul className="space-y-2">
                                            {pilihan.skills?.map((skill: string, index: number) => (
                                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="p-6">
                                        <h4 className="font-bold mb-4 text-green-600 uppercase text-xs tracking-wider">Contoh Projek:</h4>
                                        <ul className="space-y-2">
                                            {pilihan.projects?.map((project: string, index: number) => (
                                                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                    {project}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-6 bg-gray-900 text-white">
                                    <h4 className="font-bold mb-3 text-yellow-400 text-sm">Peluang Karir:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {pilihan.careers?.map((career: string, index: number) => (
                                            <span key={index} className="text-xs bg-gray-800 px-3 py-1 rounded">
                                                {career}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {!pilihan && (
                            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-gray-400">Silakan pilih jurusan untuk melihat detail.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <footer className="text-center py-8 text-gray-400 text-sm border-t border-gray-100 mt-12">
                <p>&copy; 2026 Tim Dedy, Arif, & Adzan - #FutureSkills</p>
            </footer>
        </div>
    )
}