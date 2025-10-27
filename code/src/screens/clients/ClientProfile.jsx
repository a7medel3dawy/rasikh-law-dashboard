import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiPhone, FiMapPin, FiUser } from 'react-icons/fi'
import { clients } from '../../mock/db.js'
import Avatar from '../../components/Avatar.jsx'
import StatusPill from '../../components/StatusPill.jsx'

export default function ClientProfile() {
  const { id } = useParams()
  const row = clients.find(c=>c.id===id)
  if (!row) return <div className="card">لا يوجد بيانات</div>
  return (
    <div className="card" style={{display:'grid', gap:12}}>
      <div className="card-header">
        <div className="title">بيانات العميل</div>
        <div className="actions">
          <Link className="btn ghost" to="/clients">عودة</Link>
          <Link className="btn" to={`/clients/${id}/edit`}>تعديل</Link>
        </div>
      </div>
      <div className="row" style={{gap:10, alignItems:'center'}}>
        <Avatar name={row.name} />
        <div style={{display:'grid', gap:6}}>
          <div className="section-title" style={{margin:0}}>{row.name}</div>
          <StatusPill kind="client" value={row.status} />
        </div>
      </div>
      <div className="grid cols-3">
        <div className="kv"><small><FiPhone /> الجوال</small><span>{row.phone}</span></div>
        <div className="kv"><small><FiMapPin /> المدينة</small><span>{row.city}</span></div>
        <div className="kv"><small><FiUser /> البريد الإلكتروني</small><span>—</span></div>
      </div>
    </div>
  )
}
