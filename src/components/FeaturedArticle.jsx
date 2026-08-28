import { Link } from 'react-router-dom'
import categories from '../data/categories'
import { categoryName, formatDate } from '../utils'

export default function FeaturedArticle({ main, side }) {
  return (
    <div className="tales-layout">
      <Link to={`/article/${main.slug}`} className="card tales-main">
        <div className="card-img">
          <img src={main.image} alt="" loading="lazy" />
        </div>
        <span className="cat">{categoryName(categories, main.category)}</span>
        <h3>{main.title}</h3>
        <p className="excerpt">{main.excerpt}</p>
        <div className="meta">{main.author} · {formatDate(main.date)}</div>
      </Link>

      <div className="tales-side">
        {side.map((a) => (
          <Link key={a.slug} to={`/article/${a.slug}`} className="card">
            <div className="card-img">
              <img src={a.image} alt="" loading="lazy" />
            </div>
            <span className="cat">{categoryName(categories, a.category)}</span>
            <h3>{a.title}</h3>
            <div className="meta">{a.author} · {formatDate(a.date)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
