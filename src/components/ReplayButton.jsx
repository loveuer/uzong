function ReplayIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <path d="M39 20A16 16 0 1 0 40 30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M39 10v10H29" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20 17 11 7-11 7Z" fill="currentColor" />
    </svg>
  )
}

export default function ReplayButton({ onClick, label, celebration = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-replay-button="true"
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl font-black shadow-md transition hover:-translate-y-0.5 active:scale-95 ${
        celebration
          ? 'min-h-14 bg-white px-3 py-2 text-sm text-emerald-700 md:text-base'
          : 'min-h-12 bg-slate-100 px-3 py-2 text-sm text-slate-600 hover:bg-slate-200'
      }`}
    >
      <span className={`grid shrink-0 place-items-center rounded-full ${
        celebration ? 'h-10 w-10 bg-emerald-100 p-1.5 text-emerald-600' : 'h-8 w-8 bg-white p-1 text-sky-600'
      }`}>
        <ReplayIcon />
      </span>
      <span>{label}</span>
    </button>
  )
}
