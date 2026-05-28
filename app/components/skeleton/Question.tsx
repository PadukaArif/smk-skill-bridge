import React from 'react'

const Questions = () => {
    const data: number[] = [1, 2, 3, 4, 5]
    return (
        <div className="flex gap-2 flex-col p-4 shadow rounded-2xl border border-neutral-300 lg:p-6 lg:rounded-4xl">
            <div className='text-xl flex gap-2 items-center'>
                <div className=' p-6 rounded-full bg-neutral-400 h-8 w-8 items-center justify-center text-neutral-400 shadow hidden lg:flex animate-pulse'>
                    15
                </div>
                <div className=' text-sm lg:text-base bg-neutral-400 text-neutral-400 rounded-full p-2 animate-pulse'>
                    Jika segitiga memiliki panjang a = 9cm dan b = 12cm, berapa panjang hipotenusanya.
                </div>
            </div>
            <div className=" flex flex-col gap-2 lg:p-4">
                {data.map((o, index) => {
                    return (
                        <label className={`p-2 rounded-2xl shadow flex justify-between items-center bg-neutral-400 text-neutral-400 animate-pulse`}
                            key={index}>
                            <span className=' text-xs lg:text-base px-2 max-w-[80%]'>15cm</span>
                            <input value={index + 1} type='radio' className='sr-only' />
                            <div className={`h-6 w-6 rounded-full border `}></div>
                        </label>
                    )
                })}
            </div>

            <section className='font-light text-neutral-400 mt-2'>
                <span>Jawaban Kamu :</span>
                <div className='font-medium p-2 px-4 rounded-2xl shadow bg-neutral-400 text-neutral-400 mt-2 text-xs lg:text-base animate-pulse'>
                    15 Centimeter sebagai hipotenusa
                </div>
            </section>
        </div>
    )
}

export default Questions;