import { useParams, Link } from 'react-router-dom'
import articles from '../data/articles'
import categories from '../data/categories'
import { categoryName, formatDate } from '../utils'
import RelatedStories from '../components/RelatedStories'

const ShareIcon = ({ children }) => (
  <span className="icon-btn" style={{ border: '1px solid var(--grey-line)' }}>{children}</span>
)

export default function SingleArticle() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p style={{ marginBottom: 20 }}>We couldn't find that story.</p>
        <Link to="/tales" className="btn btn-primary">Browse Stories</Link>
      </div>
    )
  }

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3)

  return (
    <article>
      <div className="article-page-header">
        <span className="eyebrow">{categoryName(categories, article.category)}</span>
        <h1>{article.title}</h1>
        {article.excerpt && <p className="subtitle">{article.excerpt}</p>}
        <div className="article-byline">
          <span><strong>{article.author}</strong></span>
          <span>·</span>
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>

      <div className="article-hero-img">
        <img src={article.image} alt="" />
      </div>

      <div className="article-body">
        {article.body.map((block, i) => {
          if (block.type === 'p') return <p key={i}>{block.text}</p>
          if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
          if (block.type === 'quote') return <blockquote key={i}>{block.text}</blockquote>
          if (block.type === 'image') {
            return (
              <figure key={i}>
                <img src={block.src} alt="" loading="lazy" />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            )
          }
          return null
        })}

        <div className="article-share">
          <span>Share</span>
          <ShareIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.4 3 14.2 3c-2.5 0-4.2 1.5-4.2 4.4v2.4H7.3V12h2.7v9h3.5z" /></svg>
          </ShareIcon>
          <ShareIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" /></svg>
          </ShareIcon>
          <ShareIcon>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6l-10 7L2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
          </ShareIcon>
        </div>
      </div>

      <RelatedStories articles={related} />
    </article>
  )
}
