import React from 'react'
import { Question } from '../questions/page';

export interface QuestionProps {
    data: Question
    func: (e: React.ChangeEvent<HTMLInputElement>, questionNo: number) => void
    selectedAnswer: number | undefined
}

const Questions = ({ data, func, selectedAnswer }: QuestionProps) => {

    const selectedText = selectedAnswer
        ? data.options[selectedAnswer - 1]?.text
        : "";
    return (
        <div className="flex gap-2 flex-col p-6 shadow rounded-4xl border border-neutral-300" key={data.no}>
            <div className='text-xl flex gap-2 items-center'>
                <div className=' p-2 rounded-2xl bg-yellow-100 h-8 w-8 flex items-center justify-center text-amber-500 shadow'>
                    {data.no}
                </div>
                <span>{data.question} </span>.
            </div>
            <div className=" flex flex-col gap-2 p-4">
                {data.options.map((o, index) => {
                    const isSelected = selectedAnswer == index + 1
                    return (
                        <label className={`p-2 rounded-2xl shadow flex justify-between ${isSelected ? "bg-green-200 border border-green-600" : ""}`}
                            key={o.id_jurusan}>
                            <span>{o.text}</span>
                            <input value={index + 1} type='radio' name={`answer${data.no}`} defaultChecked={o.id_jurusan == selectedAnswer}
                                onChange={(e) => func(e, data.no)}
                                className='sr-only' />
                            <div className={`h-6 w-6 rounded-full border 
                                    ${isSelected ? " border-green-600 border-6 bg-green-200" : " border-neutral-400"}`}></div>
                        </label>
                    )
                })}
            </div>

            <section className='font-light text-neutral-400 mt-2'>
                <span>Jawaban Kamu :</span>
                {selectedText && (
                    <div className='font-medium p-2 px-4 rounded-2xl shadow bg-green-200 text-green-800 mt-2'>
                        {selectedText}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Questions;