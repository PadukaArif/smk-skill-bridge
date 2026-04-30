'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Questions from '../components/Questions';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

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

export interface DataAnswer {
    [key: number]: number
}


const Page = () => {
    const [username, setUsername] = useState<string>("");
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [dataQuestion, setData] = useState<Data>()
    const [answersDict, setAnswersDict] = useState<{ [key: number]: number }>({});
    const [answerArr, setAnswerArr] = useState<number[]>([])
    const [count, setCount] = useState<number>(0)
    const [count1, setCount1] = useState<number>(0)
    const [btnLoad, setBtnLoad] = useState<boolean>(false)
    useEffect(() => {
        axios.get('/questions.json')
            .then(response => {
                setData(response.data)
                const savedName = localStorage.getItem("username");
                const savedAns = localStorage.getItem('jawaban_kuis_lengkap');
                if (savedName) {
                    setUsername(savedName);
                }

                if (savedAns) {
                    setAnswersDict(JSON.parse(savedAns));
                    setCount(Object.keys(JSON.parse(savedAns)).length)
                    const reconValue: number[] = answerArr
                    Object.values(JSON.parse(savedAns)).forEach((a) => {
                        reconValue.push(a as number)
                    })
                    setAnswerArr(reconValue)
                    setCount1(reconValue.length)
                }
                setIsLoaded(true);

            })
            .catch(error => console.error("Gagal memuat soal:", error));
        if (!isLoaded) return;
        localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify(answersDict));
    }, []);

    const setAnswerArray = (e: React.ChangeEvent<HTMLInputElement>, questionNo: number) => {
        const selectedIndex = parseInt(e.target.value);

        setAnswersDict(prev => ({
            ...prev,
            [questionNo]: selectedIndex
        }));
        setCount(Object.keys(answersDict).length + 1)
        if (answerArr) {
            const reconValue: number[] = [...answerArr]
            if (reconValue[questionNo - 1] == null) {
                reconValue.push(parseInt(e.target.value))
                setAnswerArr(reconValue)
                console.log(reconValue.length)
                setCount1(count1 + 1)
            } else {
                console.log("value sudah ada", reconValue[questionNo - 1])
                reconValue[questionNo - 1] = parseInt(e.target.value)
                setAnswerArr(reconValue)
            }
            console.log(answerArr.length, reconValue.length, count)
        }
        localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify(answersDict));
    };

    const handleReset = () => {
        setAnswersDict({});

        localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify({}));
        localStorage.setItem('question-progress', "0");

        window.location.reload();
    };

    const handleSubmit = () => {
        if (!btnLoad) {
            setBtnLoad(true)
            const payload = {
                "username": localStorage.getItem("username"),
                "answer_1": answerArr[0] ? answerArr[0] : 1,
                "answer_2": answerArr[1] ? answerArr[1] : 1,
                "answer_3": answerArr[2] ? answerArr[2] : 1,
                "answer_4": answerArr[3] ? answerArr[3] : 1,
                "answer_5": answerArr[4] ? answerArr[4] : 1,
                "answer_6": answerArr[5] ? answerArr[5] : 1,
                "answer_7": answerArr[6] ? answerArr[6] : 1,
                "answer_8": answerArr[7] ? answerArr[7] : 1,
                "answer_9": answerArr[8] ? answerArr[8] : 1,
                "answer_10": answerArr[9] ? answerArr[9] : 1,
                "answer_11": answerArr[10] ? answerArr[10] : 1,
                "answer_12": answerArr[11] ? answerArr[11] : 1,
                "answer_13": answerArr[12] ? answerArr[12] : 1,
                "answer_14": answerArr[13] ? answerArr[13] : 1,
                "answer_15": answerArr[14] ? answerArr[14] : 1,
                "answer_16": answerArr[15] ? answerArr[15] : 1,
                "answer_17": answerArr[16] ? answerArr[16] : 1,
                "answer_18": answerArr[17] ? answerArr[17] : 1,
                "answer_19": answerArr[18] ? answerArr[18] : 1,
                "answer_20": answerArr[19] ? answerArr[19] : 1,
                "answer_21": answerArr[20] ? answerArr[20] : 1,
                "answer_22": answerArr[21] ? answerArr[21] : 1,
                "answer_23": answerArr[22] ? answerArr[22] : 1,
                "answer_24": answerArr[23] ? answerArr[23] : 1,
                "answer_25": answerArr[24] ? answerArr[24] : 1,
                "answer_26": answerArr[25] ? answerArr[25] : 1,
                "answer_27": answerArr[26] ? answerArr[26] : 1,
                "answer_28": answerArr[27] ? answerArr[27] : 1,
                "answer_29": answerArr[28] ? answerArr[28] : 1,
                "answer_30": answerArr[29] ? answerArr[29] : 1,
            }
            axios.post("/api/results", payload)
                .then(data => {
                    const fetched = data.data
                    console.log(fetched)
                    if (fetched.status) {
                        if (fetched.id) {
                            setTimeout(() => {
                                localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify({}));
                                localStorage.setItem('question-progress', "0");
                                localStorage.setItem('user_id', fetched.id);
                                location.href = `/result/${fetched.id}`
                            }, 1000);
                        }
                    }
                })
        } else {
            console.log("Error")
        }
    }

    return (
        <>
            <Navbar isGlass={true} />
            <main className='p-8 bg-white text-neutral-800 w-[75dvw] rounded-4xl shadow-2xl m-8 mx-auto font-sans'
                style={{ marginTop: "12dvh" }}>
                <div className="mb-6">
                    <p className='mb-2 font-semibold text-6xl'><span className=' font-light text-amber-500'>Halo,</span> {username}</p>
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
                <section className=' flex justify-start items-center gap-4'>
                    {count < 30 && (
                        <button disabled={true}
                            className="mt-6 px-6 py-2 bg-amber-500 text-white font-semibold rounded-xl cursor-not-allowed active:scale-95 transition-all 
                    shadow-lg shadow-amber-500/30 disabled:bg-amber-500/60">
                            {count}/30
                        </button>
                    )}
                    {count >= 30 && (
                        <button
                            onClick={() => handleSubmit()}
                            disabled={btnLoad}
                            className={`mt-6 px-6 py-2 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 active:scale-95 transition-all 
                    shadow-lg shadow-amber-500/30 disabled:opacity-75 disabled:cursor-not-allowed`}>
                            {btnLoad ? "Tunggu sebentar..." : "Lihat Hasil"}
                        </button>
                    )}
                    <button
                        onClick={() => handleReset()}
                        className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 active:scale-95 transition-all shadow-lg 
                    shadow-red-500/30">
                        Reset Semua Jawaban
                    </button>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Page
