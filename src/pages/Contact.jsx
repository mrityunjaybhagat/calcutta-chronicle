export default function Contact() {
  return (
    <>
      <div className="page-header container">
        <span className="eyebrow">Get in Touch</span>
        <h1>Contact Us</h1>
        <p className="intro">Story tips, feedback, or membership questions — we'd love to hear from you.</p>
      </div>

      <div className="section container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 900 }}>
        <div>
          <div className="field">
            <label>Address</label>
            <p style={{ fontFamily: 'var(--serif-2)', fontSize: 18 }}>19B, Alenby Road, Kolkata 20</p>
          </div>
          <div className="field">
            <label>Email</label>
            <p style={{ fontFamily: 'var(--serif-2)', fontSize: 18 }}><a href="mailto:contact@calcuttachronicle.co.in">contact@calcuttachronicle.co.in</a></p>
          </div>
          <div className="field">
            <label>Phone</label>
            <p style={{ fontFamily: 'var(--serif-2)', fontSize: 18 }}><a href="tel:+919831048220">+91 98310 48220</a></p>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); window.alert('Thanks — this form will be wired up soon.') }}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <input id="message" type="text" required placeholder="How can we help?" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
        </form>
      </div>
    </>
  )
}
