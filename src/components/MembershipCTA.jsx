import { Link } from 'react-router-dom'

export default function MembershipCTA() {
  return (
    <section className="membership-cta">
      <h2>Stories from Calcutta, wherever you are.</h2>
      <p>Stay connected with the city's people, places, history and changing culture.</p>
      <div className="actions">
        <Link to="/membership" className="btn btn-primary">Become a Member</Link>
        <Link to="/magazines" className="btn btn-ghost">Explore Magazines</Link>
      </div>
    </section>
  )
}
