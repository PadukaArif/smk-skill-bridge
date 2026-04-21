'use client'

import React, {useState, useEffect} from "react"
import axios from "axios"

export interface Data {
    id:     number;
    name:   string;
    skills: string[];
}

const DKV = 'Desain Komunikasi Visual'
const DPIB = 'Desain Permodelan Informasi dan Bangunan'

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
        <>
          <header>
            <nav className="flex justify-between items-center gap-4 px-8 py-4 border-b">
              <h2 className="text-2xl tracking-tighter bg-gradient-to-r from-blue-600 to-emerald-400 bg-clip-text text-transparent font-bold">I/O fest</h2>
              <ul className="flex gap-10">
                <li>
                  <a href="#hero" className="font-semibold text-gray-400 hover:text-io-accent transition-colors">Beranda</a>
                </li>
                <li>
                  <a href="#jurusan" className="font-semibold text-gray-400 hover:text-io-accent transition-colors">Jurusan</a>
                </li>
              </ul>
            </nav>
          </header>
    
          <main className="max-w-4xl mx-auto mt-16 px-6">
            <section id="hero" className="layar-sapaan">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter my-3 text-center hover:drop-shadow-lg transition-all duration-400">Ukur Kesiapan <span className="text-blue-600 hover:text-blue-400 transition-all bg-gradient-to-r from-blue-600 to-emerald-400 bg-clip-text text-transparent">Skill Lo!</span></h1>
              <p className="text-xl text-gray-500 text-center  max-w-2xl mx-auto leading-relaxed">Ini biar lo semua tau perjuangan kita!</p>
              <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                <input type="text" placeholder="Ketik nama lu..." className="w-full md:w-96 px-6 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-sm text-gray-700" />
                <button className="px-8 py-4 mt-4 md:mt-0 md:ml-4 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 active:bg-emerald-900 active:scale-95 hover:scale-105 transition-all shadow-lg shadow-emerald-600/40">Mulai Ujian</button>
              </div>
            </section>
    
            <section id="jurusan" className="mt-24 mb-20">
              <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12 hover:scale-105 transition-all">5 Jurusan Didukung</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">`
                <li className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg` hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2 hover:border-blue-200">
                  <span className="block text-2xl font-black text-emerald-600 mb-2">TKJ</span>
                  <span className="text-gray-500 font-medium">Teknik Komputer dan Jaringan</span>
                </li>
                <li className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2 hover:border-blue-200 "><span className="block text-2xl font-black text-purple-600 mb-2">DKV</span><span className="text-gray-500 font-medium">{DKV}</span></li>
                <li className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2 hover:border-blue-200 "><span className="block text-2xl font-black text-orange-600 mb-2">DPIB</span> <span className="text-gray-500 font-medium">{DPIB}</span></li>
                <li className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2 hover:border-blue-200 "><span className="block text-2xl font-black text-red-600 mb-2">TITL</span> <span className="text-gray-500 font-medium">Teknik Instalasi Tenaga Listrik</span></li>
                <li className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-2 hover:border-blue-200 "><span className="block text-2xl font-black text-blue-600 mb-2">RPL</span> <span className="text-gray-500 font-medium">Rekayasa Perangkat Lunak</span></li>
              </ul>
            </section>
          </main>``
    
          <footer className="border-t border-gray-400 py-4 mt-4 ">
            <div className="flex justify-between items-center flex-col md:flex-row pl-4">
            <p>&copy; 2026 Tim Dedy, Arif, & Adzan</p>
            </div>
          </footer>
        </>
      )
}