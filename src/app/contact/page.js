import Image from 'next/image'

export const metadata = {
  title: 'Contact | StrategySoul',
  description: 'Get in touch with Sweta Kumari: product strategist and MBA graduate from HEC Paris.',
}

export default function Contact() {
  return (
    <main>
      <header
        className="masthead"
        style={{ backgroundImage: "url('/assets/img/contact-bg.jpg')" }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Contact Me</h1>
                <span className="subheading">Have questions? I have answers.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>The best way to reach me is via:</p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', alignItems: 'center' }}>
                <a href="mailto:swetakumaripm@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Image src="/assets/img/gmail.png" alt="Gmail" width={24} height={24} />
                  swetakumaripm@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/swetakumaripm" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Image src="/assets/img/Linkedin.png" alt="LinkedIn" width={24} height={24} />
                  swetakumaripm
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
