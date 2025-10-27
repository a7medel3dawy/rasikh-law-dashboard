import React from 'react'
import { dashboardStats } from '../../mock/db.js'
import NotificationsPanel from '../../components/NotificationsPanel.jsx'
import { LineChart, PieChart, BarChart } from '../../components/Charts.jsx'
import { FiUsers, FiUserCheck, FiActivity, FiDollarSign, FiUserPlus, FiAlertTriangle, FiSlash, FiPlusSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { useAuthStore } from '../../store/auth.js'

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const s = dashboardStats
  const lineLabels = s.charts.dailySeries.map(d=>`اليوم ${d.day}`)
  const lineData = s.charts.dailySeries.map(d=>d.count)
  const pieLabels = s.charts.types.map(t=>t.label)
  const pieData = s.charts.types.map(t=>t.value)
  const barLabels = s.charts.topSpecs.map(t=>t.label)
  const barData = s.charts.topSpecs.map(t=>t.value)

  return (
    <div className="grid" style={{gap:20}}>
      <div className="card hero-card">
        <div className="title"><span className="emoji" aria-hidden>👋</span> مرحبًا {user?.name ? `، ${user.name}` : ''}</div>
        <div className="user-menu">
          <details>
            <summary className="avatar" title={user?.name || 'مشرف'}>{(user?.name || 'م')[0]}</summary>
            <div className="menu">
              <a className="item" href="/profile">الملف الشخصي</a>
              <button className="item" onClick={()=>{ logout(); window.location.href='/login'; }} style={{background:'transparent', border:'none'}}>تسجيل الخروج</button>
            </div>
          </details>
        </div>
      </div>
      <div className="stats-grid">
        <DashStat label="عدد المحامين" value={s.totals.lawyers} icon={<FiUserCheck />} />
        <DashStat label="عدد العملاء" value={s.totals.clients} icon={<FiUsers />} />
        <DashStat label="الاستشارات (إجمالي/نشطة/قادمة)" value={`${s.totals.consultations.total} / ${s.totals.consultations.active} / ${s.totals.consultations.upcoming}`} icon={<FiActivity />} />
        <DashStat label="إجمالي الإيرادات" value={`${s.totals.revenue.toLocaleString()} ر.س`} icon={<FiDollarSign />} />
      </div>

      <div className="stats-grid">
        <DashStat label="المحامون الجدد (7أيام)" value={s.quick.newLawyers7d} icon={<FiUserPlus />} />
        <DashStat label="العملاء الجدد (7أيام)" value={s.quick.newClients7d} icon={<FiUsers />} />
        <DashStat label="الملغاة (ي/أ/ش)" value={`${s.quick.cancelled.day}/${s.quick.cancelled.week}/${s.quick.cancelled.month}`} icon={<FiSlash />} />
        <DashStat label="النزاعات المفتوحة" value={s.quick.disputesOpen} icon={<FiAlertTriangle />} />
      </div>

      {/* Analytics modern layout */}
      <div className="card" style={{position:'relative', height:320}}>
        <div className="card-header"><div className="title">الاستشارات اليومية (آخر 30 يوم)</div></div>
        <div style={{position:'absolute', inset:16}}>
          <LineChart labels={lineLabels} data={lineData} title="عدد الاستشارات" />
        </div>
      </div>
      <div className="grid cols-2" style={{height:300}}>
        <div className="card" style={{position:'relative'}}>
          <div className="card-header"><div className="title">توزيع أنواع الاستشارات</div></div>
          <div style={{position:'absolute', inset:16}}>
            <PieChart labels={pieLabels} data={pieData} />
          </div>
        </div>
        <div className="card" style={{position:'relative'}}>
          <div className="card-header"><div className="title">أكثر التخصصات طلبًا</div></div>
          <div style={{position:'absolute', inset:16}}>
            <BarChart labels={barLabels} data={barData} title="عدد الطلبات" />
          </div>
        </div>
      </div>

      <div className="grid cols-2">
        <RecentTables />
        <NotificationsPanel items={s.notifications} />
      </div>

      <QuickActions />
    </div>
  )
}

function DashStat({ label, value, icon }) {
  return (
    <div className="stat-card" title={label}>
      <div className="kv" style={{gap:4}}>
        <span className="label">{label}</span>
        <span className="value">{value}</span>
      </div>
      <span className="icon">{icon}</span>
    </div>
  )
}

// Reuse DashStat for small cards as well

function RecentTables() {
  const { recents } = dashboardStats
  return (
    <div className="panel">
      <div className="panel-header">السجلات الأخيرة</div>
      <div className="panel-body grid cols-3">
        <div>
          <div className="section-title">آخر المحامين</div>
          <table className="table">
            <thead><tr><th>الاسم</th><th>الجوال</th></tr></thead>
            <tbody>
              {recents.lawyers.map(l=> (
                <tr key={l.id}><td>{l.name}</td><td>{l.phone}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="section-title">آخر العملاء</div>
          <table className="table">
            <thead><tr><th>الاسم</th><th>الجوال</th></tr></thead>
            <tbody>
              {recents.clients.map(c=> (
                <tr key={c.id}><td>{c.name}</td><td>{c.phone}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="section-title">آخر الاستشارات</div>
          <table className="table">
            <thead><tr><th>رقم</th><th>النوع</th></tr></thead>
            <tbody>
              {recents.consultations.map(cn=> (
                <tr key={cn.id}><td>{cn.id}</td><td>{cn.type}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <div className="panel">
      <div className="panel-header">روابط سريعة</div>
      <div className="panel-body row">
        <a className="btn" href="/specs"><FiPlusSquare /> إضافة تخصص جديد</a>
        <a className="btn secondary" href="/lawyers"><FiCheckCircle /> مراجعة محامي قيد المراجعة</a>
        <a className="btn ghost" href="/consultations"><FiAlertCircle /> الدخول إلى النزاعات</a>
      </div>
    </div>
  )
}
