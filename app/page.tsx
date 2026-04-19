'use client'

import React, {useState, useEffect} from "react"
import axios from "axios"

export interface Data {
    id:     number;
    name:   string;
    skills: string[];
}
export default function Home() {
    const [jurusan, setJurusan] = useState <Data[]>([])
    const [pilihan, setPilihan] = useState <Data>();

    useEffect (() => {
        axios.get<Data[]>('/majors.json')
        .then ((hasil) => {
            setJurusan(hasil.data)
        })
    }, [])


return (
    <div>
        <h1>Daftar Jurusan SMK 1 Jakarta</h1>

        <ul>
            {jurusan.map((item : any) => (
                <li key={item.id} onClick={() => setPilihan (item)} style={{cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '5px 0'}}>
                    {item.name} (Klik buat liat skill)
                </li>
            ))}
        </ul>
        <hr />

        {pilihan && (
            <div>
                <h2>Skill di jurusan {pilihan.name}:</h2>
                <ul>
                    {pilihan.skills?.map((skill: string, index: number) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
)
}