export default function Celebration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]" aria-hidden="true">
      {['🎉', '⭐', '✨', '🎊', '🌟', '💫'].map((piece, index) => (
        <span key={piece} className="confetti" style={{ '--delay': `${index * 0.12}s`, '--left': `${10 + index * 16}%` }}>
          {piece}
        </span>
      ))}
    </div>
  )
}
