import React from 'react'
import { FiStar } from 'react-icons/fi'

export default function RatingStars({ value = 0, size = 16 }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:4}}>
      {Array.from({length:5}).map((_,i)=> (
        <FiStar key={i} size={size} color={i < full ? '#ED8A0A' : '#C2C2C2'} fill={i < full ? '#ED8A0A' : 'transparent'} />
      ))}
      <span style={{fontSize:12, color:'#757575'}}>({value.toFixed(1)})</span>
    </div>
  )
}

