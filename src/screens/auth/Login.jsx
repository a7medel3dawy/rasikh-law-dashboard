import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.js'
import { FiLogIn, FiShield, FiMail, FiLock } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function Login() {
  const navigate = useNavigate()
  const { login, loginError, isAuthed } = useAuthStore()
  const [email, setEmail] = useState('admin@rasekh.local')
  const [password, setPassword] = useState('admin123')
  const [show, setShow] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const ok = await login({ email, password })
    if (ok) navigate('/')
  }

  if (isAuthed) return null

  return (
    <div className="login-hero" style={{minHeight:'100dvh',display:'grid',placeItems:'center'}}>
      {/* Animated icons background using framer-motion */}
      <div className="bg-anim" aria-hidden>
        <motion.svg className="shape1" viewBox="0 0 64 64" initial={{ y:-6 }} animate={{ y:[-6,6,-6] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }}>
          {/* Scale of justice simplified */}
          <path d="M32 8v18m-16 0h32M16 26l-8 10h16l-8-10zm32 0l-8 10h16l-8-10zM24 36v12m16-12v12M20 52h24" strokeWidth="2"/>
        </motion.svg>
        <motion.svg className="shape2" viewBox="0 0 64 64" initial={{ x:10 }} animate={{ x:[10,-10,10] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}>
          {/* Law book */}
          <path d="M16 12h28a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H16z" strokeWidth="2"/>
          <path d="M22 20h20M22 28h20M22 36h12" strokeWidth="2"/>
        </motion.svg>
        <motion.svg className="shape3" viewBox="0 0 64 64" initial={{ rotate:0 }} animate={{ rotate:[0,6,-6,0] }} transition={{ duration:7, repeat:Infinity, ease:'easeInOut' }}>
          {/* Pen */}
          <path d="M12 52l8-2 28-28-6-6-28 28-2 8z" strokeWidth="2"/>
          <circle cx="44" cy="20" r="2" strokeWidth="2"/>
        </motion.svg>
        <motion.svg className="shape4" viewBox="0 0 64 64" initial={{ y:8 }} animate={{ y:[8,-8,8] }} transition={{ duration:9, repeat:Infinity, ease:'easeInOut' }}>
          {/* Shield */}
          <path d="M32 8l16 6v12c0 12-7 22-16 28-9-6-16-16-16-28V14z" strokeWidth="2"/>
        </motion.svg>
      </div>

      <form onSubmit={onSubmit} className="card login-card animate-in" style={{position:'relative', zIndex:1}}>
        <div style={{display:'grid',gap:12}}>
          <div style={{textAlign:'center', marginBottom: 4}}>
            <div style={{display:'inline-grid', placeItems:'center', width:56, height:56, borderRadius:14, background:'var(--secondary-500)', color:'#fff', marginBottom:8}}><FiShield size={26} /></div>
            <div style={{fontWeight:800, fontSize:22, color:'var(--secondary-700)'}}>تسجيل الدخول للوحة التحكم</div>
            <div style={{fontSize:13, color:'var(--gray-70)'}}>مرحبًا بك في لوحة تحكم راسخ</div>
          </div>
          <div className="field">
            <label>البريد الإلكتروني</label>
            <div className="icon-field">
              <FiMail className="icon" />
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@email.com" required />
            </div>
          </div>
          <div className="field">
            <label>كلمة المرور</label>
            <div className="row" style={{padding:0, width:'100%'}}>
              <div className="icon-field" style={{flex:1}}>
                <FiLock className="icon" />
                <input className="input" type={show? 'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <button type="button" className="btn ghost" onClick={()=>setShow(v=>!v)}>{show? 'إخفاء':'إظهار'}</button>
            </div>
          </div>
          {loginError && <div className="badge error" role="alert">{loginError}</div>}
          <button className="btn lg gradient" type="submit"><FiLogIn /> تسجيل الدخول</button>
          <div style={{fontSize:12, color:'var(--gray-70)', textAlign:'center'}}>استخدم البريد: admin@rasekh.local وكلمة المرور: admin123</div>
        </div>
      </form>
    </div>
  )
}
