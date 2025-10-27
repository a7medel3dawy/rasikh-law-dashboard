import React from 'react'

export default function Avatar({ name = '—', size = 48 }) {
  const letter = name?.trim()?.[0] || 'ر'
  return (
    <div style={{width:size, height:size, borderRadius:12, background:'var(--secondary-500)', color:'#fff', display:'grid', placeItems:'center', fontWeight:800}}>
      {letter}
    </div>
  )
}

