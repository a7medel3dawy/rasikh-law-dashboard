import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { consultations } from '../../mock/db.js'
import { FiUser, FiUserCheck, FiBriefcase, FiClock, FiDollarSign, FiCalendar, FiFileText, FiMic, FiShield, FiRotateCw, FiAlertTriangle } from 'react-icons/fi'

export default function ConsultationDetails() {
  const { id } = useParams()
  const row = consultations.find(cn=>cn.id===id)
  if (!row) return <div className="card">لا يوجد بيانات</div>
  return (
    <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="card-header">
          <div className="title">تفاصيل الاستشارة</div>
          <div className="actions">
            <Link className="btn ghost" to="/consultations">عودة</Link>
            <Link className="btn" to={`/consultations/${id}/replace-lawyer`}><FiShield /> تبديل محامي</Link>
            <button className="btn secondary"><FiAlertTriangle /> فتح نزاع</button>
          </div>
        </div>
        <div className="grid cols-3">
          <div className="kv"><small># رقم الاستشارة</small><span className="chip">{row.id}</span></div>
          <div className="kv"><small><FiBriefcase /> النوع</small><span>{row.type}</span></div>
          <div className="kv"><small>التخصص</small><span className="chip">{row.spec}</span></div>
          <div className="kv"><small><FiClock /> المدة</small><span>{row.duration} دقيقة</span></div>
          <div className="kv"><small><FiDollarSign /> السعر</small><span>{row.price} ر.س</span></div>
          <div className="kv"><small>الحالة</small><span className="chip">{row.status}</span></div>
          {row.schedule && <div className="kv"><small><FiCalendar /> الموعد</small><span>{row.schedule}</span></div>}
        </div>
      </div>

      <div className="grid cols-2">
        <div className="card">
          <div className="card-header"><div className="title">العميل</div></div>
          <div className="grid cols-3">
            <div className="kv"><small><FiUser /> الاسم</small><span>{row.client}</span></div>
            <div className="kv"><small>المدينة</small><span>{row.clientCity || 'غير متوفر'}</span></div>
            <div className="kv"><small>الجوال</small><span>{row.clientPhone || 'غير متوفر'}</span></div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><div className="title">المحامي</div></div>
          <div className="grid cols-3">
            <div className="kv"><small><FiUserCheck /> الاسم</small><span>{row.lawyer}</span></div>
            <div className="kv"><small>المدينة</small><span>{row.lawyerCity || 'غير متوفر'}</span></div>
            <div className="kv"><small>رقم الترخيص</small><span>{row.lawyerLicense || 'غير متوفر'}</span></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><div className="title">محتوى الاستشارة</div></div>
        <div className="grid cols-2">
          <div className="kv"><small><FiFileText /> العنوان</small><span>{row.title || '—'}</span></div>
          <div className="kv"><small>الوصف</small><span>{row.description || '—'}</span></div>
          <div className="kv" style={{gridColumn:'1 / -1'}}><small>المرفقات</small>
            <span>
              {row.attachments && row.attachments.length > 0 ? (
                row.attachments.map((f,i)=> <span key={i} className="chip" style={{marginInlineStart:6}}>{f.name}</span>)
              ) : '—'}
            </span>
          </div>
          <div className="kv" style={{gridColumn:'1 / -1'}}><small><FiMic /> مذكرة صوتية</small><span>{row.voiceNote? 'موجودة':'—'}</span></div>
        </div>
        <div className="row" style={{gap:6, justifyContent:'end'}}>
          <button className="btn danger">إلغاء الاستشارة</button>
        </div>
      </div>
    </div>
  )
}
