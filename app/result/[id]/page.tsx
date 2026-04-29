'use client'
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import Primarybox from "@/app/components/Primarybox";
import Aos from "aos";
import axios from "axios";
import Lenis from "lenis";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Data {
    status: string;
    data: DataData;
}

export interface DataData {
    result: { [key: string]: number };
    _id: string;
    username: string;
    total: number;
    match: DataMatch;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface DataMatch {
    match: MatchMatch;
}

export interface MatchMatch {
    vocation: string;
    count: number;
    data: MatchData;
}

export interface MatchData {
    ID: number;
    uuid: string;
    name: string;
    description: string;
    skills: string[];
    projects: string[];
    careers: string[];
    colors: Colors;
    icon: "string";
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}


const Page = () => {
    const params = useParams()
    const id = params.id
    const [user, setUser] = useState<Data>()

    useEffect(() => {
        Aos.init()
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.1,
            smoothWheel: true,
            duration: 1.5
        })
        axios.get(`/api/results/${id}`)
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                setUser(fetched)
            })
        lenis.start()
    }, [id])
    return (
        <>
        <Navbar isGlass={true}/>
            <main className=" h-full w-full flex items-center mx-auto font-sans justify-center" style={{ paddingTop: "24dvh", paddingBottom: "24dvh", width: "56dvw" }}>
                {user && (
                    <section className="w-[64%]">
                        <div>
                            <p className=" text-xl ml-1 text-start font-semibold text-neutral-400">Hasil Asesmen</p>
                            <p className=" text-6xl text-start font-semibold">Halo, <span className=" text-amber-400 font-semibold font-mono">
                                {user.data.username}</span> ! 👋</p>
                            <br />
                            <p className=" text-neutral-600 w-[64%]">Berdasarkan minat dan tes yang kamu lalui, kami telah menemukan jalur yang paling selaras dengan potensi dirimu</p>
                            <br />
                            <Primarybox colors={user.data.match.match.data.colors} outline={false}>
                                <i className="bi bi-calendar3 me-4"></i>
                                <span className=" text-lg">
                                    Diselesaikan pada {new Date(user.data.createdAt).toLocaleDateString("id-ID", {
                                        month: "long",
                                        weekday: "long",
                                        day: "2-digit"
                                    })}
                                </span>
                            </Primarybox>
                            <br />
                            <div className=" p-6 rounded-4xl shadow my-4 overflow-hidden relative">
                                <div className="py-2 rounded-full bg-green-200 text-green-800 w-fit text-sm pe-4 flex justify-center items-center pl-4">
                                    <i className="bi bi-info-circle me-2"></i>
                                    <span>Rekomendasi Utama</span>
                                </div>
                                <br />
                                <div className=" p-2">
                                    <section className=" flex items-center gap-2">
                                        <div className="p-2 px-3 rounded-full bg-blue-800 text-white w-fit text-xl">
                                            <i className={`bi ${user.data.match.match.data.icon}`}></i>
                                        </div>
                                        <p className=" font-bold text-xl">{user.data.match.match.data.name}</p>
                                    </section>
                                    <p className=" italic text-justify mt-8 text-neutral-600">{user.data.match.match.data.description}</p>
                                </div>
                                <section className=" p-2 mt-4">
                                    <div className=" flex gap-4 items-center ">
                                        <div className="p-2 px-3 rounded-full w-fit text-xl"
                                            style={{ backgroundColor: user.data.match.match.data.colors.subtle_color, color: user.data.match.match.data.colors.base_color }}>
                                            <i className="bi bi-lightning-fill"></i>
                                        </div>
                                        <span className=" text-lg font-semibold">Skill yang akan dipelajari</span>
                                    </div>
                                    <br />
                                    <div className=" flex flex-wrap gap-3">
                                        {user.data.match.match.data.skills.map((a, index) => {
                                            return (
                                                <Primarybox colors={user.data.match.match.data.colors} key={index}
                                                    outline={false}>
                                                    <p>
                                                        <i className="bi bi-info-circle-fill me-4"></i>
                                                        <span>{a}</span>
                                                    </p>
                                                </Primarybox>
                                            )
                                        })}
                                    </div>
                                </section>
                                <section className=" p-2 mt-4">
                                    <div className=" flex gap-4 items-center ">
                                        <div className="p-2 px-3 rounded-full w-fit text-xl"
                                            style={{ backgroundColor: user.data.match.match.data.colors.subtle_color, color: user.data.match.match.data.colors.base_color }}>
                                            <i className="bi bi-folder-fill"></i>
                                        </div>
                                        <span className=" text-lg font-semibold">Proyek yang akan ditemui</span>
                                    </div>
                                    <br />
                                    <div className=" flex flex-col gap-2">
                                        {user.data.match.match.data.projects.map((a, index) => {
                                            return (
                                                <Primarybox colors={user.data.match.match.data.colors} key={index} outline={false}>
                                                    <p>
                                                        <i className="bi bi-box-fill me-4"></i>
                                                        <span>{a}</span>
                                                    </p>
                                                </Primarybox>
                                            )
                                        })}
                                    </div>
                                </section>
                                <br />
                                <hr className="opacity-15 " />
                                <br />
                                <section className=" p-2">
                                    <div className=" flex gap-4 items-center ">
                                        <div className="p-2 px-3 rounded-full w-fit text-xl"
                                            style={{ backgroundColor: user.data.match.match.data.colors.subtle_color, color: user.data.match.match.data.colors.base_color }}>
                                            <i className="bi bi-patch-check-fill"></i>
                                        </div>
                                        <span className=" text-lg font-semibold">Karir masa depan</span>
                                    </div>
                                    <br />
                                    <div className=" flex flex-wrap gap-2">
                                        {user.data.match.match.data.projects.map((a, index) => {
                                            return (
                                                <Primarybox colors={user.data.match.match.data.colors} key={index}
                                                    outline={true}>
                                                    <p>
                                                        <i className="bi bi-arrow-up-right me-4"></i>
                                                        <span>{a}</span>
                                                    </p>
                                                </Primarybox>
                                            )
                                        })}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    )
}

export default Page