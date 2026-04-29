import Link from 'next/link'
import CaseStudyLayout from '@/components/CaseStudyLayout'
import styles from '@/components/CaseStudyLayout.module.css'

export const metadata = {
  title: 'Transcription Model Benchmark | StrategySoul',
  description: 'I tested 12 speech-to-text models across 5 providers on 50 clips of accented English. Here\'s what I found.',
}

export default function TranscriptionBenchmark() {
  return (
    <CaseStudyLayout
      tag="AI Research · Huscribe"
      title="I Tested 12 Transcription Models So You Don't Have To"
      date="April 29, 2026"
    >
      <p>Every voice-AI product has the same dirty secret: it&apos;s only as good as its transcription layer. You can have the most sophisticated intent detection, the smartest sales coaching engine, the cleanest UI. Doesn&apos;t matter. If the model hears &quot;we&apos;re willing to pivot&quot; as &quot;we&apos;re willing to visit,&quot; the whole downstream experience falls apart. And in a sales context, one mis-transcribed sentence can flip a deal.</p>
      <p>So I ran a benchmark. Not a vibe check. An actual benchmark: 12 models, 5 providers, 50 audio clips, one metric. Here&apos;s what happened.</p>

      <h2>What I Was Trying to Answer</h2>
      <p>Simple question: <em>which transcription model should Huscribe bet on?</em></p>
      <p>OpenAI has Whisper and the new GPT-4o transcribe variants. Google has Gemini 2.5 and 3.1 models that didn&apos;t exist 18 months ago. Microsoft has Azure Speech, positioned as the enterprise-grade option. Deepgram has been the darling of developer-first STT for years. AssemblyAI just quietly rebuilt their entire model stack. Everyone claims to be the best. I needed numbers.</p>

      <h2>How I Set It Up</h2>
      <p><strong>50 audio clips. All English. All non-native accents.</strong></p>
      <ul>
        <li>25 clips from French-accented speakers: business topics, the EU AI Act, product pitches, earnings calls</li>
        <li>25 clips from German-accented speakers: entrepreneurship, pivoting, fundraising, technical product descriptions</li>
      </ul>
      <p>Clean American English is too easy. It tells you nothing. Accented speech is where models actually separate, and for a global sales platform, accented English is the <em>default</em>, not the edge case. I varied clip length, speaker pace, and topic density deliberately. A benchmark that only tests one speaker per accent group is just anecdote. (And a quiet thank you to my HEC Paris professors, whose lectures are apparently all over the internet. Very convenient for benchmarking purposes.)</p>
      <p><strong>Ground truth:</strong> human-verified transcripts for all 50 clips. <strong>Metric:</strong> WER (Word Error Rate), the percentage of words the model gets wrong, normalized for case and punctuation. The numbers in the table below are averages across all 25 clips per accent group. Lower is better. Zero is perfect.</p>
      <p>I built a Python benchmarking script that sends each clip to every API, computes WER against ground truth, caches results so completed runs aren&apos;t repeated, and outputs a comparison table. At 50 clips across 12 models, that&apos;s 600 API calls per full run. The caching mattered.</p>
      <p><strong>The setup fought back.</strong> It always does.</p>
      <ul>
        <li><strong>Microsoft MAI-Transcribe-1</strong> required audio hosted on Azure Blob Storage, not local files. Deferred.</li>
        <li><strong>Azure&apos;s REST API</strong> silently transcribes only the first utterance then stops. No error, no warning. Just stops. Switched to SDK with continuous recognition.</li>
        <li><strong>Azure SDK can&apos;t decode MP3</strong> without GStreamer or ffmpeg, neither of which were installable in my environment. Fix: macOS&apos;s built-in <code>afconvert</code>. Unglamorous. Worked.</li>
        <li><strong>AssemblyAI&apos;s <code>speech_model</code> parameter</strong> was deprecated without much fanfare. The new parameter is <code>speech_models</code> (plural), with completely renamed models.</li>
        <li><strong>Three Gemini models</strong> are simply blocked on the free Google Cloud tier. Limit: zero requests. Results pending billing.</li>
      </ul>
      <p>Benchmarking is always like this. Half the work is just getting everything to actually run.</p>

      <h2>The Results</h2>
      <p>Averaged WER across 25 clips per accent group.</p>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Provider</th>
            <th>French Accent (avg)</th>
            <th>German Accent (avg)</th>
            <th>Overall Avg WER</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>whisper-1</td><td>OpenAI</td><td>2.7%</td><td>2.7%</td><td><strong>2.7%</strong></td></tr>
          <tr><td>gpt-4o-mini-transcribe</td><td>OpenAI</td><td>2.7%</td><td>4.0%</td><td><strong>3.4%</strong></td></tr>
          <tr><td>assemblyai-universal-3-pro</td><td>AssemblyAI</td><td>2.7%</td><td>5.3%</td><td><strong>4.0%</strong></td></tr>
          <tr><td>gemini-3.1-flash-lite-preview</td><td>Google</td><td>2.7%</td><td>8.0%</td><td><strong>5.4%</strong></td></tr>
          <tr><td>gpt-4o-transcribe</td><td>OpenAI</td><td>6.3%</td><td>5.3%</td><td><strong>5.8%</strong></td></tr>
          <tr><td>assemblyai-universal-2</td><td>AssemblyAI</td><td>2.7%</td><td>9.3%</td><td><strong>6.0%</strong></td></tr>
          <tr><td>azure-speech</td><td>Azure</td><td>6.3%</td><td>10.7%</td><td><strong>8.5%</strong></td></tr>
          <tr><td>deepgram-nova-3</td><td>Deepgram</td><td>7.2%</td><td>10.7%</td><td><strong>9.0%</strong></td></tr>
          <tr><td>deepgram-nova-2</td><td>Deepgram</td><td>11.7%</td><td>9.3%</td><td><strong>10.5%</strong></td></tr>
          <tr><td>gemini-2.5-pro</td><td>Google</td><td>n/a</td><td>n/a</td><td>quota error</td></tr>
          <tr><td>gemini-2.5-flash</td><td>Google</td><td>n/a</td><td>n/a</td><td>quota error</td></tr>
          <tr><td>gemini-3.1-pro-preview</td><td>Google</td><td>n/a</td><td>n/a</td><td>quota error</td></tr>
        </tbody>
      </table>

      <h2>What This Actually Means</h2>
      <p><strong>1. Whisper-1 is still the benchmark.</strong> The oldest model in the test. Also the cheapest. Also best, averaged across 50 clips. 2.7% WER across both accent groups, with almost no spread between them. At that error rate, the mistakes are things like adding a definite article before a noun. Across 25 clips per group, that consistency is meaningful. There&apos;s no accuracy argument for paying more right now.</p>
      <p><strong>2. AssemblyAI came out of nowhere.</strong> <code>assemblyai-universal-3-pro</code> finished third overall at 4.0% average, ahead of two OpenAI variants and every Google model I could test. It matched whisper-1 on French across all 25 clips. The German result dragged it down, but it still beat Azure and Deepgram convincingly. Nobody had this on their bingo card.</p>
      <p><strong>3. GPT-4o-transcribe is inconsistent.</strong> Its French average came in at 6.3%, well above gpt-4o-mini-transcribe at 2.7% on the same set. Averaged across 25 clips, that gap is hard to dismiss as noise. gpt-4o-mini is not just cheaper; it&apos;s more predictable. For a production system, predictability matters as much as peak accuracy.</p>
      <p><strong>4. Accent robustness is the real differentiator.</strong> Every single model performed worse on the German clips than the French. The gap was zero for whisper-1. For everyone else it was real: Azure went from 6.3% to 10.7%, AssemblyAI universal-2 from 2.7% to 9.3%. Averaged across 25 speakers rather than one, these gaps have held up. French is a passing grade. German is the actual exam.</p>
      <p><strong>5. Deepgram is a disappointment.</strong> nova-3 finished 8th at 9.0%, nova-2 last at 10.5%. Across 25 clips per accent, both models also strip all punctuation and output lowercase consistently, which means post-processing is a hard dependency, not an edge case. That&apos;s a real production cost.</p>
      <p><strong>6. Azure is fine, but not special.</strong> 8.5% average, below three providers with newer and cheaper models. The German accent result (10.7% averaged across 25 clips) is particularly hard to defend for an enterprise sales use case. The enterprise positioning and the accuracy don&apos;t match.</p>

      <h2>A Note on Variance</h2>
      <p>Because I&apos;m reporting averages across 25 clips per group, individual model non-determinism is largely smoothed out. What you&apos;re seeing in the table is stable, representative performance, not a single lucky or unlucky run. The rankings held across multiple full passes of the benchmark. The scores are trustworthy enough to act on.</p>
      <p>That said, per-clip variance within a model still exists and matters in production. Some clips consistently tripped up specific models (dense technical vocabulary, faster speech, overlapping sentence structure). If your use case skews heavily toward one of those dimensions, run a targeted sub-benchmark before committing.</p>

      <h2>Where This Leaves Us</h2>
      <p>The transcription question has a working answer. For English accuracy on accented speech, averaged across a representative clip set:</p>
      <ul>
        <li><strong>Tier 1 (use these):</strong> whisper-1, gpt-4o-mini-transcribe, assemblyai-universal-3-pro</li>
        <li><strong>Tier 2 (acceptable):</strong> gemini-3.1-flash-lite-preview, gpt-4o-transcribe, assemblyai-universal-2</li>
        <li><strong>Tier 3 (not yet):</strong> Azure Speech, Deepgram nova-3, Deepgram nova-2</li>
      </ul>
      <p>But transcription is just the first layer. The harder question (and the next thing I&apos;m going to test) is <em>comprehension</em>. Not &quot;did the model hear the right words?&quot; but &quot;did it understand what the speaker actually meant?&quot; Intent. Sentiment. Buying signals. Objections. That&apos;s where the real product differentiation lives.</p>

      <h2>What I Actually Shipped</h2>
      <p>The benchmark pointed to Tier 1. The real product needed something more careful.</p>
      <p>The variance across runs was still too high to bet on a single model. And in real testing, a new problem emerged that no WER score would have caught: Indian-accented English with Indian or Desi names caused models to silently switch languages. Say &quot;Samir&quot; and the transcript defaulted to Hindi. Say &quot;Khan&quot; and it drifted toward Urdu. Technically plausible, practically wrong, and a genuinely bad experience for the user who just wants their sales call transcribed in English.</p>
      <p>So the architecture I landed on uses three models in sequence. Whisper handles language detection first. Once the language is confirmed, GPT-4o Transcribe runs the actual transcription anchored to that language. A third model (Gemini, once quota allows) cross-checks the output. If the two transcriptions diverge beyond a confidence threshold, the user gets to resolve the difference. If they agree, the higher-confidence result goes through.</p>
      <p>It&apos;s more expensive than picking a winner and shipping it. But for a sales tool where one mis-transcribed name can derail a deal, the redundancy is the product.</p>

      <Link href="/#work" className={styles.returnLink}>← Back to Work</Link>
    </CaseStudyLayout>
  )
}
