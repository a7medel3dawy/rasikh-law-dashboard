import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { lawyers } from '../../mock/db.js'

export default function LawyerEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const row = lawyers.find(l=>l.id===id)
  const [form, setForm] = useState({
    name: row?.name || '',
    email: row?.email || '',
    phone: row?.phone || '',
    city: row?.city || ''
  })
  const [saved, setSaved] = useState(false)

  const onSave = (e) => {
    e.preventDefault()
    // mock update
    setSaved(true)
    setTimeout(()=> navigate(-1), 600)
  }

  if (!row) return <div className="card">لا يوجد بيانات</div>
  return (
    <form onSubmit={onSave} className="card" style={{maxWidth:800}}>
      <div className="section-title">تعديل بيانات الحساب</div>
      <div className="grid cols-2">
        <div className="field"><label>الاسم الكامل</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></div>
        <div className="field"><label>البريد الإلكتروني</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
        <div className="field"><label>رقم الجوال</label><input className="input" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required /></div>
        <div className="field"><label>المدينة</label><input className="input" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required /></div>
      </div>
      <div className="row" style={{marginTop:12}}>
        <button className="btn" type="submit">حفظ</button>
        <button className="btn ghost" type="button" onClick={()=>navigate(-1)}>إلغاء</button>
        {saved && <div className="badge success">تم الحفظ بنجاح</div>}
      </div>
    </form>
  )
}
