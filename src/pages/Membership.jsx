import { Link } from 'react-router-dom'

const PLANS = [
  { name: 'Digital Reader', price: 'Free', highlight: false, perks: ['Access to open articles', 'Weekly newsletter', 'A handful of open-access issues'] },
  { name: 'Chronicle Member', price: '₹499 / year', highlight: true, perks: ['Full magazine archive access', 'Read & download every PDF issue', 'Early access to new stories', 'Ad-light reading experience'] },
  { name: 'Patron', price: '₹1,499 / year', highlight: false, perks: ['Everything in Chronicle Member', 'Name listed as a supporter', 'Invitations to Calcutta Chronicle events'] },
]

export default function Membership() {
  return (
    <>
      <div className="page-header container">
        <span className="eyebrow">Join Us</span>
        <h1>Membership</h1>
        <p className="intro">
          Calcutta Chronicle is built for readers who want more than a scroll through the city — become a
          member for full access to every issue, past and present.
        </p>
      </div>

      <div className="section container">
        <ul className="benefits-list" style={{ maxWidth: 640, marginBottom: 48 }}>
          <li>Unlimited access to the full magazine archive, read or downloaded as PDF</li>
          <li>New issues delivered the day they publish</li>
          <li>Support independent storytelling about Calcutta</li>
          <li>A cleaner, ad-light reading experience across the site</li>
        </ul>

        <div className="membership-plans">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`plan-card${plan.highlight ? ' highlight' : ''}`}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">{plan.price}</div>
              <ul>
                {plan.perks.map((p) => <li key={p}>— {p}</li>)}
              </ul>
              <Link to="/login" className={`btn ${plan.highlight ? 'btn-gold' : 'btn-ghost'}`}>
                {plan.price === 'Free' ? 'Get Started' : 'Become a Member'}
              </Link>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 40, fontSize: 13, color: 'var(--grey)' }}>
          Payment and subscription handling will be enabled soon — for now, membership sign-up leads to the login screen.
        </p>
      </div>
    </>
  )
}
