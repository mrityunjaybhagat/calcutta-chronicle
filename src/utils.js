export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function categoryName(categoriesList, slug) {
  const found = categoriesList.find((c) => c.slug === slug)
  return found ? found.name : slug
}
