import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { FiHome, FiUserCheck, FiUsers, FiLayers, FiMessageSquare, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '../store/auth.js'
import './admin-layout.css'

export default function AdminLayout() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()
  const [navOpen, setNavOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initial = (user?.name || 'م')[0]

  return (
    <div className={`app-shell ${navOpen? 'nav-open':''}`}>
      <aside className="sidebar" onClick={()=> setNavOpen(false)}>
        <div className="brand">
          <div className="logo">ر</div>
          <div className="brand-text">لوحة تحكم راسخ</div>
        </div>
        <nav className="menu">
          <NavLink to="/" end className={({isActive})=> isActive? 'item active':'item'}>
            <span className="i"><FiHome /></span>
            <span className="t">الرئيسية</span>
          </NavLink>
          <NavLink to="/lawyers" className={({isActive})=> isActive? 'item active':'item'}>
            <span className="i"><FiUserCheck /></span>
            <span className="t">إدارة المحامين</span>
          </NavLink>
          <NavLink to="/clients" className={({isActive})=> isActive? 'item active':'item'}>
            <span className="i"><FiUsers /></span>
            <span className="t">إدارة العملاء</span>
          </NavLink>
          <NavLink to="/specs" className={({isActive})=> isActive? 'item active':'item'}>
            <span className="i"><FiLayers /></span>
            <span className="t">إدارة التخصصات</span>
          </NavLink>
          <NavLink to="/consultations" className={({isActive})=> isActive? 'item active':'item'}>
            <span className="i"><FiMessageSquare /></span>
            <span className="t">إدارة الاستشارات</span>
          </NavLink>
        </nav>
      </aside>
      <main className="main">
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
