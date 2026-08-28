import { useState } from 'react'
import MagazineCard from './MagazineCard'
import ProtectedContentModal from './ProtectedContentModal'

export default function MagazineArchive({ magazines }) {
  const [lockedMagazine, setLockedMagazine] = useState(null)

  const byYear = magazines.reduce((acc, m) => {
    acc[m.year] = acc[m.year] || []
    acc[m.year].push(m)
    return acc
  }, {})
  const years = Object.keys(byYear).sort((a, b) => b - a)

  return (
    <div>
      {years.map((year) => (
        <div key={year}>
          <h2 className="magazine-year">{year}</h2>
          <div className="magazine-archive-grid">
            {byYear[year].map((m) => (
              <MagazineCard key={m.id} magazine={m} onLockedClick={setLockedMagazine} />
            ))}
          </div>
        </div>
      ))}

      {lockedMagazine && (
        <ProtectedContentModal magazine={lockedMagazine} onClose={() => setLockedMagazine(null)} />
      )}
    </div>
  )
}
