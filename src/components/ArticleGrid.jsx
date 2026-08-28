import ArticleCard from './ArticleCard'

export default function ArticleGrid({ articles, featuredLead = false }) {
  return (
    <div className={`article-grid${featuredLead ? ' featured-lead' : ''}`}>
      {articles.map((a) => (
        <ArticleCard key={a.slug} article={a} />
      ))}
    </div>
  )
}
