import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { specializations } from '../../mock/db.js'
import { FiPlus, FiEdit3, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

export default function SpecDetails() {
  const { id } = useParams()
  const row = specializations.find(s=>s.id===id)
  const [subs, setSubs] = useState(row? [...row.subs] : [])
  const [adding, setAdding] = useState(false)
  const [subName, setSubName] = useState('')
  const [subStatus, setSubStatus] = useState('نشط')
  if (!row) return <div className="card">لا يوجد بيانات</div>
  return (
    <div className="card">
      <div className="card-header">
        <div className="title">تفاصيل التخصص</div>
        <div className="actions">
          <Link className="btn ghost" to="/specs">عودة</Link>
          <Link className="btn" to={`/specs/${id}/edit`}>تعديل</Link>
        </div>
      </div>
      <div className="grid cols-2">
        <div className="field"><label>اسم التخصص</label><div>{row.name}</div></div>
        <div className="field"><label>الحالة</label><div>{row.status}</div></div>
      </div>
      <div className="section-title" style={{marginTop:12}}>التخصصات الفرعية</div>
      <div className="row" style={{justifyContent:'space-between', marginBottom:8}}>
        <div style={{color:'var(--gray-70)'}}>عدد الفرعية: {subs.length}</div>
        <button className="btn secondary sm" onClick={()=> setAdding(v=>!v)}><FiPlus /> إضافة تخصص فرعي</button>
      </div>
      {adding && (
        <form onSubmit={(e)=>{ e.preventDefault(); if(!subName.trim()) return; const idn = 'SS-' + Math.floor(Math.random()*100000); setSubs([{id:idn, name: subName.trim(), status: subStatus}, ...subs]); setSubName(''); setSubStatus('نشط'); setAdding(false) }} className="card" style={{marginBottom:10}}>
          <div className="grid cols-3">
            <div className="field"><label>اسم التخصص الفرعي</label><input className="input" value={subName} onChange={e=>setSubName(e.target.value)} placeholder="مثال: طلاق" required /></div>
            <div className="field"><label>الحالة</label>
              <select className="select" value={subStatus} onChange={e=>setSubStatus(e.target.value)}>
                {['نشط','موقوف'].map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field" style={{alignSelf:'end'}}>
              <button className="btn" type="submit">حفظ</button>
            </div>
          </div>
        </form>
      )}
      <div className="spec-sub-grid">
        {subs.map((s,idx) => (
          <div key={s.id} className="spec-sub-card">
            <div className="top">
              <div className="title">{s.name}</div>
              <div className="btns">
                <button className="btn xs soft-primary"><FiEdit3 /> تعديل</button>
                <button className={`btn xs ${s.status==='نشط' ? 'soft-warning':'soft-success'}`} onClick={()=> setSubs(prev=> prev.map(x=> x.id===s.id? {...x, status: s.status==='نشط'?'موقوف':'نشط'}:x))}>
                  {s.status==='نشط'? <><FiToggleLeft /> إيقاف</> : <><FiToggleRight /> تفعيل</>}
                </button>
                <button className="btn xs soft-danger"><FiTrash2 /> حذف</button>
              </div>
            </div>
            <div className="statusbar" />
            <span className={`pill ${s.status==='نشط' ? 'success':'warning'}`}>الحالة: {s.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
