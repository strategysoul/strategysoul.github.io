'use client'
import { useState } from 'react'
import styles from './EmailCapture.module.css'

export default function EmailCapture({ compact = false, dark = false }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ''} ${dark ? styles.dark : ''}`}>
      {submitted ? (
        <p className={styles.thanks}>You&apos;re in. New breakdowns coming your way.</p>
      ) : (
        <>
          <p className={styles.headline}>Get new strategy breakdowns in your inbox.</p>
          {!compact && (
            <p className={styles.sub}>Original thinking on product, brand, and market dynamics. No filler.</p>
          )}
          <form
            action="https://formspree.io/f/REPLACE_WITH_FORM_ID"
            method="POST"
            className={styles.form}
            onSubmit={() => setSubmitted(true)}
          >
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Subscribe</button>
          </form>
        </>
      )}
    </div>
  )
}
