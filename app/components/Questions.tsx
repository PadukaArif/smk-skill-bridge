import React from 'react'

export interface QuestionProps {
    data: Question
    func : (e:React.ChangeEvent<HTMLSelectElement>)=>void
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

const Questions = ({ data , func }: QuestionProps) => {
    const currSelect = document.getElementById(`pertanyaan${data.no}`) as HTMLSelectElement
    return (
        <div className=" flex gap-2 flex-col p-2 shadow rounded-2xl border border-neutral-300" key={data.no}>
            <label htmlFor="" className=' text-xl'>{data.no}. {data.question}</label>
            <select name="" id={`pertanyaan${data.no}`} className=' border p-2 rounded-lg shadow' onChange={()=>func}>
                <option defaultValue="default" hidden>Pilih jawaban</option>
                {data.options.map(o => {
                    return (
                        <option value={o.id_jurusan} key={o.id_jurusan}>{o.text}</option>
                    )
                })}
            </select>
            <p className=' font-light text-neutral-400'>
                Jawaban Kamu :
                <span className=' font-semibold text-black mx-2'>
                    {currSelect?.selectedIndex > 0 ? currSelect.selectedOptions[0].text : ""}
                </span>
            </p>
        </div>
    )
}

export default Questions