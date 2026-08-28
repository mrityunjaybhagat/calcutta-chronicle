import { Link } from 'react-router-dom'
import articles from '../data/articles'
import categories, { featuredCategorySlugs } from '../data/categories'
import magazines from '../data/magazines'
import HeroStory from '../components/HeroStory'
import ArticleGrid from '../components/ArticleGrid'
import CategoryCard from '../components/CategoryCard'
import FeaturedArticle from '../components/FeaturedArticle'
import MembershipCTA from '../components/MembershipCTA'
import MagazineCard from '../components/MagazineCard'
import ProtectedContentModal from '../components/ProtectedContentModal'
import { useState } from 'react'

export default function Home() {
  const [lockedMagazine, setLockedMagazine] = useState(null)

  const featured = articles.filter((a) => a.featured)
  const lead = featured[0] || articles[0]
  const side = articles.filter((a) => a.slug !== lead.slug).slice(0, 3)

  const recent = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6)

  const talesMain = featured[1] || articles[1]
  const talesSide = articles.filter((a) => a.slug !== talesMain.slug).slice(3, 6)

  const more = articles.slice(6, 12)

  const featuredCategories = featuredCategorySlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter(Boolean)

  const latestIssue = magazines[0]

  return (
    <>
      <HeroStory lead={lead} side={side} />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Recent Stories</h2>
            <Link to="/tales" className="view-all">View All Stories →</Link>
          </div>
          <ArticleGrid articles={recent} featuredLead />
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-head">
            <h2>Explore Calcutta</h2>
          </div>
          <div className="category-grid">
            {featuredCategories.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Tales of Calcutta</h2>
            <Link to="/tales" className="view-all">More Tales →</Link>
          </div>
          <FeaturedArticle main={talesMain} side={talesSide} />
        </div>
      </section>

      <section className="magazine-promo">
        <div className="container section-inner">
          <div className="cover-wrap">
            <img src={latestIssue.cover} alt={`${latestIssue.month} ${latestIssue.year} cover`} />
          </div>
          <div>
            <span className="eyebrow">Calcutta Chronicle — Latest Issue</span>
            <h2>{latestIssue.title}</h2>
            <div className="issue-date">{latestIssue.month} {latestIssue.year}</div>
            <p className="desc">
              This month, we go looking for the city in its quieter corners — the trades that are disappearing,
              the buildings that refuse to, and the people who remember it all.
            </p>
            <div className="actions">
              <button
                className="btn btn-gold"
                onClick={() => (latestIssue.locked ? setLockedMagazine(latestIssue) : window.alert('Opening latest issue — PDF viewer coming soon.'))}
              >
                Read Magazine
              </button>
              <Link to="/magazines" className="btn btn-ghost">View All Issues</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>More Stories</h2>
            <Link to="/tales" className="view-all">View All →</Link>
          </div>
          <ArticleGrid articles={more} />
        </div>
      </section>

      <MembershipCTA />

      {lockedMagazine && (
        <ProtectedContentModal magazine={lockedMagazine} onClose={() => setLockedMagazine(null)} />
      )}
    </>
  )
}
