import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { lawyers } from '../../mock/db.js'

export default function LicenseManagement() {
  const { id } = useParams()
  const navigate = useNavigate()
  const row = lawyers.find(l=>l.id===id)
  const [status, setStatus] = useState(row?.license.status || 'قيد المراجعة')
  const [saved, setSaved] = useState(false)

  if (!row) return <div className="card">لا يوجد بيانات</div>

  const onSave = () => {
    setSaved(true)
    setTimeout(()=> setSaved(false), 1200)
  }

  const hints = {
    'ساري': 'الحساب يصبح موثق',
    'مرفوض': 'الحساب يبقى غير مفعل',
    'منتهي': 'الحساب يصبح موقوف',
    'قيد المراجعة': 'الحساب يبقى معلق'
  }

  return (
    <div className="card" style={{maxWidth:720}}>
      <div className="section-title">إدارة الترخيص</div>
      <div className="grid cols-2">
        <div className="field"><label>رقم الترخيص</label><div>{row.license.number}</div></div>
        <div className="field"><label>تاريخ الانتهاء</label><div>{row.license.expiry}</div></div>
        <div className="field" style={{gridColumn:'1 / -1'}}>
          <label>الحالة الجديدة</label>
          <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
            {['قيد المراجعة','ساري','منتهي','مرفوض'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <div style={{fontSize:12, color:'var(--gray-70)', marginTop:6}}>تنبيه: {hints[status]}</div>
        </div>
      </div>
      <div className="row" style={{marginTop:12}}>
        <button className="btn" onClick={onSave}>حفظ</button>
        <button className="btn ghost" onClick={()=>navigate(-1)}>عودة</button>
        {saved && <div className="badge success">تم التحديث</div>}
      </div>
    </div>
  )
}

