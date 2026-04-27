import React from 'react'
import { Question } from '../questions/page';

export interface QuestionProps {
    data: Question
    func : (e:React.ChangeEvent<HTMLSelectElement> , questionNo:number)=>void
    selectedAnswer: number | undefined
}

const Questions = ({ data, func, selectedAnswer }: QuestionProps) => {

    const selectedText = selectedAnswer
        ? data.options[selectedAnswer - 1]?.text
        : "";

    return (
        <div className="flex gap-2 flex-col p-2 shadow rounded-2xl border border-neutral-300" key={data.no}>
            <label htmlFor={`pertanyaan${data.no}`} className='text-xl'>
                {data.no}. {data.question}
            </label>

            <select
                name=""
                id={`pertanyaan${data.no}`}
                className='border p-2 rounded-lg shadow'
                onChange={(e) => func(e, data.no)}
                value={selectedAnswer !== undefined ? selectedAnswer : "0"}
            >
                <option value="0" hidden>Pilih jawaban</option>
                {data.options.map((o, index) => {
                    return (
                        <option value={index + 1} key={o.id_jurusan}>{o.text}</option>
                    )
                })}
            </select>

            <p className='font-light text-neutral-400 mt-2'>
                Jawaban Kamu :
                <span className='font-semibold text-black mx-2'>
                    {selectedText}
                </span>
            </p>
        </div>
    )
}

export default Questions;