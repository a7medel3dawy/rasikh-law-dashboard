import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { consultations, lawyers } from '../../mock/db.js'

export default function ReplaceLawyer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const row = consultations.find(cn=>cn.id===id)
  const [reason, setReason] = useState('غياب')
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(null)
  const filtered = useMemo(()=> lawyers.filter(l=> q? (l.name.includes(q) || l.mainSpec.includes(q) || l.city.includes(q)) : true), [q])
  const [saved, setSaved] = useState(false)

  const onSave = () => {
    if (!selected) return
    setSaved(true)
    setTimeout(()=> navigate(`/consultations/${id}`), 600)
  }

  if (!row) return <div className="card">لا يوجد بيانات</div>
  return (
    <div className="grid" style={{gap:16}}>
      <div className="card" style={{maxWidth:840}}>
        <div className="section-title">تبديل المحامي</div>
        <div className="field"><label>المحامي الحالي</label><div>{row.lawyer}</div></div>
        <div className="field"><label>سبب التبديل</label>
          <select className="select" value={reason} onChange={e=>setReason(e.target.value)}>
            {['غياب','اعتذار','مشكلة تقنية','أخرى'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="field"><label>اختر محاميًا جديدًا</label>
          <input className="input" placeholder="بحث بالاسم/التخصص/المدينة" value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div style={{maxHeight:260, overflow:'auto', border:'1px solid var(--gray-30)', borderRadius:12}}>
          <table className="table">
            <thead><tr><th>الاسم</th><th>التقييم</th><th>النشاط</th><th>السعر</th><th></th></tr></thead>
            <tbody>
              {filtered.map(l=> (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td>{l.rating}</td>
                  <td>{l.activeNow? 'متاح':'غير متاح'}</td>
                  <td>—</td>
                  <td><button className="btn ghost" onClick={()=>setSelected(l)}>اختيار</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
          <div className="card" style={{marginTop:12}}>
            <div className="section-title">المرشح المختار</div>
            <div className="grid cols-4">
              <div className="field"><label>الاسم</label><div>{selected.name}</div></div>
              <div className="field"><label>التقييم</label><div>{selected.rating}</div></div>
              <div className="field"><label>الحالة</label><div>{selected.activeNow? 'نشط':'غير نشط'}</div></div>
              <div className="field"><label>التخصص</label><div>{selected.mainSpec}</div></div>
            </div>
          </div>
        )}
        <div className="row" style={{marginTop:12}}>
          <button className="btn" onClick={onSave} disabled={!selected}>حفظ التبديل</button>
          <button className="btn ghost" onClick={()=>navigate(-1)}>إلغاء</button>
          {saved && <div className="badge success">تم التبديل وإشعار الأطراف</div>}
        </div>
      </div>
    </div>
  )
}

