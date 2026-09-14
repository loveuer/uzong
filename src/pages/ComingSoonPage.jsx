export default function ComingSoonPage({ category }) {
  return (
    <main id="main" className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-5 pb-16 sm:px-8">
      <section className={`w-full max-w-2xl rounded-[2.5rem] border-4 border-white bg-gradient-to-br p-8 text-center shadow-2xl sm:p-14 ${category.card}`}>
        <span className={`mx-auto grid h-28 w-28 place-items-center rounded-[2rem] bg-gradient-to-br text-3xl font-black text-white shadow-xl ${category.iconColor}`}>
          {category.icon}
        </span>
        <h1 className="mt-7 text-3xl font-black text-slate-800 sm:text-5xl">{category.name}</h1>
        <p className="mx-auto mt-4 max-w-md font-semibold leading-7 text-slate-500">这里正在播种新的小游戏，很快就能来探索啦！</p>
        <div className="mt-8 inline-flex rounded-full bg-white/80 px-5 py-2 text-sm font-black text-slate-600 shadow-sm">🎁 敬请期待</div>
      </section>
    </main>
  )
}
