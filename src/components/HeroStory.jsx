import { Link } from 'react-router-dom'
import categories from '../data/categories'
import { categoryName } from '../utils'

export default function HeroStory({ lead, side }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <Link to={`/article/${lead.slug}`} className="hero-feature">
          <img src={lead.image} alt="" />
          <div className="hero-feature-content">
            <span className="eyebrow">{categoryName(categories, lead.category)}</span>
            <h1>{lead.title}</h1>
            <p className="excerpt">{lead.excerpt}</p>
            <div className="byline">By {lead.author}</div>
            <span className="read-link">Read Story →</span>
          </div>
        </Link>

        <div className="hero-side">
          {side.map((a) => (
            <Link key={a.slug} to={`/article/${a.slug}`} className="hero-side-item">
              <img src={a.image} alt="" loading="lazy" />
              <div>
                <span className="cat">{categoryName(categories, a.category)}</span>
                <h3>{a.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
