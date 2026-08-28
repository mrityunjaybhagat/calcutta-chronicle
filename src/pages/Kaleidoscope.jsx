const GALLERY = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  src: `https://picsum.photos/seed/cc-kaleidoscope-${i}/700/700`,
}))

export default function Kaleidoscope() {
  return (
    <>
      <div className="page-header container">
        <span className="eyebrow">Photo Gallery</span>
        <h1>Kaleidoscope</h1>
        <p className="intro">A visual wander through Calcutta — street life, architecture and everyday moments, in pictures.</p>
      </div>

      <div className="section container">
        <div className="category-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {GALLERY.map((img) => (
            <div key={img.id} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
              <img src={img.src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
