import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiClock, FiUser, FiBriefcase, FiDollarSign, FiCalendar } from 'react-icons/fi'
import StatusPill from '../../components/StatusPill.jsx'
import { consultations as seed } from '../../mock/db.js'

export default function ConsultationsList() {
  const [q, setQ] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [duration, setDuration] = useState('')

  const data = useMemo(()=> seed.filter(cn =>
    (q? (cn.id.includes(q) || cn.client.includes(q) || cn.lawyer.includes(q)) : true) &&
    (type? cn.type === type : true) &&
    (status? cn.status === status : true) &&
    (duration? String(cn.duration) === duration : true)
  ), [q,type,status,duration])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="filters" role="toolbar" aria-label="شريط الفلاتر">
          <div className="search">
            <span className="icon-btn" aria-hidden><FiSearch /></span>
            <input className="input" placeholder="بحث (رقم/اسم)" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <select className="select" value={type} onChange={e=>setType(e.target.value)}>
            <option value="">نوع الاستشارة</option>
            {['فورية','كتابية','مجدولة'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">الحالة</option>
            {['قادمة','نشطة','مكتملة','ملغاة','نزاع'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={duration} onChange={e=>setDuration(e.target.value)}>
            <option value="">المدة</option>
            {[15,30,45].map(s=> <option key={s} value={s}>{s} دقيقة</option>)}
          </select>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="card" style={{textAlign:'center', padding:40}}>لا توجد بيانات</div>
      ) : (
        <div className="card-grid">
          {data.map(cn => (
            <div key={cn.id} className="card" style={{display:'grid', gap:10}}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <div className="row" style={{gap:8, alignItems:'center'}}>
                  <div className="chip">رقم: {cn.id}</div>
                  <StatusPill kind="consultation" value={cn.status} />
                </div>
                <div className="row" style={{gap:6}}>
                  <Link className="btn ghost" to={`/consultations/${cn.id}`}>تفاصيل</Link>
                  <Link className="btn ghost" to={`/consultations/${cn.id}/replace-lawyer`}>تبديل محامي</Link>
                </div>
              </div>
              <div className="grid cols-2">
                <div className="kv"><small><FiUser /> العميل</small><span>{cn.client}</span></div>
                <div className="kv"><small><FiUser /> المحامي</small><span>{cn.lawyer}</span></div>
                <div className="kv"><small><FiBriefcase /> النوع</small><span>{cn.type}</span></div>
                <div className="kv"><small><FiClock /> المدة</small><span>{cn.duration} دقيقة</span></div>
                <div className="kv"><small><FiCalendar /> التاريخ</small><span>{cn.createdAt}</span></div>
                <div className="kv"><small><FiDollarSign /> السعر</small><span>{cn.price} ر.س</span></div>
                <div className="kv" style={{gridColumn:'1 / -1'}}><small>التخصص</small><span className="chip">{cn.spec}</span></div>
              </div>
              <div className="row" style={{gap:6, justifyContent:'end'}}>
                <button className="btn ghost">إلغاء</button>
                <button className="btn ghost">فتح نزاع</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
