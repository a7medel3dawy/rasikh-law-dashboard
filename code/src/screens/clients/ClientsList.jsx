import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'
import Avatar from '../../components/Avatar.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { clients as seed } from '../../mock/db.js'

export default function ClientsList() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [city, setCity] = useState('')

  const data = useMemo(()=> seed.filter(c =>
    (q? (c.name.includes(q) || c.phone.includes(q)) : true) &&
    (status? c.status === status : true) &&
    (city? c.city === city : true)
  ), [q,status,city])

  const cities = Array.from(new Set(seed.map(c=>c.city)))

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="filters" role="toolbar" aria-label="شريط الفلاتر">
          <div className="search">
            <span className="icon-btn" aria-hidden><FiSearch /></span>
            <input className="input" placeholder="بحث بالاسم أو الجوال" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">حالة الحساب</option>
            {['نشط','موقوف','محذوف'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
            <option value="">المدينة</option>
            {cities.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="card" style={{textAlign:'center', padding:40}}>لا يوجد عملاء مسجلون حاليا</div>
      ) : (
        <div className="card-grid">
          {data.map(c => (
            <div key={c.id} className="card" style={{display:'grid', gap:10}}>
              <div className="row" style={{gap:10, alignItems:'center', justifyContent:'space-between'}}>
                <div className="row" style={{gap:10, alignItems:'center'}}>
                  <Avatar name={c.name} />
                  <div>
                    <div style={{fontWeight:800, color:'var(--secondary-700)'}}>{c.name}</div>
                    <StatusPill kind="client" value={c.status} />
                  </div>
                </div>
                <div className="row" style={{gap:6}}>
                  <Link className="btn ghost" to={`/clients/${c.id}`}>تفاصيل</Link>
                  <Link className="btn ghost" to={`/clients/${c.id}/edit`}>تعديل</Link>
                </div>
              </div>
              <div className="grid cols-2">
                <div className="kv"><small><FiPhone /> الجوال</small><span>{c.phone}</span></div>
                <div className="kv"><small><FiMapPin /> المدينة</small><span>{c.city}</span></div>
                <div className="kv"><small><FiUser /> انضم</small><span>{c.joinedAt || '—'}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
