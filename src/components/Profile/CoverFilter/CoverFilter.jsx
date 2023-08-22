import React from 'react'

// coverDistortFilter
const CoverFilter = () => (
  <svg viewBox="0 0 180 100">
    <filter id="coverDistortFilter" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0 0.3" result="NOISE" numOctaves="2" />
      <feDisplacementMap in="SourceGraphic" in2="NOISE" scale="50" xChannelSelector="R" yChannelSelector="R"></feDisplacementMap>
    </filter>
  </svg>
)

export default CoverFilter
