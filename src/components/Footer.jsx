import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import categories from '../data/categories'

const FacebookIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.4 3 14.2 3c-2.5 0-4.2 1.5-4.2 4.4v2.4H7.3V12h2.7v9h3.5z" /></svg>)
const InstagramIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></svg>)
const TwitterIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" /></svg>)
const YoutubeIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.9 2.9 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 0 0 2-2c.4-1.5.4-4.7.4-4.7zM10 15V9l5.2 3-5.2 3z" /></svg>)

export default function Footer() {
  const topStories = categories.slice(0, 12)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img src={logo} alt="Calcutta Chronicle" style={{ height: 46 }} />
            <p className="desc">
              In January 2022, Guide India Publication launched its new media venture — Calcutta Chronicle,
              a monthly digital English magazine that quenches the thirst of true-blue Calcuttans living
              outside the City of Joy.
            </p>
            <div className="footer-social">
              <a className="icon-btn" href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a className="icon-btn" href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a className="icon-btn" href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a className="icon-btn" href="#" aria-label="YouTube"><YoutubeIcon /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/tales">Tales</Link></li>
              <li><Link to="/kaleidoscope">Kaleidoscope</Link></li>
              <li><Link to="/membership">Membership</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Top Stories</h4>
            <ul>
              {topStories.map((c) => (
                <li key={c.slug}><Link to={`/category/${c.slug}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get in Touch</h4>
            <address>
              19B, Alenby Road, Kolkata 20<br /><br />
              <a href="mailto:contact@calcuttachronicle.co.in">contact@calcuttachronicle.co.in</a><br />
              <a href="tel:+919831048220">+91 98310 48220</a>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Guide India Publication. All rights reserved.</span>
          <span>Calcutta Chronicle — Stories from the City of Joy</span>
        </div>
      </div>
    </footer>
  )
}
