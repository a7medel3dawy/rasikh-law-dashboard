import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { specializations } from '../../mock/db.js'

export default function SpecEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const row = specializations.find(s=>s.id===id) || { name:'', status:'نشط', subs:[] }
  const [form, setForm] = useState({ name: row.name, status: row.status })
  const [saved, setSaved] = useState(false)

  const onSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(()=> navigate('/specs'), 500)
  }

  return (
    <form onSubmit={onSave} className="card" style={{maxWidth:720}}>
      <div className="section-title">{id? 'تعديل تخصص':'إضافة تخصص'}</div>
      <div className="grid cols-2">
        <div className="field"><label>اسم التخصص</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
        <div className="field">
          <label>الحالة</label>
          <select className="select" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            {['نشط','موقوف'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="row" style={{marginTop:12}}>
        <button className="btn" type="submit">حفظ</button>
        <button type="button" className="btn ghost" onClick={()=>navigate(-1)}>إلغاء</button>
        {saved && <div className="badge success">تم الحفظ</div>}
      </div>
    </form>
  )
}

