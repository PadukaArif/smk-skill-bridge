'use client'

import axios from 'axios';
import { Numans } from 'next/font/google';
import React, { useEffect, useRef, useState } from 'react'
import Questions from '../components/Questions';

export interface Data {
    test_title: string;
    total_questions: number;
    questions: Question[];
}

export interface Question {
    no: number;
    question: string;
    options: Option[];
}

export interface Option {
    id_jurusan: number;
    text: string;
}

export interface Answer {
    jumlahPilihan1: number
    jumlahPilihan2: number
    jumlahPilihan3: number
    jumlahPilihan4: number
    jumlahPilihan5: number
}

const page = () => {
    const [dataQuestion, setData] = useState<Data>()
    const [numAnswer1, setAnswer1] = useState<number>(0)
    const [numAnswer2, setAnswer2] = useState<number>(0)
    const [numAnswer3, setAnswer3] = useState<number>(0)
    const [numAnswer4, setAnswer4] = useState<number>(0)
    const [numAnswer5, setAnswer5] = useState<number>(0)
    useEffect(() => {
        axios.get('/questions.json')
            .then(data => {
                const fetched = data.data
                setData(fetched)
            })
    })
    const setAnswerArray = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (numAnswer1>=0 && numAnswer2>=0 && numAnswer3>=0 && numAnswer4>=0 && numAnswer5>=0) {
            if (e.target.selectedIndex == 1) {
                setAnswer1(numAnswer1 + 1)
            } else if (e.target.selectedIndex == 2) {
                setAnswer2(numAnswer2 + 1)
            } else if (e.target.selectedIndex == 3) {
                setAnswer3(numAnswer3 + 1)
            } else if (e.target.selectedIndex == 4) {
                setAnswer4(numAnswer4 + 1)
            } else if (e.target.selectedIndex == 5) {
                setAnswer5(numAnswer5 + 1)
            }
        }
    }
    return (
        <main className=' p-8 bg-white text-neutral-800 w-[75dvw] rounded-4xl shadow-2xl m-8 mx-auto'>
            <div className=" mb-4">
                <p className=' m-0 font-semibold text-6xl'>Hallo</p>
                <p className=' font-light text-neutral-500'>Selamat datang di halaman pertanyaan</p>
            </div>
            <section className=' flex flex-col gap-4 justify-content-center align-items-center'>
                {!dataQuestion && (
                    <p>Memuat Pertanyaan...</p>
                )}
                {dataQuestion?.questions.map((a) => {
                    return (
                        <Questions data={a} func={setAnswerArray}/>
                    )
                })}
            </section>
            <section className=' p-4 rounded-xl shadow border mt-4 w-fit'>
                <p className=' font-semibold'>Previwe jawaban</p>
                <ul>
                    <li className=' font-light'>PIlihan Jawaban Jurusan RPL : <span className=' font-semibold'>{numAnswer1}</span></li>
                    <li className=' font-light'>PIlihan Jawaban Jurusan DKV : <span className=' font-semibold'>{numAnswer2}</span></li>
                    <li className=' font-light'>PIlihan Jawaban Jurusan MM : <span className=' font-semibold'>{numAnswer3}</span></li>
                    <li className=' font-light'>PIlihan Jawaban Jurusan TKJ : <span className=' font-semibold'>{numAnswer4}</span></li>
                    <li className=' font-light'>PIlihan Jawaban Jurusan SIJA : <span className=' font-semibold'>{numAnswer5}</span></li>
                </ul>
            </section>
        </main>
    )
}

export default page