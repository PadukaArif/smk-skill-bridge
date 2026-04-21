'use client'

import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import Lenis from "lenis"
import ParticlesBg from "./components/ParticlesBg"
import ParticlesHero from "./components/ParticlesHero"

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
    const badgeRef = useRef<HTMLDivElement>(null)
    const [navShrunk, setNavShrunk] = useState(false)
    const lenisRef = useRef<Lenis | null>(null)
    const [splashStage, setSplashStage] = useState<'visible' | 'exit' | 'hidden'>('visible')

    useEffect(() => {
        axios.get<Data[]>('/majors.json')
            .then((hasil) => {
                setJurusan(hasil.data)
            })
    }, [])

    useEffect(() => {
        const t1 = setTimeout(() => setSplashStage('exit'), 2500)
        const t2 = setTimeout(() => setSplashStage('hidden'), 3800)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    useEffect(() => {
        if (splashStage !== 'hidden') return
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        })
        lenisRef.current = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault()
                const href = anchor.getAttribute('href')
                if (href) {
                    const target = document.querySelector(href)
                    if (target) lenis.scrollTo(target as HTMLElement, { offset: -80 })
                }
            })
        })

        const observer = new IntersectionObserver(
            ([entry]) => { setNavShrunk(!entry.isIntersecting) },
            { threshold: 0 }
        )
        if (badgeRef.current) observer.observe(badgeRef.current)

        return () => { lenis.destroy(); observer.disconnect() }
    }, [splashStage])

    useEffect(() => {
        if (lenisRef.current) lenisRef.current.resize()
    }, [pilihan])

    const handlePilihan = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPilihan(jurusan[Number(e.target.value) - 1])
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">

            {splashStage !== 'hidden' && (
                <div
                    className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
                    style={{
                        opacity: splashStage === 'exit' ? 0 : 1,
                        transition: 'opacity 0.6s ease-in-out',
                    }}
                >
                    <div className="relative">
                        <div
                            className={`absolute scale-15000 inset-[40px] rounded-full transition-opacity animate-splash-bg-spin ${splashStage === 'exit' ? 'paused' : ''}`}
                            style={{
                                background: 'conic-gradient(from 0deg, transparent 0%, #b45309 25%, transparent 50%, #92400e 75%, transparent 100%)',
                                filter: 'blur(1px)',
                            }}
                        />
                        <div className="relative z-10 animate-splash-logo">
                            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-amber-500/40">
                                SB
                            </div>
                        </div>
                    </div>
                    <p className="relative z-10 animate-splash-text mt-8 text-4xl font-extrabold text-white tracking-tight">
                        Skill<span className="text-amber-400">Bridge</span>
                    </p>
                    <div className="relative z-10 animate-splash-text mt-10 w-56 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-linear-to-r from-amber-500 to-yellow-400 rounded-full origin-left animate-splash-bar" />
                    </div>
                </div>
            )}

            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-amber-100/30 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3 animate-float" />
                <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-yellow-100/25 rounded-full blur-[120px] translate-x-1/4 animate-float-slow" />
                <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-amber-50/40 rounded-full blur-[100px] translate-y-1/4 animate-float" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #92400e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[12%] left-[8%] w-6 h-6 border-2 border-amber-300/20 rotate-45 animate-float-diamond" />
                <div className="absolute top-[35%] right-[12%] w-10 h-10 border-2 border-yellow-300/15 rotate-45 animate-float-diamond-slow" />
                <div className="absolute bottom-[20%] left-[15%] w-8 h-8 border border-amber-200/20 rotate-45 animate-drift-x" />
                <div className="absolute top-[65%] right-[25%] w-5 h-5 bg-amber-400/5 rotate-45 animate-float-diamond" />
                <div className="absolute top-[20%] right-[40%] w-4 h-4 border border-yellow-400/10 rotate-45 animate-float-slow" />
                <div className="absolute bottom-[40%] left-[45%] w-3 h-3 bg-yellow-300/8 rotate-45 animate-float-diamond-slow" />
            </div>

            <header className="fixed top-0 left-0 w-full z-50 animate-fade-in">
                <nav className={`nav-blur transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navShrunk ? 'mx-4 md:mx-auto md:max-w-3xl mt-3 rounded-2xl border border-amber-200/40 shadow-xl shadow-amber-200/20' : 'border-b border-amber-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'}`} style={{ backdropFilter: 'blur(24px) saturate(1.5)', WebkitBackdropFilter: 'blur(24px) saturate(1.5)' }}>
                    <div className={`mx-auto flex items-center justify-between transition-all duration-700 ${navShrunk ? 'px-4 sm:px-6 h-14' : 'max-w-7xl px-4 sm:px-6 lg:px-8 h-20'}`}>
                        <a href="#beranda" className="flex items-center gap-3 group cursor-pointer press">
                            <div className={`rounded-xl bg-linear-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-amber-500/20 transition-shadow duration-300 group-hover:shadow-amber-500/50 logo-invert ${navShrunk ? 'w-9 h-9 text-xs' : 'w-11 h-11'}`}>
                                SB
                            </div>
                            <span className="font-extrabold text-xl tracking-tight text-slate-900">
                                Skill<span className="text-amber-600">Bridge</span>
                            </span>
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#beranda" className="relative text-slate-500 font-semibold hover:text-amber-600 transition-colors duration-300 group cursor-pointer press">
                                Beranda
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-amber-500 to-red-500 rounded-full group-hover:w-full transition-all duration-300" />
                            </a>
                            <a href="#explore" className="relative text-slate-500 font-semibold hover:text-amber-600 transition-colors duration-300 group cursor-pointer press">
                                Eksplorasi
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-amber-500 to-red-500 rounded-full group-hover:w-full transition-all duration-300" />
                            </a>
                        </div>
                        <button className="hidden md:flex px-6 py-2.5 bg-amber-500 text-white font-bold rounded-full hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-700/25 active:translate-y-[1px] active:duration-100 transition-all duration-300 shadow-md shadow-amber-500/20 cursor-pointer btn-shimmer">
                            Mulai Gratis
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <section id="beranda" className="relative min-h-screen flex items-center pt-20">
                    <div className="absolute top-32 right-12 w-16 h-16 border-2 border-amber-200/30 rotate-45 animate-float-diamond hidden lg:block" />
                    <div className="absolute bottom-40 left-16 w-10 h-10 border-2 border-yellow-200/25 rotate-45 animate-float-diamond-slow hidden lg:block" />
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-amber-400/40 rounded-full animate-glow-breathe hidden lg:block" />
                    <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-yellow-400/50 rounded-full animate-glow-breathe hidden lg:block" />
                    <div className="absolute top-[25%] left-[10%] w-20 h-20 border border-amber-200/15 rounded-full animate-float-slow hidden lg:block" />

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
                        <div className="text-center max-w-4xl mx-auto">
                            <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-50/80 border border-amber-200/60 text-amber-700 font-semibold text-sm mb-8 animate-scale-in shadow-sm backdrop-blur-sm cursor-default">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-glow-breathe shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                                IOFest 2026 · Human Capital &amp; Future Skills
                            </div>

                            <h1 className="font-black tracking-[-0.04em] mb-8 animate-slide-up">
                                <span className="block text-3xl sm:text-4xl md:text-5xl text-slate-800 leading-tight mb-3">
                                    GPS Kesiapan Industri
                                </span>
                                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-linear-to-r from-amber-600 via-yellow-500 to-amber-500 bg-[length:200%_auto] animate-gradient-x leading-[0.95]">
                                    Talenta SMK
                                </span>
                                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-linear-to-r from-yellow-500 via-amber-600 to-red-500 bg-[length:200%_auto] animate-gradient-x leading-[0.95]">
                                    Indonesia.
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up-d1">
                                Platform assessment interaktif yang membantu siswa SMK mengukur kesiapan kompetensi industri 2026 melalui pemetaan skill gap dan roadmap belajar personal.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto bg-white p-2 rounded-full shadow-xl shadow-amber-200/30 border border-amber-100/60 focus-within:ring-4 focus-within:ring-amber-500/15 focus-within:border-amber-300 transition-all duration-300 animate-slide-up-d2">
                                <input
                                    type="text"
                                    placeholder="Masukkan nama kamu..."
                                    className="w-full px-6 py-3.5 rounded-full bg-transparent focus:outline-none text-lg text-slate-800 placeholder:text-slate-400"
                                />
                                <button className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-white font-bold rounded-full flex justify-center items-center hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-700/25 active:translate-y-[1px] active:duration-100 transition-all duration-300 whitespace-nowrap text-lg shadow-md shadow-amber-500/20 cursor-pointer btn-shimmer">
                                    Mulai Test →
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-10 text-sm text-slate-400 font-medium animate-slide-up-d3">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
                                    5 Jurusan
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
                                    30 Soal Assessment
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.5)]" />
                                    100% Gratis
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300">
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                </section>

                <div className="relative -mt-1 overflow-hidden" style={{ transition: 'background-color 0.5s ease' }}>
                    <div className="flex animate-wave-flow" style={{ width: '200%' }}>
                        <svg viewBox="0 0 1440 100" fill="none" className="w-1/2 flex-shrink-0">
                            <path d="M0 40 C240 80 480 0 720 40 C960 80 1200 0 1440 40 L1440 100 L0 100 Z" fill={pilihan ? pilihan.colors.subtle_color : '#fffbeb'} style={{ transition: 'fill 0.5s ease' }} />
                            <path d="M0 55 C240 85 480 25 720 55 C960 85 1200 25 1440 55 L1440 100 L0 100 Z" fill={pilihan ? pilihan.colors.subtle_color : '#fef3c7'} fillOpacity="0.4" style={{ transition: 'fill 0.5s ease' }} />
                        </svg>
                        <svg viewBox="0 0 1440 100" fill="none" className="w-1/2 flex-shrink-0">
                            <path d="M0 40 C240 80 480 0 720 40 C960 80 1200 0 1440 40 L1440 100 L0 100 Z" fill={pilihan ? pilihan.colors.subtle_color : '#fffbeb'} style={{ transition: 'fill 0.5s ease' }} />
                            <path d="M0 55 C240 85 480 25 720 55 C960 85 1200 25 1440 55 L1440 100 L0 100 Z" fill={pilihan ? pilihan.colors.subtle_color : '#fef3c7'} fillOpacity="0.4" style={{ transition: 'fill 0.5s ease' }} />
                        </svg>
                    </div>
                </div>

                <section id="explore" className="py-24 md:py-32 relative overflow-hidden" style={{ background: pilihan ? `linear-gradient(to bottom, ${pilihan.colors.subtle_color}, white)` : 'linear-gradient(to bottom, #fffbeb, #fef9c3 30%, #fffbeb 70%, #ffffff)', transition: 'background 0.5s ease' }}>
                    <ParticlesBg />
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-[10%] left-[5%] w-12 h-12 border-2 border-amber-300/15 rotate-45 animate-float-diamond" />
                        <div className="absolute top-[30%] right-[8%] w-8 h-8 border border-yellow-300/20 rotate-45 animate-float-diamond-slow" />
                        <div className="absolute bottom-[15%] left-[20%] w-6 h-6 bg-amber-200/10 rotate-45 animate-drift-x" />
                        <div className="absolute top-[55%] right-[30%] w-10 h-10 border border-amber-200/12 rotate-45 animate-float-diamond" />
                        <div className="absolute bottom-[35%] right-[15%] w-5 h-5 border-2 border-yellow-400/10 rotate-45 animate-float-slow" />
                        <div className="absolute top-[75%] left-[40%] w-4 h-4 bg-yellow-300/8 rotate-45 animate-float-diamond-slow" />
                        <div className="absolute top-[5%] right-[45%] w-3 h-3 bg-amber-400/10 rounded-full animate-glow-breathe" />
                        <div className="absolute bottom-[8%] left-[60%] w-2 h-2 bg-yellow-400/15 rounded-full animate-glow-breathe" />
                    </div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16 md:mb-20">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-700 font-semibold text-sm mb-6 shadow-sm animate-scale-in">
                                Eksplorasi Jurusan
                            </span>
                            <h2 className="font-black tracking-[-0.04em] text-slate-900 mb-5 animate-slide-up">
                                <span className="block text-3xl md:text-4xl mb-2">Temukan Jalur</span>
                                <span className="block text-4xl md:text-6xl bg-clip-text text-transparent bg-linear-to-r from-amber-600 via-yellow-500 to-red-500 bg-[length:200%_auto] animate-gradient-x">
                                    Kompetensimu
                                </span>
                            </h2>
                            <p className="text-lg text-slate-500 max-w-xl mx-auto animate-slide-up-d1">
                                Pilih jurusan untuk melihat detail skill, projek, dan peluang karir masa depan.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-10">
                                <div className="relative w-full md:w-80">
                                    <select
                                        className="w-full appearance-none px-6 py-4 rounded-2xl border-2 border-amber-200/60 bg-white font-semibold text-slate-700 focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all duration-300 shadow-sm hover:shadow-md hover:border-amber-300 cursor-pointer pr-12 press"
                                        onChange={(e) => handlePilihan(e)}
                                    >
                                        <option defaultValue={"default"} hidden>Pilih Jurusan</option>
                                        {jurusan.map((a) => {
                                            return (
                                                <option key={a.ID} value={a.ID}>{a.uuid}</option>
                                            )
                                        })}
                                    </select>
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>

                            {pilihan && (
                                <div className="animate-scale-in">
                                    <div className="bg-white rounded-3xl border border-amber-100/80 shadow-xl shadow-amber-200/30 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                                        <div className="p-8 md:p-10 border-b border-amber-50" style={{ backgroundColor: pilihan.colors.subtle_color }}>
                                            <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg text-xs font-black text-white mb-4 shadow-sm" style={{ backgroundColor: pilihan.colors.secondary_color }}>
                                                {pilihan.uuid}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: pilihan.colors.primary_color }}>
                                                {pilihan.name}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            <div className="p-8 md:border-r border-amber-50/60">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <span className="w-2 h-8 rounded-full" style={{ backgroundColor: pilihan.colors.secondary_color }} />
                                                    <h4 className="font-black text-xs uppercase tracking-[0.15em]" style={{ color: pilihan.colors.primary_color }}>
                                                        Essential Skills
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {pilihan.skills?.map((skill: string, index: number) => (
                                                        <li key={index} className="flex items-center gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100/60 hover:border-amber-200 hover:shadow-sm transition-all duration-200 group cursor-default">
                                                            <span className="w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200" style={{ backgroundColor: pilihan.colors.secondary_color }} />
                                                            <span className="text-sm font-medium text-slate-700">{skill}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="p-8">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <span className="w-2 h-8 rounded-full bg-amber-400" />
                                                    <h4 className="font-black text-xs uppercase tracking-[0.15em] text-amber-800">
                                                        Major Projects
                                                    </h4>
                                                </div>
                                                <ul className="space-y-3">
                                                    {pilihan.projects?.map((project: string, index: number) => (
                                                        <li key={index} className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100/60 hover:border-amber-200 hover:shadow-sm transition-all duration-200 group cursor-default">
                                                            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-1.5 group-hover:scale-125 transition-transform duration-200" />
                                                            <span className="text-sm font-medium text-slate-700">{project}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-slate-900">
                                            <h4 className="font-black text-xs uppercase tracking-[0.15em] text-amber-400 mb-5">
                                                Future Careers
                                            </h4>
                                            <div className="flex flex-wrap gap-2.5">
                                                {pilihan.careers?.map((career: string, index: number) => (
                                                    <span key={index} className="px-4 py-2 bg-white/10 hover:bg-amber-500/20 rounded-full text-sm font-semibold text-white border border-white/10 hover:border-amber-500/30 transition-all duration-200 cursor-pointer press">
                                                        {career}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!pilihan && (
                                <div className="py-20 text-center border-2 border-dashed border-amber-200/40 rounded-3xl bg-white/50">
                                    <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300">
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

            <footer className="text-slate-400 border-t border-slate-800" style={{ background: 'linear-gradient(to bottom right, #0f172a, #020617)' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-500 to-yellow-400 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-amber-500/20">
                                SB
                            </div>
                            <span className="font-extrabold text-lg text-white">
                                Skill<span className="text-amber-400">Bridge</span>
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
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
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