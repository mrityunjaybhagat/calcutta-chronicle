import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import { useAuth } from '../AuthContext'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/tales', label: 'Tales' },
  { to: '/kaleidoscope', label: 'Kaleidoscope' },
  { to: '/magazines', label: 'Magazines' },
  { to: '/membership', label: 'Membership' },
  { to: '/contact', label: 'Contact Us' },
]

const SearchIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)

export default function Header({ onOpenSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="site-header">
      <div className="container bar">
        <Link to="/" onClick={() => setMobileOpen(false)} aria-label="Calcutta Chronicle — home">
          <img src={logo} alt="Calcutta Chronicle" style={{ height: 52 }} />
        </Link>

        <nav className="main-nav" aria-label="Primary">
          {NAV_LINKS.slice(1).map((link) => (
            <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-btn" aria-label="Search" onClick={onOpenSearch}>
            <SearchIcon />
          </button>
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="login-link"
              style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="login-link" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Login
            </Link>
          )}
          <Link to="/membership" className="btn btn-primary">Subscribe</Link>
          <button className="icon-btn hamburger" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <nav>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>{link.label}</Link>
          ))}
        </nav>
        <div className="mobile-actions">
          <Link to="/login" className="btn btn-ghost" onClick={() => setMobileOpen(false)}>Login</Link>
          <Link to="/membership" className="btn btn-primary" onClick={() => setMobileOpen(false)}>Become a Member</Link>
        </div>
        <button className="icon-btn" aria-label="Close menu" onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: 30, right: 24 }}>
          <CloseIcon />
        </button>
      </div>
    </header>
  )
}
