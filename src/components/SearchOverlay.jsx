import { useState, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import articles from '../data/articles'
import categories from '../data/categories'
import { categoryName } from '../utils'

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
)

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || categoryName(categories, a.category).toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search stories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-close" onClick={onClose} aria-label="Close search"><CloseIcon /></button>
        </div>

        <div className="search-results">
          {query.trim() && results.length === 0 && (
            <div className="search-empty">No stories found for "{query}".</div>
          )}
          {results.map((a) => (
            <Link key={a.slug} to={`/article/${a.slug}`} className="search-result-item" onClick={onClose}>
              <img src={a.image} alt="" />
              <div>
                <span className="cat">{categoryName(categories, a.category)}</span>
                <h4>{a.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
