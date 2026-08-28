import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p style={{ fontFamily: 'var(--serif-2)', fontSize: 20, color: 'var(--grey)', marginBottom: 24 }}>
        This page has wandered off somewhere in the city.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}
