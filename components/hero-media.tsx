"use client"

import { useState } from "react"

export function HeroMedia() {
  const [videoFailed, setVideoFailed] = useState(false)

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <img
        src="/images/hero-dubai-skyline.jpeg"
        alt="Dubai skyline at sunset"
        className="absolute inset-0 size-full object-cover object-center"
      />
      {!videoFailed && (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-dubai-skyline.jpeg"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 size-full object-cover object-center"
        >
          <source src="/videos/hero-dubai.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-background" />
    </div>
  )
}
