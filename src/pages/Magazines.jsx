import magazines from '../data/magazines'
import MagazineArchive from '../components/MagazineArchive'

export default function Magazines() {
  return (
    <>
      <div className="page-header container">
        <span className="eyebrow">Digital Magazine</span>
        <h1>Calcutta Chronicle Issues</h1>
        <p className="intro">
          Every monthly issue of Calcutta Chronicle, archived by year. Members can read and download each issue in full;
          a few issues are open to everyone.
        </p>
      </div>

      <div className="section container">
        <MagazineArchive magazines={magazines} />
      </div>
    </>
  )
}
