import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiPhone, FiMapPin, FiUser, FiShield, FiCalendar } from 'react-icons/fi'
import { lawyers } from '../../mock/db.js'
import Avatar from '../../components/Avatar.jsx'
import RatingStars from '../../components/RatingStars.jsx'
import StatusPill from '../../components/StatusPill.jsx'

export default function LawyerProfile() {
  const { id } = useParams()
  const lawyer = lawyers.find(l=>l.id===id)
  if (!lawyer) return <div className="card">لا يوجد بيانات</div>
  return (
    <div className="grid" style={{gap:16}}>
      <div className="card" style={{display:'grid', gap:12}}>
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <div className="row" style={{gap:10, alignItems:'center'}}>
            <Avatar name={lawyer.name} size={56} />
            <div>
              <div className="section-title" style={{margin:0}}>{lawyer.name}</div>
              <RatingStars value={lawyer.rating || 0} />
            </div>
          </div>
          <div className="row" style={{gap:6}}>
            <Link className="btn ghost" to="/lawyers">عودة</Link>
            <Link className="btn" to={`/lawyers/${id}/edit`}>تعديل بيانات</Link>
            <Link className="btn secondary" to={`/lawyers/${id}/license`}>إدارة الترخيص</Link>
          </div>
        </div>
        <div className="grid cols-3">
          <div className="kv"><small><FiPhone /> الجوال</small><span>{lawyer.phone}</span></div>
          <div className="kv"><small><FiMapPin /> المدينة</small><span>{lawyer.city}</span></div>
          <div className="kv"><small><FiUser /> حالة الحساب</small><StatusPill kind="account" value={lawyer.status} /></div>
          <div className="kv"><small>التخصص الرئيسي</small><span className="chip">{lawyer.mainSpec}</span></div>
          <div className="kv"><small><FiCalendar /> انضم</small><span>{lawyer.joinedAt}</span></div>
        </div>
      </div>
      <div className="card">
        <div className="section-title">الترخيص</div>
        <div className="grid cols-3">
          <div className="kv"><small>رقم الترخيص</small><span>{lawyer.license.number}</span></div>
          <div className="kv"><small><FiShield /> الحالة</small><StatusPill kind="license" value={lawyer.license.status} /></div>
          <div className="kv"><small><FiCalendar /> تاريخ الانتهاء</small><span>{lawyer.license.expiry}</span></div>
        </div>
      </div>
    </div>
  )
}
