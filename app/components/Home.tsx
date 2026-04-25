import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Vocation from './Vocation';

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

const HomeElem = () => {
    const [jurusan, setJurusan] = useState<Data[]>([])
    const [pilihan, setPilihan] = useState<Data | null>(null)
    const [select , setSelect] = useState<boolean>(false)

    useEffect(() => {
        axios.get<Data[]>('/majors.json')
            .then((hasil) => {
                setJurusan(hasil.data)
            })
    }, [])

    const handlePilihan = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const dataTerpilih = jurusan.find(j => j.ID === selectedId);
        
        if (dataTerpilih) {
            setPilihan(dataTerpilih);
            setSelect(true);
        }
    }

    return (
        <main className='bg-linear-to-t from-amber-200 to-neutral-50 w-full min-h-[50dvh] flex justify-center items-center font-sans pt-[10dvh]'>
            <section className='flex flex-col gap-4 items-center justify-center'>
                
                <div className="p-4 px-8 bg-amber-100 text-amber-600 border border-amber-400 shadow rounded-4xl text-xs font-semibold cursor-pointer">
                    Eksplorasi jurusan
                </div>
                
                <p className='m-0 text-4xl font-bold'>Temukan Jalur</p>
                <p className='m-0 text-6xl font-bold text-amber-500'>Kompetensimu</p>
                
                <p className='text-neutral-800 font-light max-w-[42dvw] p-1 text-center'>
                    Pilih jurusan untuk melihat detail skill, jurusan, projek dan peluang karir masa depan
                </p>
                <br />

                <select 
                    name="pilih-jurusan" 
                    id="pilih-jurusan" 
                    className='p-4 rounded-2xl bg-neutral-50 shadow w-[24dvw] outline-0' 
                    onChange={(e) => handlePilihan(e)}
                    defaultValue=""
                > 
                    <option value="" disabled hidden>Pilih Jurusan</option>
                    
                    {jurusan.map((a) => {
                        return (
                            <option value={a.ID} key={a.ID}>
                                {a.uuid}
                            </option>
                        )
                    })}
                </select>

                <Vocation isSelect={select} data={pilihan}/>
            </section>
        </main>
    )
}

export default HomeElem;