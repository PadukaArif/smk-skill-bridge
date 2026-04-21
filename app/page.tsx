'use client'

import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import Lenis from "lenis"

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
    const badgeRef = useRef<HTMLDivElement>(null)
    const [navShrunk, setNavShrunk] = useState(false)

    useEffect(() => {
        axios.get<Data[]>('/majors.json')
            .then((hasil) => {
                setJurusan(hasil.data)
            })
    }, [])

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        const observer = new IntersectionObserver(
            ([entry]) => { setNavShrunk(!entry.isIntersecting) },
            { threshold: 0 }
        )
        if (badgeRef.current) observer.observe(badgeRef.current)

        return () => { lenis.destroy(); observer.disconnect() }
    }, [])

    const handlePilihan = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPilihan(jurusan[Number(e.target.value) - 1])
        setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
    }, 100)
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden antialiased selection:bg-emerald-100 selection:text-emerald-900">
            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-700px h-700px bg-emerald-100/30 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 animate-float" />
                <div className="absolute top-1/3 right-0 w-600px h-600px bg-teal-100/25 rounded-full blur-[120px] translate-x-1/4 animate-float-slow" />
                <div className="absolute bottom-0 left-1/3 w-500px h-500px bg-blue-100/20 rounded-full blur-[100px] translate-y-1/4 animate-float" />
                <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <header className="fixed top-0 left-0 w-full z-50 animate-fade-in">
                <nav className={`backdrop-blur-xl bg-white/80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navShrunk ? 'mx-4 md:mx-auto md:max-w-3xl mt-3 rounded-2xl border border-slate-200/50 shadow-xl' : 'border-b border-slate-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'}`}>
                    <div className={`mx-auto flex items-center justify-between transition-all duration-700 ${navShrunk ? 'px-4 sm:px-6 h-14' : 'max-w-7xl px-4 sm:px-6 lg:px-8 h-20'}`}>
                        <a href="#beranda" className="flex items-center gap-3 group">
                            <div className={`rounded-xl bg-linear-to-br from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-emerald-600/20 group-hover:shadow-emerald-600/40 group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300 ${navShrunk ? 'w-9 h-9 text-xs' : 'w-11 h-11'}`}>
                                SB
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-slate-900">
                                Skill<span className="text-emerald-600">Bridge</span>
                            </span>
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#beranda" className="relative text-slate-500 font-semibold hover:text-slate-900 transition-colors duration-300 group">
                                Beranda
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-full transition-all duration-300" />
                            </a>
                            <a href="#explore" className="relative text-slate-500 font-semibold hover:text-slate-900 transition-colors duration-300 group">
                                Eksplorasi
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 rounded-full group-hover:w-full transition-all duration-300" />
                            </a>
                        </div>
                        <button className="hidden md:flex px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40 hover:shadow-lg">
                            Mulai Gratis
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <section id="beranda" className="relative min-h-screen flex items-center pt-20">
                    <div className="absolute top-32 right-12 w-20 h-20 border-2 border-emerald-200/40 rounded-full animate-float hidden lg:block" />
                    <div className="absolute bottom-40 left-16 w-14 h-14 border-2 border-teal-200/30 rounded-2xl rotate-12 animate-float-slow hidden lg:block" />
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-teal-400/40 rounded-full animate-glow-breathe hidden lg:block" />
                    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-emerald-400/50 rounded-full animate-glow-breathe hidden lg:block" />

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
                        <div className="text-center max-w-4xl mx-auto">
                            <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-700 font-semibold text-sm mb-8 animate-scale-in shadow-sm backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-glow-breathe shadow-[0_0_8px_rgba(5,150,105,0.6)]" />
                                IOFest 2026 · Human Capital &amp; Future Skills
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-slide-up">
                                <span className="text-[0.7em]">GPS Kesiapan Industri</span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-teal-500 to-blue-600 bg-size-[200%_auto] animate-gradient-x">
                                    Talenta SMK Indonesia.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up-d1">
                                Platform assessment interaktif yang membantu siswa SMK mengukur kesiapan kompetensi industri 2026 melalui pemetaan skill gap dan roadmap belajar personal.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto bg-white p-2 rounded-full shadow-xl shadow-slate-200/50 border border-slate-100 focus-within:ring-4 focus-within:ring-emerald-500/20 focus-within:border-emerald-400 transition-all duration-300 animate-slide-up-d2">
                                <input
                                    type="text"
                                    placeholder="Masukkan nama kamu..."
                                    className="w-full px-6 py-3.5 rounded-full bg-transparent focus:outline-none text-lg text-slate-800 placeholder:text-slate-400"
                                />
                                <button className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-95 whitespace-nowrap text-lg shadow-md">
                                    Mulai Test →
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-10 text-sm text-slate-400 font-medium animate-slide-up-d3">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                                    5 Jurusan
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.5)]" />
                                    30 Soal Assessment
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]" />
                                    100% Gratis
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </section>

                <section id="explore" className="py-24 md:py-32">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 md:mb-20">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/60 text-teal-700 font-semibold text-sm mb-6 shadow-sm">
                                Eksplorasi Jurusan
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                                Temukan Jalur{" "}
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-500">
                                    Kompetensimu
                                </span>
                            </h2>
                            <p className="text-lg text-slate-500 max-w-xl mx-auto">
                                Pilih jurusan untuk melihat detail skill, projek, dan peluang karir masa depan.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-10">
                                <div className="relative w-full md:w-80">
                                    <select
                                        className="w-full appearance-none px-6 py-4 rounded-2xl border-2 border-slate-100 bg-white font-semibold text-slate-700 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer pr-12"
                                        onChange={(e) => handlePilihan(e)}
                                    >
                                        <option defaultValue={"default"} hidden>Pilih Jurusan</option>
                                        {jurusan.map((a) => {
                                            return (
                                                <option key={a.ID} value={a.ID}>{a.uuid}</option>
                                            )
                                        })}
                                    </select>
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>

                            {pilihan && (
                                <div className="animate-scale-in">
                                    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                                        <div className="p-8 md:p-10 border-b border-slate-50" style={{ backgroundColor: pilihan.colors.subtle_color }}>
                                            <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-black text-white mb-4 shadow-sm" style={{ backgroundColor: pilihan.colors.secondary_color }}>
                                                {pilihan.uuid}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: pilihan.colors.primary_color }}>
                                                {pilihan.name}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="p-8 md:border-r border-slate-50">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <span className="w-2 h-8 rounded-full" style={{ backgroundColor: pilihan.colors.secondary_color }} />
                                                    <h4 className="font-black text-xs uppercase tracking-[0.15em]" style={{ color: pilihan.colors.primary_color }}>
                                                        Essential Skills
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {pilihan.skills?.map((skill: string, index: number) => (
                                                        <li key={index} className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100/60 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group cursor-default">
                                                            <span className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-200" style={{ backgroundColor: pilihan.colors.secondary_color }} />
                                                            <span className="text-sm font-medium text-slate-700">{skill}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="p-8">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <span className="w-2 h-8 rounded-full bg-emerald-400" />
                                                    <h4 className="font-black text-xs uppercase tracking-[0.15em] text-emerald-800">
                                                        Major Projects
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {pilihan.projects?.map((project: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100/60 hover:border-slate-200 hover:shadow-sm transition-all duration-200 group cursor-default">
                                                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5 group-hover:scale-125 transition-transform duration-200" />
                                                            <span className="text-sm font-medium text-slate-700">{project}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-slate-900 ">
                                            <h4 className="font-black text-xs uppercase tracking-[0.15em] text-emerald-400 mb-5">
                                                Future Careers
                                            </h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {pilihan.careers?.map((career: string, index: number) => (
                                                    <span key={index} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold text-white border border-white/10 transition-all duration-200 cursor-default">
                                                        {career}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!pilihan && (
                                <div className="py-20 text-center border-2 border-dashed border-slate-200/60 rounded-3xl bg-slate-50/30">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.3-4.3" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-400 font-semibold text-lg mb-1">Belum ada jurusan dipilih</p>
                                    <p className="text-slate-300 text-sm">Pilih jurusan di atas untuk melihat detail kompetensi.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-emerald-500/20">
                                SB
                            </div>
                            <span className="font-extrabold text-lg text-white">
                                Skill<span className="text-emerald-400">Bridge</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                            <span className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 font-medium">Next.js</span>
                            <span className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 font-medium">TypeScript</span>
                            <span className="px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 font-medium">Tailwind CSS</span>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-600">© 2026 Tim Dedy, Arif, &amp; Adzan · IOFest Web Development</p>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2 text-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                                <span className="text-slate-500">SMKN 1 Jakarta</span>
                            </span>
                            <span className="text-xs text-slate-700">Human Capital &amp; Future Skills</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}