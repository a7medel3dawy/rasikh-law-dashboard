import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.js'
import Avatar from '../../components/Avatar.jsx'

export default function Profile(){
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  return (
    <div className="card" style={{maxWidth:720}}>
      <div className="card-header">
        <div className="title">الملف الشخصي</div>
        <div className="actions">
          <button className="btn danger" onClick={()=>{ logout(); navigate('/login') }}>تسجيل الخروج</button>
          <button className="btn ghost" onClick={()=>navigate(-1)}>عودة</button>
        </div>
      </div>
      <div className="row" style={{gap:10, alignItems:'center'}}>
        <Avatar name={user?.name || 'مشرف'} size={56} />
        <div>
          <div className="section-title" style={{margin:0}}>{user?.name || 'مشرف'}</div>
          <div style={{color:'var(--gray-70)'}}>{user?.email || 'admin@rasekh.local'}</div>
        </div>
      </div>
    </div>
  )
}

