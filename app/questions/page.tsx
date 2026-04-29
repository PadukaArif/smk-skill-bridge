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
    const [username, setUsername] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [dataQuestion, setData] = useState<Data>()
    const [numAnswer1, setAnswer1] = useState<number>(0)
    const [numAnswer2, setAnswer2] = useState<number>(0)
    const [numAnswer3, setAnswer3] = useState<number>(0)
    const [numAnswer4, setAnswer4] = useState<number>(0)
    const [numAnswer5, setAnswer5] = useState<number>(0)
    const [answersDict, setAnswersDict] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        axios.get('/questions.json')
            .then(response => {
                setData(response.data)
                const savedName = localStorage.getItem("username");
                const savedAns = localStorage.getItem('jawaban_kuis_lengkap');

                let c1 = 0, c2 = 0, c3 = 0, c4 = 0, c5 = 0;

                Object.values(answersDict).forEach(val => {
                    if (val === 1) c1++;
                    else if (val === 2) c2++;
                    else if (val === 3) c3++;
                    else if (val === 4) c4++;
                    else if (val === 5) c5++;
                });
                if (savedName) {
                    setUsername(savedName);
                }

                if (savedAns) {
                    setAnswersDict(JSON.parse(savedAns));
                }
                setIsLoaded(true);
                setAnswer1(c1); setAnswer2(c2); setAnswer3(c3); setAnswer4(c4); setAnswer5(c5);

            })
            .catch(error => console.error("Gagal memuat soal:", error));
        if (!isLoaded) return;
        localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify(answersDict));

    }, [answersDict, isLoaded]);

    useEffect(() => {
    }, []);

    const setAnswerArray = (answerIndex: number, questionNo: number) => {
        setAnswersDict(prev => ({
            ...prev,
            [questionNo]: answerIndex
        }));
    };

    const handleReset = () => {
        setAnswersDict({});

        localStorage.removeItem('jawaban_kuis_lengkap');
        localStorage.removeItem('question-progress');

        window.location.reload();
    };

    const totalQuestions = dataQuestion?.questions.length || 0;
    const answeredCount = Object.keys(answersDict).length;
    const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
    const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans selection:bg-amber-100 selection:text-amber-900">
            <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200 z-50">
                <div 
                    className="h-full bg-linear-to-r from-amber-500 to-yellow-400 transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16'>
                <header className="mb-12">
                    <h1 className='text-4xl md:text-5xl font-black tracking-tight mb-3'>
                        Halo, <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-600 to-yellow-500">{username || 'Guest'}</span> !
                    </h1>
                    <p className='font-light text-slate-500 text-lg md:text-xl max-w-2xl'>
                        Selesaikan {totalQuestions} pertanyaan di bawah ini untuk melihat peta kompetensimu. Pilih jawaban yang paling sesuai dengan dirimu.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    <section className='lg:col-span-8 flex flex-col gap-6'>
                        {!dataQuestion && (
                            <div className="flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                            </div>
                        )}

                        {dataQuestion?.questions.map((a) => (
                            <Questions
                                data={a}
                                func={setAnswerArray}
                                selectedAnswer={answersDict[a.no]}
                                key={a.no}
                            />
                        ))}
                    </section>

                    <aside className="lg:col-span-4 sticky top-8">
                        <div className='bg-white p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100'>
                            <div className="mb-6">
                                <h2 className='text-xl font-bold text-slate-800 flex items-center gap-2'>
                                    <i className="bi bi-pie-chart-fill text-amber-500"></i>
                                    Progress Jawaban
                                </h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    {answeredCount} dari {totalQuestions} terjawab ({Math.round(progressPercentage)}%)
                                </p>
                            </div>
                            
                            <div className="space-y-3 mb-8">
                                {[
                                    { label: 'RPL', count: numAnswer1 },
                                    { label: 'DKV', count: numAnswer2 },
                                    { label: 'MM', count: numAnswer3 },
                                    { label: 'TKJ', count: numAnswer4 },
                                    { label: 'SIJA', count: numAnswer5 }
                                ].map((item, idx) => (
                                    <div key={idx} className='flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0'>
                                        <span className='font-medium text-slate-600'>Jurusan {item.label}</span>
                                        <div className='w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm ring-1 ring-amber-200/50'>
                                            {item.count}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    className={`w-full py-3.5 rounded-2xl font-bold text-white transition-all duration-300 active:scale-[0.98] shadow-lg
                                        ${isComplete 
                                            ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30 cursor-pointer' 
                                            : 'bg-slate-300 cursor-not-allowed shadow-transparent'
                                        }
                                    `}
                                    disabled={!isComplete}
                                >
                                    {isComplete ? 'Lihat Hasil Kompetensi →' : 'Selesaikan Semua Soal'}
                                </button>
                                
                                <button
                                    onClick={handleReset}
                                    className="w-full py-3 rounded-2xl font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] transition-colors"
                                >
                                    Reset Ulang
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>
        </div>
    )
}

export default Page
