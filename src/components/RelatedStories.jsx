import ArticleGrid from './ArticleGrid'

export default function RelatedStories({ articles }) {
  if (!articles.length) return null
  return (
    <div className="container" style={{ maxWidth: 980, padding: '48px 24px 80px' }}>
      <div className="section-head">
        <h2 style={{ fontSize: 28 }}>Related Stories</h2>
      </div>
      <ArticleGrid articles={articles} />
    </div>
  )
}
