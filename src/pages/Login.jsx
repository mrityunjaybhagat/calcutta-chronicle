import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend-only placeholder — wire to real auth API later.
    login()
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="sub">Log in to read the full magazine archive and member stories.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <div className="field-row">
            <label><input type="checkbox" /> Remember Me</label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p className="auth-footnote">
          Don't have an account? <Link to="/membership">Become a Member</Link>
        </p>
      </div>
    </div>
  )
}
