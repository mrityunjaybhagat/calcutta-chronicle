import { Link } from 'react-router-dom'

const LockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="10" width="16" height="10" rx="1.5" />
    <path d="M7 10V7a5 5 0 0 1 10 0v3" />
  </svg>
)

export default function ProtectedContentModal({ magazine, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="icon-circle"><LockIcon /></div>
        <h3>Members Only</h3>
        <p>
          Login or subscribe to access {magazine ? `the ${magazine.month} ${magazine.year} issue of` : 'this issue of'} Calcutta Chronicle.
        </p>
        <div className="actions">
          <Link to="/login" className="btn btn-primary" onClick={onClose}>Login</Link>
          <Link to="/membership" className="btn btn-gold" onClick={onClose}>Become a Member</Link>
        </div>
        <button className="dismiss" onClick={onClose}>Not now</button>
      </div>
    </div>
  )
}
