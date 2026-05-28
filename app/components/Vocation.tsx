export interface VocationProps {
    isSelect: boolean
    data: Data | null
}

export interface Data {
    ID: number;
    icon:string
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
            <main className='bg-linear-150 from-neutral-50/60 to-neutral-100/60 rounded-4xl shadow w-fit px-8 min-h-[50dvh] flex items-center justify-center backdrop-blur-lg my-8 font-sans 
            lg:min-w-[40dvw] lg:px-0'>
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
                <main className=' bg-neutral-50/60 rounded-4xl shadow-xl flex flex-col backdrop-blur-lg font-sans w-[80dvw] lg:w-[56dvw]' style={{ backgroundColor: data.colors.subtle_color }}>
                    <section className=' p-4 lg:p-6'>
                        <div className="flex flex-col gap-2 lg:gap-4">
                            <div className=" p-2 px-6 rounded-2xl text-white w-fit text-sm" style={{ backgroundColor: data.colors.primary_color }}>
                                <i className={`bi me-2 ${data.icon}`}></i>
                                <span>{data.uuid}</span>
                                </div>
                            <p className=' text-2xl font-semibold lg:text-3xl' style={{ color: data.colors.primary_color }}>{data.name}</p>
                            <p className=' font-light text-justify text-sm lg:text-2xl'>{data.description}</p>
                        </div>
                    </section>
                    <section className=" bg-neutral-50 p-8 w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="">
                            <p className=' font-semibold text-xs lg:text-lg' style={{ color: data.colors.primary_color }}>| Skill yang dipelajari</p>
                            <br />
                            <div className=' flex flex-col gap-4 p-2'>
                                {data.skills.map((a) => {
                                    return (
                                        <div key={a} className=' p-2 rounded-2xl bg-neutral-100 shadow flex items-center'>
                                            <i className="bi bi-circle-fill text-[8px] lg:text-sm me-4" style={{ color: data.colors.primary_color }}></i>
                                            <span className=" text-[8px] lg:text-base">{a}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="">
                            <p className=' text-neutral-800 font-semibold text-xs lg:text-lg'>| Projek yang mungkin ditemui</p>
                            <br />
                            <div className=' flex flex-col gap-4 p-2'>
                                {data.projects.map((a) => {
                                    return (
                                        <div key={a} className=' p-2 rounded-2xl bg-neutral-100 shadow flex items-center'>
                                            <i className="bi bi-circle-fill text-neutral-800 me-4 text-[8px] lg:text-sm"></i>
                                            <span className=" text-xs lg:text-base">{a}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                    <section className=' p-6 rounded-b-4xl bg-neutral-800'>
                        <p className=' text-amber-400 font-semibold text-lg font-mono lg:text-2xl'>Future Careers</p>
                        <br />
                        <div className=" grid grid-cols-2 gap-4 text-neutral-100">
                            {data.careers.map((a) => {
                                return (
                                    <div className=" p-2 px-4 rounded-2xl bg-neutral-700 font-semibold text-xs lg:text-base flex items-center" key={a}>{a}</div>
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
