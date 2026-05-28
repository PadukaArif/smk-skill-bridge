'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Questions from '../components/Questions';
import Question from '../components/skeleton/Question';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import General from './General';
import Modalbox from '../components/Modalbox';


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
export interface IMajorChoiceData {
    status: boolean
    data: IMajorResult
}
interface IMajorResult {
    name: string
    total: number
}
const Page = () => {
    const [show, setShow] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("");
    const [choice, setChoice] = useState<string>("");
    const [dataQuestion, setData] = useState<Data>()
    const [answersDict, setAnswersDict] = useState<{ [key: number]: number }>({});
    const [answerArr, setAnswerArr] = useState<number[]>([])
    const [count, setCount] = useState<number>(0)
    const [count1, setCount1] = useState<number>(0)
    const [btnLoad, setBtnLoad] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const [resultMajor, setResultMajor] = useState<IMajorChoiceData>()
    const dummyData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    useEffect(() => {
        axios.get('/api/vocations/division')
            .then(response => {
                console.log(response.data)
                setData(response.data.data)
                const savedName = localStorage.getItem("username");
                if (savedName) {
                    setUsername(savedName);
                }
                setTimeout(() => {
                    setShowModal(true)
                }, 512);
            })
            .catch(error => console.error("Gagal memuat soal:", error));

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
                setCount1(count1 + 1)
            } else {
                reconValue[questionNo - 1] = parseInt(e.target.value)
                setAnswerArr(reconValue)
            }
        }
        // localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify(answersDict));
    };

    const handleReset = () => {
        setAnswersDict({});

        localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify({}));
        localStorage.setItem('question-progress', "0");
        localStorage.setItem('division', "");

        window.location.reload();
    };

    const handleSubmit = () => {
        if (!btnLoad && choice) {
            setBtnLoad(true)
            const payload = {
                "username": localStorage.getItem("username"),
                "answer_array" : answerArr
            }
            // const payload = {
            //     "username": localStorage.getItem("username"),
            //     "answer_1": answerArr[0] ? answerArr[0] : 1,
            //     "answer_2": answerArr[1] ? answerArr[1] : 1,
            //     "answer_3": answerArr[2] ? answerArr[2] : 1,
            //     "answer_4": answerArr[3] ? answerArr[3] : 1,
            //     "answer_5": answerArr[4] ? answerArr[4] : 1,
            //     "answer_6": answerArr[5] ? answerArr[5] : 1,
            //     "answer_7": answerArr[6] ? answerArr[6] : 1,
            //     "answer_8": answerArr[7] ? answerArr[7] : 1,
            //     "answer_9": answerArr[8] ? answerArr[8] : 1,
            //     "answer_10": answerArr[9] ? answerArr[9] : 1,
            //     "answer_11": answerArr[10] ? answerArr[10] : 1,
            //     "answer_12": answerArr[11] ? answerArr[11] : 1,
            //     "answer_13": answerArr[12] ? answerArr[12] : 1,
            //     "answer_14": answerArr[13] ? answerArr[13] : 1,
            //     "answer_15": answerArr[14] ? answerArr[14] : 1,
            // }
            if (choice && choice.toLowerCase() !== 'notknow') {
                axios.post(`/api/results/${choice}`, payload)
                    .then(data => {
                        const fetched = data.data
                        console.log(fetched)
                        if (fetched.status) {
                            if (fetched.id) {
                                setTimeout(() => {
                                    localStorage.setItem('jawaban_kuis_lengkap', JSON.stringify({}));
                                    localStorage.setItem('question-progress', "0");
                                    localStorage.setItem('username', "");
                                    localStorage.setItem('user_id', fetched.id);
                                    location.href = `/result/${fetched.id}`
                                }, 1000);
                            }
                        }
                    })
            } else {
                const result = answerArr
                axios.post<IMajorChoiceData>("/api/question/division", {
                    result,
                    username
                })
                    .then(data => {
                        const fetched = data.data
                        console.log(fetched)
                        setTimeout(() => {
                            setResultMajor(fetched)
                            setChoice(fetched.data.name.toLowerCase())
                        }, 512);
                    })
            }
        } else {
            console.log("Error")
        }
    }
    const handleValue = (value: string) => {
        setChoice(value)
    }
    const handleShow = () => {
        setShowModal(false)
        if (choice && choice.toLowerCase() !== 'notknow') {
            localStorage.setItem("jawaban_kuis_lengkap", "")
            setAnswerArr([])
            setAnswersDict({})
            console.log(answerArr)
            setResultMajor(undefined)
            axios.get(`/api/question/${choice.toLowerCase()}`)
                .then(response => {
                    console.log(response.data)
                    setLoad(true)
                    setData(response.data.result)
                    console.log(answerArr)
                    setTimeout(() => {
                        setLoad(false)
                        setShow(true)
                    }, 512);
                })
                .catch(error => console.error("Gagal memuat soal:", error));
        } else {
            setShow(true)
        }
    }
    return (
        <>
            {showModal && (
                <Modalbox>
                    <main className=' p-8 bg-neutral-50'>
                        <General func={handleValue} func1={handleShow} />
                    </main>
                </Modalbox>
            )}
            <Navbar isGlass={true} />
            <main className='p-4 text-neutral-800 rounded-4xl m-8 mx-auto font-sans w-[88dvw] lg:w-[72dvw] lg:p-8 lg:bg-neutral-100 lg:shadow-2xl'
                style={{ marginTop: "12dvh", marginBottom: "32dvh", filter: resultMajor ? " blur(1.6rem)" : "", overflowY: resultMajor ? "hidden" : "scroll" }}>
                <div className="mb-6">
                    <p className='mb-2 font-semibold text-xl lg:text-6xl'><span className=' font-light text-amber-500'>Halo,</span> {username}</p>
                    <p className='font-light text-neutral-500 text-xs lg:text-lg'>Selamat datang di halaman pertanyaan</p>
                </div>
                {load && (
                    <section className={`flex flex-col gap-4 justify-content-center align-items-center`}>
                        {dummyData.map((a) => {
                            return (
                                <Question key={a} />
                            )
                        })}
                    </section>
                )}
                {show && (
                    <div className=" p-1 pe-4 rounded-full w-fit cursor-pointer my-4 shadow truncate border lg:p-2 lg:pe-6 bg-yellow-100/32 text-amber-600">
                        <p className=' text-lg'>
                            <i className="bi bi-info-circle me-2"></i>
                            <span>{dataQuestion?.test_title}</span>
                        </p>
                    </div>
                )}
                {show && (
                    <section className={`flex flex-col gap-4 justify-content-center align-items-center`}>

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
                )}
                {dataQuestion && (

                    <section className=' flex justify-start items-center gap-4'>
                        {count < 15 && (
                            <button disabled={true}
                                className="mt-6 px-6 py-2 bg-amber-500 text-white font-semibold rounded-xl cursor-not-allowed active:scale-95 transition-all 
                    shadow-lg shadow-amber-500/30 disabled:bg-amber-500/60">
                                {count}/{dataQuestion?.questions.length}
                            </button>
                        )}
                        {count >= 15 && (
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
                            <span>Reset</span>
                            <i className="bi bi-arrow-repeat mx-2"></i>
                        </button>
                    </section>

                )}
            </main>
            <Footer />
            {resultMajor && resultMajor.data && (
                <Modalbox>
                    <section className=' flex flex-col gap-4 p-6 items-center justify-center w-[50dvh] h-fit bg-neutral-100'>
                        <div className=" flex justify-start items-center gap-4 w-full mb-2">
                            <div className=" p-4 rounded-2xl bg-green-200 flex items-center justify-center">
                                <i className={`bi bi-check-circle-fill text-3xl drop-shadow
                            ${resultMajor.data.name == "Tidak Yakin" ? " text-red-600" : " text-green-600"} `}></i>
                            </div>
                            <div className=" flex flex-col font-mono">
                                <p className=' text-xl text-neutral-400 font-sans'>Hasil algoritma sistem</p>
                                <p className=' text-xl font-semibold'>Jurusan cocok untukmu</p>
                            </div>
                        </div>
                        <div className=" w-full flex flex-col items-start font-mono gap-4">
                            <p className=' text-neutral-600'>
                                {resultMajor.data.name == "Tidak Yakin"
                                    ? "Sistem tidak dapat mencari jurusan yang cocok"
                                    : "Berdasarkan kalkulasi minat dan pengetahuan kamu, sistem mendeteksi kecocokan pada program studi :"}
                            </p>
                            <section className=' flex justify-between items-center w-full bg-green-200/24 text-green-600 p-4 rounded-2xl'>
                                <p className=' text-lg font-semibold m-0 uppercase'>
                                    <i className="bi bi-info-circle me-2"></i>
                                    <span>{resultMajor.data.name}</span>
                                </p>
                                <div className=" flex flex-col items-end">
                                    <p className=' text-neutral-400 text-sm'>Skor total : </p>
                                    <p className=' text-neutral-600 font-sans'>
                                        {resultMajor.data.total}/{dataQuestion?.questions?.length}
                                    </p>
                                </div>
                            </section>
                        </div>
                        <button type='button' className=' bg-amber-400 text-neutral-100 w-full p-4 rounded-2xl text-xl cursor-pointer shadow font-semibold
                    hover:opacity-75 active:scale-95'
                            onClick={() => {
                                if (resultMajor.data.name !== "Tidak Yakin") {
                                    handleShow()
                                    setBtnLoad(false)
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                }
                            }}>
                            <span>
                                {resultMajor.data.name == "Tidak Yakin"
                                    ? "Ulang tes"
                                    : "Lanjutkan"}
                            </span>
                            <i className="bi bi-arrow-right mx-2"></i>
                        </button>
                    </section>
                </Modalbox>
            )}
        </>
    )
}

export default Page
