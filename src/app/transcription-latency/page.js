import CaseStudyLayout from '@/components/CaseStudyLayout'

export const metadata = {
  title: 'Transcription Latency Benchmark | StrategySoul',
  description: 'Accuracy tells you which model is right. Latency tells you which one ships. I timed 12 speech-to-text models across 5 providers on accented English.',
}

export default function TranscriptionLatency() {
  return (
    <CaseStudyLayout
      tag="AI Research · Huscribe"
      title="I Timed 12 Transcription Models So You Don't Have To"
      date="June 14, 2026"
      readTime="6 min read"
      bottomLine="Accuracy tells you which model is right. Latency tells you which one ships. gpt-4o-mini-transcribe was the rare model that won both: Tier-1 accuracy and the fastest response in the test. But the metric that will actually decide a live product is streaming latency, first-token time while the speaker is still talking, and that's a different benchmark entirely."
      nextRead={{
        tag: 'AI Research · Huscribe',
        title: 'I tested 12 transcription models so you don\'t have to',
        teaser: 'The accuracy half of this story: 12 models, 5 providers, accented English. Whisper won, AssemblyAI surprised everyone, and Deepgram disappointed.',
        href: '/transcription-benchmark',
      }}
    >
      <p>Last time, I made 12 AI models transcribe accented English and ranked them on accuracy. Then I shipped exactly none of them, because I realized accuracy is only half a product. The other half is whether the transcript shows up before the conversation is over.</p>
      <p>Picture a live sales call. Your model is 2% more accurate than the next one, and you feel very smart about that, right up until it takes four extra seconds to answer. By the time the perfect transcript lands, the rep has moved on, the coaching tip is stale, and the moment is gone. The slower, &quot;smarter&quot; model just lost to a faster, dumber one. So before crowning anything, I put all 12 on a stopwatch: same models, same providers, same accented clips, one question. How long does each one actually take to hand back a transcript?</p>

      <h2>What I Was Trying to Answer</h2>
      <p>Same 12 models, same 5 providers, same clip set as the accuracy run. The only thing that changed is the metric: not word error this time, but wall-clock seconds from &quot;send the file&quot; to &quot;transcript in hand.&quot; Fast enough to coach a live call, or fast enough to make tea while you wait?</p>

      <h2>How I Set It Up</h2>
      <p><strong>The same 50 clips as the accuracy benchmark.</strong> 25 from French-accented speakers, 25 from German-accented speakers. All English, all non-native. The same realistic conditions, because for a global sales platform, accented English is the default, not the edge case.</p>
      <p><strong>Metric:</strong> end-to-end latency. Wall-clock seconds measured with a high-resolution timer (<code>time.perf_counter()</code>). Lower is better. The numbers in the table below are averages across all 25 clips per accent group.</p>
      <p>I built a standalone timing script (<code>benchmark_timing.py</code>) that reuses the <em>exact same provider code paths as the accuracy benchmark</em>, so these are the same calls, just stopwatched. It runs every model on every clip, records the time, and writes the raw numbers out. It deliberately doesn&apos;t touch the accuracy benchmark files.</p>
      <p><strong>Three things to keep in mind about what I measured:</strong></p>
      <ul>
        <li><strong>This is end-to-end latency, not just inference.</strong> It includes the network round-trip. For upload-based providers, <strong>Gemini and AssemblyAI</strong>, it also includes the time to upload the file first, because that&apos;s genuinely part of getting a transcript back.</li>
        <li><strong>Averaged across the clip set.</strong> Each number is the mean across 25 timed clips per accent group, so run-to-run jitter is largely smoothed out rather than resting on a single lucky or unlucky call.</li>
      </ul>

      <h2>The Results</h2>
      <p>Averaged end-to-end latency across 25 clips per accent group.</p>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Provider</th>
            <th>French Accent (avg)</th>
            <th>German Accent (avg)</th>
            <th>Avg Latency</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>gpt-4o-mini-transcribe</td><td>OpenAI</td><td>2.4s</td><td>1.5s</td><td><strong>1.9s</strong></td></tr>
          <tr><td>gpt-4o-transcribe</td><td>OpenAI</td><td>3.1s</td><td>2.7s</td><td><strong>2.9s</strong></td></tr>
          <tr><td>deepgram-nova-3</td><td>Deepgram</td><td>2.9s</td><td>3.0s</td><td><strong>3.0s</strong></td></tr>
          <tr><td>deepgram-nova-2</td><td>Deepgram</td><td>2.6s</td><td>3.4s</td><td><strong>3.0s</strong></td></tr>
          <tr><td>whisper-1</td><td>OpenAI</td><td>5.0s</td><td>3.4s</td><td><strong>4.2s</strong></td></tr>
          <tr><td>gemini-2.5-flash</td><td>Google</td><td>10.3s</td><td>11.7s</td><td><strong>11.0s</strong></td></tr>
          <tr><td>azure-speech</td><td>Azure</td><td>22.8s</td><td>11.1s</td><td><strong>16.9s</strong></td></tr>
        </tbody>
      </table>

      <h2>What This Actually Means</h2>
      <p><strong>1. gpt-4o-mini-transcribe is the speed winner, and it&apos;s not close.</strong> Under 2 seconds on average, 1.5s on the German group. It was also a Tier-1 accuracy model. Fast <em>and</em> accurate is the combination everyone promises and almost nobody delivers, and right now this little model quietly has both. For a real-time product, it&apos;s the obvious first thing to try.</p>
      <p><strong>2. Deepgram delivers on its reputation here.</strong> Deepgram has shouted about speed for years, and on latency it actually backs it up: both nova models landed around 3 seconds, consistently, on both accent groups. The catch is they were <em>Tier-3 on accuracy</em>. So it&apos;s the classic deal with the devil: blazing fast, as long as you don&apos;t mind cleaning up the lowercase, punctuation-free word salad afterward.</p>
      <p><strong>3. whisper-1 is accurate but middle-of-the-pack on speed.</strong> The accuracy champion clocks in at 4.2s, the friend who&apos;s always right but always five minutes late. Totally fine for batch work, noticeably draggy next to the gpt-4o variants for anything live. For offline transcription it doesn&apos;t matter. For streaming coaching cues, it absolutely does.</p>
      <p><strong>4. Gemini and Azure are batch tools, not real-time tools.</strong> gemini-2.5-flash averaged ~11 seconds; azure-speech averaged ~17. In fairness, Gemini&apos;s number includes upload time, and Azure&apos;s path decodes the file, converts it to WAV, and streams it through continuous recognition, a pipeline built for careful long-form audio, not snappy answers. Either way, at these speeds neither is going to coach anyone through a live call. They&apos;ll get there eventually. The call may be over.</p>
      <p><strong>5. The fastest models were also among the most accurate.</strong> This is the genuinely encouraging part. You brace for a brutal speed-versus-accuracy tradeoff and instead the OpenAI gpt-4o variants were both quick <em>and</em> sharp. The painful tradeoff only really bites with Deepgram (fast, sloppy) and whisper-1 (precise, slow). The mythical &quot;fast and accurate&quot; quadrant has tenants after all.</p>

      <h2>A Note on Variance</h2>
      <p>Because I&apos;m reporting averages across 25 clips per group, a single slow cold-start or network blip doesn&apos;t define a model&apos;s number. What you&apos;re seeing in the table is stable, representative latency. The rankings (OpenAI gpt-4o fast, Gemini and Azure slow) held across the clip set and are believable.</p>
      <p>That said, latency is noisier than word error. It moves with network conditions, server load, time of day, and cold-start effects, and per-clip spread within a model is real. Azure had the widest spread in the test, swinging by more than 2x between its fastest and slowest clips. That&apos;s almost certainly the environment, not the model. For a production decision, run it again from the region your servers actually live in and look at the median.</p>

      <h2>What I&apos;m Not Saying</h2>
      <p>This measures <strong>batch latency</strong>: send the whole clip, wait for the whole transcript. That&apos;s not the same as <strong>streaming latency</strong>, which is the metric that actually matters for live products. How fast do partial words appear while someone is still talking?</p>
      <p>Providers like Deepgram, Azure, and AssemblyAI have dedicated real-time streaming APIs that this test doesn&apos;t touch. A model that&apos;s mediocre on batch latency can be excellent at streaming, and vice versa. That&apos;s a separate benchmark. I also didn&apos;t measure first-token latency, throughput under concurrent load, latency on a 30-minute call rather than a short clip, or cold versus warm connections. And five models failed to return a transcript at all, so they&apos;re absent from the speed picture entirely.</p>

      <h2>Where This Leaves Us</h2>
      <p>For batch transcription where response time matters:</p>
      <ul>
        <li><strong>Tier 1 (fast):</strong> gpt-4o-mini-transcribe (~1.9s), gpt-4o-transcribe (~2.9s), Deepgram nova-3 / nova-2 (~3.0s)</li>
        <li><strong>Tier 2 (acceptable):</strong> whisper-1 (~4.2s)</li>
        <li><strong>Tier 3 (batch-only):</strong> gemini-2.5-flash (~11s), azure-speech (~17s)</li>
      </ul>
      <p>Cross-referenced with the accuracy report, the standout is clear: <strong>gpt-4o-mini-transcribe is both Tier-1 accuracy and Tier-1 latency.</strong> If I had to ship one model today, that&apos;s the bet.</p>
      <p>But the metric that will actually decide a live product is <strong>streaming latency</strong>, first-token time as the speaker is still talking. That&apos;s the test coming next.</p>
    </CaseStudyLayout>
  )
}
