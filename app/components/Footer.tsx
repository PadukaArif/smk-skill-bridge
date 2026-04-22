const Footer = () => {
  return (
    <main className=' p-8 bg-neutral-800 text-neutral-200 bottom-0 w-full' style={{ marginTop: "10dvh" }}>
      <section className='p-4 flex justify-around'>
        <div className=" flex gap-2 items-center">
          <div className=" font-semibold bg-linear-75 from-amber-300 to-amber-400 align-middle p-3 rounded-2xl text-neutral-50 
                shadow shadow-amber-300 text-xl">SB</div>
          <p className=' text-2xl font-semibold m-0 drop-shadow'>Skill<span className='font-bold text-amber-500'>Bridge</span></p>
        </div>
        <div className=" flex gap-4 ">
          <div className=" p-1 px-4 rounded-3xl bg-neutral-700 flex justify-center items-center">
            <p>Next.JS</p>
          </div>
          <div className=" p-1 px-4 rounded-3xl bg-neutral-700 flex justify-center items-center">
            <p>Tailwind</p>
          </div>
          <div className=" p-1 px-4 rounded-3xl bg-neutral-700 flex justify-center items-center">
            <p>TypeScript</p>
          </div>
        </div>
      </section>
      <br />
      <p className=' px-4 opacity-50 text-center'>Copyright @ 2026 , Arif , Adzan , Raffy</p>
    </main>
  )
}


export default Footer