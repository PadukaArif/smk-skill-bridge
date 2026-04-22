export interface VocationProps {
    isSelect: boolean
    data: Data | null
}

export interface Data {
    ID: number;
    uuid: string;
    name: string;
    description: string;
    skills: string[];
    projects: string[];
    careers: string[];
    colors: Colors;
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}

const Vocation = ({ isSelect, data }: VocationProps) => {
    if (isSelect == false) {
        return (
            <main className='bg-linear-150 from-neutral-50/60 to-neutral-100/60 rounded-4xl shadow min-w-[40dvw] min-h-[50dvh] flex items-center justify-center backdrop-blur-lg my-8 font-sans'>
                <div className="text-center flex flex-col">
                    <i className="bi bi-search text-4xl text-amber-400 font-bold opacity-70 mb-8 drop-shadow drop-shadow-amber-400"></i>
                    <p className=' opacity-35 font-semibold'>Belum ada jurusan yang dipilih</p>
                    <p className=' opacity-15 font-bold text-lg mt-2'>Pilih jurusan untuk melihat detail</p>
                </div>
            </main>
        )
    }
    return (
        <>
            {data && (
                <main className=' bg-neutral-50/60 rounded-4xl shadow-xl min-w-[48dvw] max-w-[48dvw] flex flex-col backdrop-blur-lg 
                my-8 font-sans' style={{ backgroundColor: data.colors.subtle_color }}>
                    <section className=' p-6'>
                        <div className="flex flex-col gap-4">
                            <div className=" p-2 px-6 rounded-2xl text-white w-fit text-sm" style={{ backgroundColor: data.colors.secondary_color }}>{data.uuid}</div>
                            <p className=' text-3xl font-semibold' style={{ color: data.colors.base_color }}>{data.name}</p>
                            <p className=' font-light text-justify'>{data.description}</p>
                        </div>
                        {/* <div className="text-center flex flex-col">
                            <div className="" style={{ backgroundColor: data.colors.base_color }}>{data.colors.base_color}</div>
                            <div className="" style={{ backgroundColor: data.colors.primary_color }}>{data.colors.primary_color}</div>
                            <div className="" style={{ backgroundColor: data.colors.secondary_color }}>{data.colors.secondary_color}</div>
                            <div className="" style={{ backgroundColor: data.colors.subtle_color }}>{data.colors.subtle_color}</div>
                        </div> */}
                    </section>
                    <section className=" bg-neutral-50 p-8 w-full grid grid-cols-2">
                        <div className="">
                            <p className=' font-semibold text-lg' style={{ color: data.colors.secondary_color }}>Skill yang dipelajari</p>
                            <br />
                            <div className=' flex flex-col gap-4 p-2'>
                                {data.skills.map((a) => {
                                    return (
                                        <div key={a} className=' p-2 rounded-2xl bg-neutral-100 shadow'>
                                            <i className="bi bi-circle-fill text-sm me-4" style={{ color: data.colors.secondary_color }}></i>
                                            <span>{a}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="">
                            <p className=' text-amber-600 font-semibold text-lg'>Projek yang mungkin ditemui</p>
                            <br />
                            <div className=' flex flex-col gap-4 p-2'>
                                {data.projects.map((a) => {
                                    return (
                                        <div key={a} className=' p-2 rounded-2xl bg-neutral-100 shadow'>
                                            <i className="bi bi-circle-fill text-amber-400 text-sm me-4"></i>
                                            <span>{a}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                    <section className=' p-6 rounded-b-4xl bg-neutral-800'>
                        <p className=' text-amber-400 font-semibold font-mono'>Future Careers</p>
                        <br />
                        <div className=" grid grid-cols-2 gap-4 text-neutral-100">
                            {data.careers.map((a) => {
                                return (
                                    <div className=" p-2 px-4 rounded-2xl bg-neutral-700 font-semibold" key={a}>{a}</div>
                                )
                            })}
                        </div>
                    </section>
                </main>
            )}
        </>
    )
}

export default Vocation
