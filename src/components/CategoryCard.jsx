import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <img src={category.image} alt="" loading="lazy" />
      <div className="category-card-label">
        <h3>{category.name}</h3>
        <span>{category.tagline}</span>
      </div>
    </Link>
  )
}
