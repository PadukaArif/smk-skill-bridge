import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Vocation from './Vocation';

import 'aos/dist/aos.css'
import Aos from 'aos';

interface TopLevel{
    status:boolean
    data:Data[]
}

export interface Data {
    ID: number;
    icon: string;
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
    const [select, setSelect] = useState<boolean>(false)

    useEffect(() => {
        Aos.init()
        axios.get<TopLevel>('/api/vocations')
            .then((data) => {
                const fetched = data.data
                setJurusan(fetched.data)
                console.log(fetched.data)
                Aos.refresh()
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
        <main className=' bg-linear-to-t from-amber-200 to-neutral-50 w-full min-h-[50dvh] flex justify-center items-center font-sans pt-[10dvh]'
            style={{ paddingTop: "24dvh", paddingBottom: "24dvh" }}>
            <section className=' flex flex-col gap-4 items-center justify-center duration-500' data-aos="fade-up">
                <div className=" p-2 px-8 bg-amber-100 text-amber-600 border border-amber-400 shadow rounded-4xl text-xs font-semibold cursor-pointer">
                    <i className="bi bi-info-circle me-2"></i>
                    <span>Eksplorasi jurusan</span>
                </div>
                <div className=" flex items-center justify-center flex-col" data-aos="fade-up" data-aos-delay={100}>
                    <p className=' m-0 text-2xl font-bold lg:text-4xl'>Temukan Jalur</p>
                    <p className=' m-0 text-3xl font-bold text-amber-500 lg:text-6xl'>Kompetensimu</p>
                    <p className=' text-neutral-800 font-light max-w-[72dvw] p-1 text-xs text-center lg:text-base lg:max-w-[42dvw]'>
                        Pilih jurusan untuk melihat detail keahlian, contoh projek, dan peluang karir masa depan
                    </p>
                </div>
                <br />
                <select name="" id="explore" className=' p-4 rounded-2xl bg-neutral-50 shadow w-fit outline-0' onChange={(e) => handlePilihan(e)}
                    data-aos="fade-up" data-aos-delay={300}>
                    <option defaultValue={"value"} hidden>Pilih Jurusan</option>
                    {jurusan.map((a) => {
                        return (
                            <option value={a.ID} key={a.ID}>{a.name}</option>
                        )
                    })}
                </select>
                <div className="" data-aos="fade-up" data-aos-delay={300}>
                    <Vocation isSelect={select} data={pilihan} />
                </div>
            </section>
        </main>
    )
}

export default HomeElem;