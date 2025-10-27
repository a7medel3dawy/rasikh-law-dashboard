import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiLayers, FiEye, FiEdit3, FiCheckCircle, FiTag } from 'react-icons/fi'
import { specializations as seed } from '../../mock/db.js'

export default function SpecsList() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const data = useMemo(()=> seed.filter(s=> (q? s.name.includes(q) : true) && (status? s.status===status : true)), [q,status])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="toolbar">
          <div className="row" style={{flex:1, minWidth:240, gap:6}}>
            <span className="icon-btn" aria-hidden><FiSearch /></span>
            <input className="input" placeholder="اسم التخصص" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">الحالة</option>
            {['نشط','موقوف'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <Link className="btn secondary" to="/specs/new/edit">إضافة تخصص</Link>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="card" style={{textAlign:'center', padding:40}}>لم تتم إضافة تخصصات بعد</div>
      ) : (
        <div className="card-grid">
          {data.map((s,idx) => (
            <div key={s.id} className="spec-card">
              <div className="head">
                <div className="name">{s.name}</div>
                <div className="thumb"><FiLayers /></div>
              </div>
              <div className="actions">
                <Link className="btn sm soft-info" to={`/specs/${s.id}`}><FiEye /> تفاصيل</Link>
                <Link className="btn sm soft-primary" to={`/specs/${s.id}/edit`}><FiEdit3 /> تعديل</Link>
              </div>
              <div className="footer">
                <span className={`pill ${s.status==='نشط' ? 'success':'warning'}`}><FiCheckCircle /> الحالة: {s.status}</span>
                <span className="pill neutral"><FiTag /> الفرعية: {s.subs.length}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
