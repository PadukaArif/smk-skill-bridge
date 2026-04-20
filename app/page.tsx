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
        <main>
            <section className=" p-4 m-8 rounded-xl shadow-xl w-[40dvw]">
                <p className=" text-2xl">Lihat Informasi Jurusan</p>
                <select name="" id="" className=" p-2 rounded-lg border shadow-sm" onChange={(e) => handlePilihan(e)}>
                    <option defaultValue={"default"} hidden>Pilih Jurusan</option>
                    {jurusan.map((a) => {
                        return (
                            <option value={a.ID}>{a.uuid}</option>
                        )
                    })}
                </select>
                {pilihan && (
                    <div className=" p-4 rounded-3xl shadow border mt-4 columns-2"
                        style={{ backgroundColor: pilihan.colors.subtle_color, borderColor: pilihan.colors.primary_color }}>
                        <div className=" bg-neutral-50 p-2 rounded-xl border mb-4" style={{ borderColor: pilihan.colors.primary_color }}>
                            <p className=" font-semibold text-xl" style={{ color: pilihan.colors.primary_color }}>Deskripsi {pilihan.name}:</p>
                            <p className=" font-extralight">{pilihan.description}</p>
                        </div>
                        <div className=" bg-neutral-50 p-2 rounded-xl border mb-4" style={{ borderColor: pilihan.colors.primary_color }}>
                            <p className=" font-semibold text-xl" style={{ color: pilihan.colors.primary_color }}>Skill di jurusan {pilihan.name}:</p>
                            <ul className=" p-4">
                                {pilihan.skills?.map((skill: string, index: number) => (
                                    <li key={index}>
                                        <i className="bi bi-circle-fill me-2 text-xs" style={{ color: pilihan.colors.primary_color }}></i>
                                        <input type="text" value={skill} className=" p-2 rounded-xl shadow mt-1 border"
                                            disabled style={{ borderColor: pilihan.colors.primary_color }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className=" bg-neutral-50 p-2 rounded-xl border mb-4" style={{ borderColor: pilihan.colors.primary_color }}>
                            <p className=" font-semibold text-xl" style={{ color: pilihan.colors.primary_color }}>Projek di {pilihan.name}:</p>
                            <ul className=" p-4">
                                {pilihan.projects?.map((skill: string, index: number) => (
                                    <li key={index}>
                                        <i className="bi bi-circle-fill me-2 text-xs" style={{ color: pilihan.colors.primary_color }}></i>
                                        <input type="text" value={skill} className=" p-2 rounded-xl shadow mt-1 border"
                                            disabled style={{ borderColor: pilihan.colors.primary_color }} />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className=" bg-neutral-50 p-2 rounded-xl border mb-4" style={{ borderColor: pilihan.colors.primary_color }}>
                            <p className=" font-semibold text-xl" style={{color:pilihan.colors.primary_color}}>Career di {pilihan.name}:</p>
                            <ul className=" p-4">
                                {pilihan.careers?.map((skill: string, index: number) => (
                                    <li key={index}>
                                        <i className="bi bi-circle-fill me-2 text-xs" style={{ color: pilihan.colors.primary_color }}></i>
                                        <input type="text" value={skill} className=" p-2 rounded-xl shadow mt-1 border"
                                            disabled style={{ borderColor: pilihan.colors.primary_color }} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}