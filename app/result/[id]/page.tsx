'use client'

import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Link from 'next/link'

interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}

interface Vocation {
    ID: number;
    uuid: string;
    name: string;
    icon: string;
    description: string;
    skills: string[];
    projects: string[];
    careers: string[];
    colors: Colors;
}

interface ResultData {
    username: string;
    completed_date: string;
    vocation: Vocation;
}

const dummyData: ResultData = {
    username: "Adzan",
    completed_date: "29 April 2026",
    vocation: {
        ID: 1,
        uuid: "RPL",
        name: "Rekayasa Perangkat Lunak (RPL)",
        icon: "bi-code-slash",
        description: "Jurusan ini adalah pusat penciptaan aplikasi dan sistem digital. Jika kamu penasaran bagaimana cara membuat website seperti Tokopedia, aplikasi seperti Gojek, atau bahkan game mobile, di sinilah tempatnya. Kamu akan belajar logika pemrograman, cara menulis kode (coding) yang rapi, mengelola database, dan membangun antarmuka aplikasi yang ramah pengguna.",
        skills: [
            "Next.js & React",
            "AI API Integration",
            "TypeScript",
            "Cloud-Native Dev",
            "Database Design & SQL"
        ],
        projects: [
            "Web Portfolio Interaktif",
            "Sistem Kasir Berbasis Cloud",
            "Game 2D/3D Unity",
            "Aplikasi Manajemen Tugas Kolaboratif",
            "Chatbot Layanan Pelanggan AI"
        ],
        careers: [
            "AI Software Engineer",
            "Fullstack Web Developer",
            "DevOps Engineer",
            "Blockchain Developer",
            "Mobile App Developer (Flutter/React Native)"
        ],
        colors: {
            base_color: "#1E3A8A",
            primary_color: "#0F172A",
            secondary_color: "#3B82F6",
            subtle_color: "#EFF6FF"
        }
    }
}

const ResultPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const data = dummyData

    useEffect(() => {
        Aos.init({ duration: 700, once: true, easing: 'ease-out' })
    }, [])

    const { vocation } = data
    const c = vocation.colors

    return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: '#f8fafc' }}>

            <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.07]"
                    style={{ backgroundColor: c.base_color, transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
                    style={{ backgroundColor: c.secondary_color, transform: 'translate(-30%, 30%)' }} />
            </div>

            <header className="pt-8 pb-4 px-4">
                <div className="max-w-[620px] mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                        <i className="bi bi-arrow-left"></i>
                        Kembali ke Beranda
                    </Link>
                </div>
            </header>

            <main className="px-4 pb-24">
                <div className="max-w-[620px] mx-auto">

                    <section className="text-center mb-12" data-aos="fade-up">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                            style={{ backgroundColor: c.subtle_color }}>
                            <i className="bi bi-trophy-fill text-4xl" style={{ color: c.base_color }}></i>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-[-0.03em] text-slate-900 mb-3">
                            Selamat, <span style={{ color: c.base_color }}>{data.username}</span>!
                        </h1>
                        <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
                            Hasil asesmenmu telah siap. Berikut jurusan yang paling cocok untukmu.
                        </p>
                        <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-medium text-slate-500"
                            style={{ backgroundColor: c.subtle_color }}>
                            <i className="bi bi-calendar3" style={{ color: c.secondary_color }}></i>
                            Diselesaikan {data.completed_date}
                        </div>
                    </section>

                    <div className="rounded-[22px] overflow-hidden shadow-xl" data-aos="fade-up" data-aos-delay={80}
                        style={{ boxShadow: `0 24px 60px -12px ${c.base_color}20` }}>

                        <div className="p-8 md:p-10 relative overflow-hidden" style={{ backgroundColor: c.base_color }}>
                            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[60px] opacity-20"
                                style={{ backgroundColor: c.secondary_color, transform: 'translate(30%, -40%)' }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl"
                                        style={{ backgroundColor: `${c.secondary_color}30` }}>
                                        <i className={`bi ${vocation.icon}`}></i>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-widest"
                                            style={{ color: c.secondary_color }}>
                                            Jurusan Rekomendasi
                                        </p>
                                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                            {vocation.name}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-10" style={{ backgroundColor: c.subtle_color }}>
                            <p className="text-slate-600 leading-relaxed text-[15px]">
                                {vocation.description}
                            </p>
                        </div>

                        <div className="bg-white">

                            <div className="p-8 md:p-10 border-b border-slate-100" data-aos="fade-up" data-aos-delay={120}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: c.subtle_color }}>
                                        <i className="bi bi-lightning-charge-fill text-lg" style={{ color: c.secondary_color }}></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Skill yang Dipelajari</h3>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {vocation.skills.map((skill, i) => (
                                        <span key={i}
                                            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.04] cursor-default"
                                            style={{
                                                backgroundColor: c.subtle_color,
                                                color: c.base_color,
                                                border: `1.5px solid ${c.secondary_color}25`
                                            }}
                                            data-aos="zoom-in" data-aos-delay={140 + i * 60}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 md:p-10 border-b border-slate-100" data-aos="fade-up" data-aos-delay={160}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: c.subtle_color }}>
                                        <i className="bi bi-folder-fill text-lg" style={{ color: c.secondary_color }}></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Proyek yang Mungkin Ditemui</h3>
                                </div>
                                <div className="space-y-3">
                                    {vocation.projects.map((project, i) => (
                                        <div key={i}
                                            className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-md group"
                                            style={{ backgroundColor: '#fafbfc' }}
                                            data-aos="fade-right" data-aos-delay={180 + i * 50}>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                                style={{ backgroundColor: `${c.secondary_color}15` }}>
                                                <i className="bi bi-box-fill text-sm" style={{ color: c.secondary_color }}></i>
                                            </div>
                                            <span className="text-slate-700 font-medium text-[15px]">{project}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 md:p-10" data-aos="fade-up" data-aos-delay={200}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: c.subtle_color }}>
                                        <i className="bi bi-rocket-takeoff-fill text-lg" style={{ color: c.secondary_color }}></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Karier Masa Depan</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {vocation.careers.map((career, i) => (
                                        <div key={i}
                                            className="flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default"
                                            style={{ borderColor: `${c.secondary_color}20`, backgroundColor: 'white' }}
                                            data-aos="fade-up" data-aos-delay={220 + i * 50}>
                                            <i className="bi bi-arrow-up-right text-sm font-bold" style={{ color: c.secondary_color }}></i>
                                            <span className="text-slate-700 font-medium text-[15px]">{career}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-10" data-aos="fade-up" data-aos-delay={260}>
                        <Link href="/#explore"
                            className="flex-1 py-4 rounded-2xl font-bold text-center transition-all duration-300 active:scale-[0.97]"
                            style={{
                                color: c.base_color,
                                border: `2px solid ${c.base_color}25`,
                                backgroundColor: 'white'
                            }}>
                            <i className="bi bi-grid-3x3-gap-fill mr-2"></i>
                            Lihat Jurusan Lain
                        </Link>
                        <Link href="/questions"
                            className="flex-1 py-4 rounded-2xl font-bold text-white text-center transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] shadow-lg"
                            style={{
                                backgroundColor: c.base_color,
                                boxShadow: `0 8px 24px -4px ${c.base_color}40`
                            }}>
                            <i className="bi bi-arrow-repeat mr-2"></i>
                            Mulai Asesmen Ulang
                        </Link>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-8">
                        SkillBridge &middot; IOFest 2026 &middot; Human Capital & Future Skills
                    </p>

                </div>
            </main>
        </div>
    )
}

export default ResultPage