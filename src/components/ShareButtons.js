'use client'
import { useState, useEffect } from 'react'
import styles from './ShareButtons.module.css'

export default function ShareButtons() {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => { setUrl(window.location.href) }, [])

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Share</span>
      <div className={styles.buttons}>
        <a href={shareUrl} target="_blank" rel="noreferrer" className={styles.btn}>
          LinkedIn ↗
        </a>
        <button onClick={copyLink} className={`${styles.btn} ${styles.copy}`}>
          {copied ? 'Copied ✓' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
