'use client'

import React, {useState, useEffect} from "react"
import axios from "axios"

export interface Data {
    ID:          number;
    uuid:        string;
    name:        string;
    description: string;
    skills:      string[];
    projects:    string[];
    careers:     string[];
    colors:      Colors;
}

export interface Colors {
    base_color:      string;
    primary_color:   string;
    secondary_color: string;
    subtle_color:    string;
}



export default function Home() {
    const [jurusan, setJurusan] = useState <Data[]>([])
    const [pilihan, setPilihan] = useState <Data>();
    const [projects, setProjects] = useState <Data>();

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
                <li key={item.ID} onClick={() => setPilihan (item)} style={{cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '5px 0'}}>
                    {item.name} (Klik buat liat skill)
                </li>
            ))}
        </ul>
        <hr />

        {pilihan && (
            <div className={``} style={{backgroundColor:pilihan.colors.secondary_color}}>
                <h2>Deskripsi {pilihan.name}:</h2>
                <ul>
                        <li>{pilihan.description}</li>
                </ul>
                <br />
                <h2>Skill di jurusan {pilihan.name}:</h2>
                <ul>
                    {pilihan.skills?.map((skill: string, index: number) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
                <br />
                <h2>Projek di {pilihan.name}:</h2>
                <ul>
                    {pilihan.projects.map((proyek: string, index: number) => (
                        <li key={index}>{proyek}</li>
                    ))}
                </ul>
                <br />
                 <h2>Career di {pilihan.name}:</h2>
                <ul>
                    {pilihan.careers.map((karir: string, index: number) => (
                        <li key={index}>{karir}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
)
}