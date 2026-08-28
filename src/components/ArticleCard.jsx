import { Link } from 'react-router-dom'
import categories from '../data/categories'
import { formatDate, categoryName } from '../utils'

export default function ArticleCard({ article, showExcerpt = true }) {
  return (
    <Link to={`/article/${article.slug}`} className="card">
      <div className="card-img">
        <img src={article.image} alt="" loading="lazy" />
      </div>
      <span className="cat">{categoryName(categories, article.category)}</span>
      <h3>{article.title}</h3>
      {showExcerpt && <p className="excerpt">{article.excerpt}</p>}
      <div className="meta">{article.author} · {formatDate(article.date)}</div>
    </Link>
  )
}
