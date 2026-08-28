import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import articles from '../data/articles'
import categories from '../data/categories'
import ArticleGrid from '../components/ArticleGrid'

const PAGE_SIZE = 6

export default function ArticleListing() {
  const { slug } = useParams()
  const [visible, setVisible] = useState(PAGE_SIZE)

  const category = slug ? categories.find((c) => c.slug === slug) : null
  const list = slug ? articles.filter((a) => a.category === slug) : articles

  const title = category ? category.name : 'Tales of Calcutta'
  const intro = category
    ? category.tagline
    : "Every story we've published about the city — its people, places, food and history — in one place."

  return (
    <>
      <div className="page-header container">
        <span className="eyebrow">{category ? 'Category' : 'All Stories'}</span>
        <h1>{title}</h1>
        <p className="intro">{intro}</p>
      </div>

      <div className="section container">
        {list.length === 0 ? (
          <p style={{ color: 'var(--grey)', fontFamily: 'var(--serif-2)', fontSize: 18 }}>
            No stories in this category yet — check back soon.
          </p>
        ) : (
          <>
            <ArticleGrid articles={list.slice(0, visible)} />
            {visible < list.length && (
              <div className="pagination">
                <button className="btn btn-ghost" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
