import Link from 'next/link'

export const metadata = {
  title: 'About | StrategySoul',
  description: 'About Sweta Kumari: a strategy and product professional with ~5 years of experience spanning software engineering, product management, and an MBA from HEC Paris.',
}

export default function About() {
  return (
    <main>
      <header
        className="masthead"
        style={{ backgroundImage: "url('/assets/img/about-bg.jpg')" }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>About Me</h1>
                <span className="subheading">I design strategies that don&apos;t just live in slides,</span>
                <span className="subheading">they live in the market.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-4">
        <div className="text-center my-5">
          <img
            src="/assets/img/Sweta.jpg"
            alt="Sweta Kumari Headshot"
            className="rounded-circle my-4"
            style={{ width: '220px', height: '220px', objectFit: 'cover' }}
          />
        </div>
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <p>Hi, I&apos;m <strong>Sweta Kumari</strong>.<br />
              A strategy-driven product professional with ~5 years of experience bringing ideas to life. (Yes, that&apos;s how corporate makes you say it)</p>
              <p>But here&apos;s who I really am.</p>
              <p>I love three things:</p>
              <ol>
                <li><strong>Building products.</strong> Maybe it&apos;s just my obsession with owning things, but creating is the easiest way to claim ownership. My first app? A tool to dodge my parents&apos; calls. I&apos;m still proud of it (Ask me why in person).</li>
                <li><strong>Analyzing businesses.</strong> I&apos;ve been dissecting how companies run since long before my MBA. Was it curiosity or was I prepping for my imaginary investment empire, we&apos;ll never know.</li>
                <li><strong>Ambiguity.</strong> To me, it&apos;s adventure disguised as chaos, and I enjoy figuring the way out.</li>
              </ol>
              <p>So, how have these three principles guided me in life?</p>
              <p>Well, I began my professional journey as a software engineer at Dell, spent a little less than 5 years there, saw my role evolve from developing UI and APIs, managing databases, structuring workflows to finally owning a global product. I was good at it. Comfortable, even. Which is exactly why I decided to leap into product management. I wanted to talk to users, understand what they really want (and why) and then devise strategies that would ultimately unlock revenues. So, I moved to France to pursue an MBA (because apparently that&apos;s the solution to everything). In that time, I also interned at a B2B startup as a Product manager.</p>
              <p>Now, I can speak most tech, finance, and marketing jargons, but more importantly, I understand people better, <em>et un peu francais</em>. Traveling across regions of India, working in startups as a freelancer, steering projects at a Fortune 500, living in France, and travelling to neighboring European countries, taught me empathy and how human behavior drives everything we build.</p>
              <p>I am, now, looking to use my experiences to build products, analyse businesses, and help navigate through ambiguity. If that sounds like what you need, or if you just want to trade stories, let&apos;s <a href="https://www.linkedin.com/in/swetakumaripm" target="_blank" rel="noreferrer">connect!</a></p>
              <p>But if you want to know more about me and my personal blast from the past, read on <Link href="/">here</Link></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
