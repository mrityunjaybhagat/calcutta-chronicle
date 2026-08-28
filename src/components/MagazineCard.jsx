import { useAuth } from '../AuthContext'

const LockMini = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="10" width="16" height="10" rx="1.5" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
  </svg>
)

export default function MagazineCard({ magazine, onLockedClick }) {
  const { isLoggedIn } = useAuth()
  const isLocked = magazine.locked && !isLoggedIn

  return (
    <button
      className="magazine-card"
      style={{ textAlign: 'left', display: 'block', width: '100%' }}
      onClick={() => (isLocked ? onLockedClick(magazine) : window.alert(`Opening ${magazine.month} ${magazine.year} — PDF viewer coming soon.`))}
    >
      <div className="cover">
        <img src={magazine.cover} alt={`${magazine.month} ${magazine.year} cover`} loading="lazy" />
        {isLocked && <span className="lock-badge"><LockMini /></span>}
      </div>
      <div className="meta">
        <div className="m-title">{magazine.title}</div>
        <div className="m-date">{magazine.month} {magazine.year}</div>
      </div>
    </button>
  )
}
