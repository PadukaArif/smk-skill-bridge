import React from 'react'
import { Question } from '../questions/page';

export interface QuestionProps {
    data: Question
    func: (answerIndex: number, questionNo: number) => void
    selectedAnswer: number | undefined;
}

const Questions = ({ data, func, selectedAnswer }: QuestionProps) => {

    return (
        <div 
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/60 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-amber-100/40"
            key={data.no}
        >
            <h3 className='text-xl font-bold text-slate-800 mb-6 leading-relaxed'>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 text-sm font-black mr-3">
                    {data.no}
                </span>
                {data.question}
            </h3>

            <div className="grid grid-cols-1 gap-3">
                {data.options.map((o, index) => {
                    const isSelected = selectedAnswer === index + 1;
                    return (
                        <button
                            key={o.id_jurusan}
                            onClick={() => func(index + 1, data.no)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 active:scale-[0.98]
                                ${isSelected 
                                    ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-md shadow-amber-200/50' 
                                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-amber-300 hover:bg-white hover:shadow-md hover:shadow-amber-100/50'
                                }
                            `}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${isSelected ? 'border-amber-500' : 'border-slate-300'}
                                `}>
                                    {isSelected && <div className="w-3 h-3 rounded-full bg-amber-500 animate-scale-in" />}
                                </div>
                                <span className={`text-base sm:text-lg font-medium ${isSelected ? 'font-bold' : ''}`}>
                                    {o.text}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Questions;