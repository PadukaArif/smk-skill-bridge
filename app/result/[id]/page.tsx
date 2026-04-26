'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Aos from 'aos'
import 'aos/dist/aos.css'

interface MajorData {
    ID: number; uuid: string; name: string; description: string
    skills: string[]; projects: string[]; careers: string[]
    colors: { base_color: string; primary_color: string; secondary_color: string; subtle_color: string }
}

export default function ResultPage() {
    const { id } = useParams() as { id: string }
    const router = useRouter()
    const [major, setMajor] = useState<MajorData | null>(null)
    const [score, setScore] = useState(0)
    const [username, setUsername] = useState('')

    useEffect(() => {
        Aos.init({ duration: 800, once: true })

        fetch('/majors.json').then(r => r.json()).then((majors: MajorData[]) => {
            const name = localStorage.getItem('username') || id || 'Siswa'
            setUsername(name)

            const saved = localStorage.getItem('jawaban_kuis_lengkap')
            if (!saved) { setMajor(majors[0]); setScore(85); return }

            const answers: Record<string, number> = JSON.parse(saved)
            const counts: Record<number, number> = {}
            Object.values(answers).forEach(v => counts[v] = (counts[v] || 0) + 1)

            let topId = 1, max = 0
            Object.entries(counts).forEach(([k, v]) => { if (v > max) { max = v; topId = Number(k) } })

            setScore(Math.round((max / Object.keys(answers).length) * 100))
            setMajor(majors.find(m => m.ID === topId) || majors[0])
        })
    }, [id])

    if (!major) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    const c = major.colors

    return (
        <main className="min-h-screen bg-neutral-50 font-sans p-4 sm:p-8">
            <div className="max-w-3xl mx-auto flex flex-col gap-6">

                {/* Hero */}
                <section className="bg-white rounded-3xl shadow-lg p-8 text-center" data-aos="fade-up">
                    <div className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4"
                        style={{ backgroundColor: c.subtle_color, color: c.base_color }}>
                        <i className="bi bi-patch-check-fill me-1" /> Asesmen Selesai
                    </div>
                    <p className="text-neutral-500 text-sm mb-1">Selamat, <span className="font-semibold text-neutral-700">{username}</span></p>
                    <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-1" style={{ color: c.primary_color }}>{major.name}</h1>
                    <p className="text-neutral-400 text-xs mt-2">
                        <i className="bi bi-calendar3 me-1" />
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </section>

                <section className="bg-white rounded-3xl shadow p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6" data-aos="fade-up">
                    <div className="flex-shrink-0 w-28 h-28 rounded-full border-[6px] flex items-center justify-center"
                        style={{ borderColor: c.base_color }}>
                        <span className="text-2xl font-bold font-mono" style={{ color: c.base_color }}>{score}%</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2" style={{ color: c.primary_color }}>
                            <i className="bi bi-info-circle me-2" />Tentang Jurusan
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">{major.description}</p>
                    </div>
                </section>

                <section className="bg-white rounded-3xl shadow p-6" data-aos="fade-up">
                    <h3 className="font-semibold text-lg mb-4" style={{ color: c.primary_color }}>
                        <i className="bi bi-lightning-charge-fill me-2" />Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {major.skills.map(s => (
                            <span key={s} className="px-4 py-2 rounded-xl text-sm font-medium"
                                style={{ backgroundColor: c.subtle_color, color: c.base_color }}>
                                {s}
                            </span>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <section className="bg-white rounded-3xl shadow p-6" data-aos="fade-up">
                        <h3 className="font-semibold text-lg mb-4 text-amber-500">
                            <i className="bi bi-folder-fill me-2" />Projek
                        </h3>
                        <div className="flex flex-col gap-2">
                            {major.projects.map(p => (
                                <div key={p} className="p-3 rounded-xl bg-neutral-50 text-sm">
                                    <i className="bi bi-circle-fill text-amber-400 text-[8px] me-3" />{p}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl shadow p-6" data-aos="fade-up">
                        <h3 className="font-semibold text-lg mb-4" style={{ color: c.base_color }}>
                            <i className="bi bi-rocket-takeoff-fill me-2" />Karir
                        </h3>
                        <div className="flex flex-col gap-2">
                            {major.careers.map(cr => (
                                <div key={cr} className="p-3 rounded-xl bg-neutral-50 text-sm">
                                    <i className="bi bi-circle-fill text-[8px] me-3" style={{ color: c.secondary_color }} />{cr}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="flex flex-col sm:flex-row gap-3 justify-center" data-aos="fade-up">
                    <button onClick={() => window.print()}
                        className="px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer"
                        style={{ backgroundColor: c.base_color }}>
                        <i className="bi bi-printer-fill me-2" />Cetak Hasil
                    </button>
                    <button onClick={() => router.push('/')}
                        className="px-6 py-3 rounded-xl font-semibold text-sm border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-all active:scale-95 cursor-pointer">
                        <i className="bi bi-house-door me-2" />Kembali ke Dashboard
                    </button>
                </section>

                <p className="text-center text-neutral-300 text-xs pb-4">SkillBridge &copy; {new Date().getFullYear()}</p>
            </div>
        </main>
    )
}