'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

const Page = () => {
    const [dataQuestion, setData] = useState<Data>();
    const [username, setUsername] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [answersDict, setAnswersDict] = useState<{ [key: number]: number }>({});

    const [numAnswer1, setAnswer1] = useState<number>(0);
    const [numAnswer2, setAnswer2] = useState<number>(0);
    const [numAnswer3, setAnswer3] = useState<number>(0);
    const [numAnswer4, setAnswer4] = useState<number>(0);
    const [numAnswer5, setAnswer5] = useState<number>(0);

    useEffect(() => {
        const savedName = localStorage.getItem("username");
        if (savedName) setUsername(savedName);

        const savedAns = localStorage.getItem('jawaban_kuis_lengkap');
        if (savedAns) {
            setAnswersDict(JSON.parse(savedAns));
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify(answersDict));

        let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;

        Object.values(answersDict).forEach(val => {
            if (val === 1) c1++;
            else if (val === 2) c2++;
            else if (val === 3) c3++;
            else if (val === 4) c4++;
            else if (val === 5) c5++;
        });

        setAnswer1(c1); setAnswer2(c2); setAnswer3(c3); setAnswer4(c4); setAnswer5(c5);

    }, [answersDict, isLoaded]);

    useEffect(() => {
        axios.get('/questions.json')
            .then(response => setData(response.data))
            .catch(error => console.error("Gagal memuat soal:", error));
    }, []);

    const setAnswerArray = (e: React.ChangeEvent<HTMLSelectElement>, questionNo: number) => {
        const selectedIndex = parseInt(e.target.value);

        setAnswersDict(prev => ({
            ...prev,
            [questionNo]: selectedIndex
        }));
    };

    const handleReset = () => {
    setAnswersDict({}); 

    localStorage.removeItem('jawaban_kuis_lengkap');
    localStorage.removeItem('question-progress');

    window.location.reload();
};

    return (
        <main className='p-8 bg-white text-neutral-800 w-[75dvw] rounded-4xl shadow-2xl m-8 mx-auto font-sans'>
            <div className="mb-6">
                <p className='mb-2 font-semibold text-6xl tracking-tight'>Hallo {username}</p> 
                <p className='font-light text-neutral-500 text-lg'>Selamat datang di halaman pertanyaan</p>
            </div>

            <section className='flex flex-col gap-4 justify-content-center align-items-center'>
                {!dataQuestion && <p>Memuat Pertanyaan...</p>}

                {dataQuestion?.questions.map((a) => {
                    return (
                        <Questions
                            data={a}
                            func={setAnswerArray}
                            selectedAnswer={answersDict[a.no]}
                            key={a.no}
                        />
                    )
                })}
            </section>

            <section className='p-4 rounded-xl shadow border mt-4 w-fit'>
                <p className='font-semibold'>Preview jawaban</p>
                <ul>
                    <li className='font-light'>Pilihan Jawaban Jurusan RPL : <span className='font-semibold'>{numAnswer1}</span></li>
                    <li className='font-light'>Pilihan Jawaban Jurusan DKV : <span className='font-semibold'>{numAnswer2}</span></li>
                    <li className='font-light'>Pilihan Jawaban Jurusan MM : <span className='font-semibold'>{numAnswer3}</span></li>
                    <li className='font-light'>Pilihan Jawaban Jurusan TKJ : <span className='font-semibold'>{numAnswer4}</span></li>
                    <li className='font-light'>Pilihan Jawaban Jurusan SIJA : <span className='font-semibold'>{numAnswer5}</span></li>
                </ul>
                <button 
                    onClick={handleReset}
                    className="mt-6 px-6 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-500/30"
                >
                    Reset Semua Jawaban
                </button>
            </section>
        </main>
        
        
    )
}

export default Page;