const Footer = () => {
  return (
    <main className=' p-8 bg-neutral-800 text-neutral-200 bottom-0 w-full' style={{ paddingBottom: "8dvh" , paddingTop: "8dvh" }}>
      <section className='p-4 flex justify-around'>
        <div className=" flex gap-2 items-center">
          <div className=" font-semibold bg-linear-75 from-amber-300 to-amber-400 align-middle p-3 rounded-2xl text-neutral-50 cursor-pointer
                shadow shadow-amber-300 text-xl duration-500 transition-all hover:scale-110 hover:shadow-lg">SB</div>
          <p className=' text-2xl font-semibold m-0 drop-shadow'>Skill<span className='font-bold text-amber-500'>Bridge</span></p>
        </div>
        <div className=" flex gap-4 ">
          <div className=" p-1 px-4 rounded-3xl bg-neutral-700 flex justify-center items-center cursor-pointer duration-300 hover:scale-105">
            <p>Next.JS</p>
          </div>
          <div className=" p-1 px-4 rounded-3xl bg-neutral-700 flex justify-center items-center cursor-pointer duration-300 hover:scale-105">
            <p>Tailwind</p>
          </div>
          <div className=" p-1 px-4 rounded-3xl bg-neutral-700 flex justify-center items-center cursor-pointer duration-300 hover:scale-105">
            <p>TypeScript</p>
          </div>
        </div>
      </section>
      <br />
      <section className=" flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
            <span className="text-slate-500">SMKN 1 Jakarta</span>
          </span>
          <span className="text-xs text-slate-700">Human Capital &amp; Future Skills</span>
        </div>
        <span className=' px-4 opacity-50 text-center'>Copyright @ 2026 , Arif , Adzan , Raffy</span>
      </section>
    </main>
  )
}


export default Footer