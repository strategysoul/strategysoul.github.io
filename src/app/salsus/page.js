import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'Cracking the French Market for Salsus | StrategySoul',
  description: 'GTM strategy for Salsus in the French premium broth market: an HEC Paris MBA case study on cracking a €480M opportunity.',
}

export default function Salsus() {
  return (
    <CaseStudyLayout
      tag="GTM Strategy · HEC Paris"
      title="Cracking the French Market for Salsus: A Broth-y Challenge"
      date="September 18, 2025"
    >
      <p><strong>Salsus.</strong> No, that&apos;s not a typo for &quot;salsa.&quot; It&apos;s a premium stock and broth brand from Norway. Until recently, their market was pretty simple: Norway and Denmark. But then came the big idea: France. The land of sauces, brasseries, Michelin stars, and also… chefs who don&apos;t exactly like being told how to cook.</p>
      <p>So, Salsus knocked on our doors at HEC with one clear ask:<br /><em>&quot;Help us build our go-to-market strategy for France.&quot;</em></p>
      <img src="/assets/img/salsus.png" alt="Salsus premium broth" />
      <p>Now, you&apos;d think this is easy — after all, the French do love their sauces. But here&apos;s where it gets tricky:</p>
      <ul>
        <li><strong>Not French.</strong> They were bringing in a Nordic brand into a market that takes pride in its culinary traditions. Imagine showing up to an Italian nonna&apos;s kitchen with store-bought tomato sauce — yeah, exactly.</li>
        <li><strong>Premium pricing.</strong> Salsus wasn&apos;t here to play in the discount aisle with Maggi cubes. They wanted premium positioning.</li>
        <li><strong>A proud ritual.</strong> French chefs like the morning routine of selecting vegetables, meat, bones, simmering it all day… it&apos;s part of their craft. Telling them, &quot;Hey, here&apos;s a ready-made broth&quot; is basically saying, &quot;Hey, you know that centuries-old ritual? Skip it.&quot;</li>
      </ul>
      <p>So yeah, no small challenge.</p>

      <h2>Step One: Back to Business School Basics</h2>
      <p>I&apos;m a business student, so naturally the first instinct was… frameworks. (Sorry, can&apos;t help it.)</p>
      <p>We started with the <strong>3C framework</strong>: Company, Competitors, Customers.</p>
      <h5>Company: Who is Salsus?</h5>
      <ul>
        <li>Premium stock and broth, made in Norway.</li>
        <li>Everything is fresh and organic: glacier water, pasture-raised animals, organic vegetables.</li>
        <li>In Norway, Michelin-star chefs were already using it. So the brand had pedigree, just not in France.</li>
      </ul>
      <h5>Competitors: Who else is in the pot?</h5>
      <p>We mapped the market on two axes: price and quality/healthiness.</p>
      <img src="/assets/img/matrixsalsus.png" alt="Competitor mapping matrix" />
      <p>Salsus clearly belonged in the premium high-price, high-quality quadrant. The good news: there was space there. The bad news: French chefs already had their trusted brands.</p>
      <h5>Customers: Who should we really be talking to?</h5>
      <p>In Norway, Salsus targeted Michelin-star chefs and high-end restaurants. But in France, those chefs are married to their rituals. So, we needed to pivot:</p>
      <ul>
        <li><strong>Large-volume premium players</strong> — catering services, big brasseries (Bouillons), and premium hotel restaurants. Here, efficiency matters because they&apos;re cooking for hundreds.</li>
        <li><strong>French culinary schools</strong> — Le Cordon Bleu, Ferrandi Paris, Ecole Ducasse. If young chefs start experimenting with Salsus early, they&apos;ll carry that into their careers.</li>
        <li><strong>Purchase directors/managers</strong> — In B2B, they often make the final call, not the chefs.</li>
      </ul>
      <p>In short, Salsus needed to position itself as an enabler, not a replacer. Not: &quot;We&apos;ll take away your craft.&quot; But rather: &quot;We&apos;ll save you time so you can focus on creativity.&quot;</p>
      <p>And one final analysis from the b-school diaries — the infamous SWOT:</p>
      <img src="/assets/img/SWOT.png" alt="SWOT analysis" />

      <h2>Step Two: Defining the Brand</h2>
      <ul>
        <li><strong>Purpose:</strong> Enable chefs to save time on broth-making so they can focus on creativity.</li>
        <li><strong>Promise:</strong> Healthy, sustainable, and consistent quality in every batch.</li>
        <li><strong>USP:</strong> The only Nordic culinary brand offering glacier-pure, chef-crafted broths.</li>
        <li><strong>Brand assets:</strong> Natural ingredients, sustainability, and premium quality.</li>
        <li><strong>Target Relationship:</strong> Build long-term trust with premium chefs and decision-makers.</li>
      </ul>
      <p>Now we were ready to activate.</p>

      <h2>Step Three: Brand Activation</h2>
      <p>This is where the real fun started. Three phases: Consideration, Buy, Retain.</p>
      <h4>Phase 1: Getting on the Radar</h4>
      <ul>
        <li><strong>Events:</strong> Intimate chef-only tastings where they could try Salsus without sales pressure. Plus trade fairs like Sirha Lyon for broader reach.</li>
        <li><strong>Synergy Deals:</strong> Partner with distributors so chefs ordering Valrhona chocolate or other premium goods got a free trial of Salsus on the side. A foot in the kitchen door, quite literally.
          <img src="/assets/img/coffee.png" alt="Synergy deal inspiration" />
        </li>
        <li><strong>Social Media:</strong> No stock images of broth bowls. Instead, reels that celebrated the raw materials: glacier water cascading, organic carrots fresh from Nordic soil.</li>
        <li><strong>Advertisements:</strong> Ads built on values, purity, sustainability, and consistency in every batch.
          <iframe height="315" src="https://www.youtube.com/embed/pHtSDKFLmrY?si=M4OTCKaCNsCB0JfB" title="Salsus advertisement" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </li>
      </ul>
      <h4>Phase 2: Sealing the Deal</h4>
      <ul>
        <li><strong>Website Redesign:</strong> Inspired by Valrhona&apos;s chef-centered copy. Enable small-quantity online orders for easy trials. For bulk orders, prompt chefs to call — human connection builds trust in high-ticket B2B.</li>
        <li><strong>Pricing Mechanisms:</strong> Premium pricing stays, but bulk buyers get structured discounts. Enough to incentivize, not enough to erode brand positioning.</li>
      </ul>
      <h4>Phase 3: Retain</h4>
      <ul>
        <li><strong>Salsus Circle:</strong> A private, referral-only community where chefs could share recipes and flaunt their membership.</li>
        <li><strong>Salsus Savers:</strong> A loyalty program with cashback, discounts, and exclusive perks.</li>
        <li><strong>Long-term moonshot:</strong> A Salsus Certification developed with Michelin. Ambitious? Yes. But strategy is about vision too.</li>
      </ul>

      <h2>So, What Happened?</h2>
      <p>We pitched this to the Country Head and Marketing Officer. Some of it actually stuck:</p>
      <ul>
        <li>Salsus was <a href="https://www.linkedin.com/posts/salsus_salsus-sirha2025-gastronomie-activity-7308088955021783041-KfxR" target="_blank" rel="noreferrer">present at Sirha Lyon.</a></li>
        <li>They launched <a href="https://www.linkedin.com/posts/salsus_d%C3%A9couvrez-lunivers-de-salsus-des-mati%C3%A8res-activity-7343201406402625537-lWL5" target="_blank" rel="noreferrer">an ad</a> strikingly similar to the one I drafted.</li>
        <li>Salsus Professionel is now on <a href="https://www.instagram.com/salsus_pro/" target="_blank" rel="noreferrer">Instagram.</a></li>
        <li>They <a href="https://www.linkedin.com/posts/salsus_salsus-est-fier-d%C3%AAtre-partenaire-des-bocuse-activity-7303689148400336896-ccmY" target="_blank" rel="noreferrer">partnered with Bocuse d&apos;Or Winners.</a></li>
      </ul>
      <p><strong>What would I change?</strong> Probably focus more on a concrete short-term roadmap rather than loading short- and long-term ideas into one deck. But some of it stuck — and in consulting, that&apos;s a win.</p>

      <h2>Final Takeaway</h2>
      <p>The French market isn&apos;t easy to crack. You can&apos;t just show up with a broth and say, Voilà. But with the right positioning, storytelling, and a little nudge psychology, watch Salsus make it happen.</p>

      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
