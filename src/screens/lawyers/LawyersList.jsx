import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiFilter, FiRefreshCcw, FiSearch, FiPhone, FiMapPin, FiCalendar, FiShield, FiUser, FiMoreVertical, FiEye, FiEdit3, FiUsers, FiCheckCircle, FiClock, FiSlash, FiZap, FiX, FiTrash2 } from 'react-icons/fi'
import Avatar from '../../components/Avatar.jsx'
import RatingStars from '../../components/RatingStars.jsx'
import StatusPill from '../../components/StatusPill.jsx'
import { lawyers as seed } from '../../mock/db.js'

export default function LawyersList() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [license, setLicense] = useState('')
  const [city, setCity] = useState('')
  const [activeNow, setActiveNow] = useState('')
  const [spec, setSpec] = useState('')
  const [rating, setRating] = useState('')
  const [autoAssign, setAutoAssign] = useState('')
  const [joined, setJoined] = useState('')

  const filtered = useMemo(()=> seed.filter(l =>
    (q? (l.name.includes(q) || l.phone.includes(q)) : true) &&
    (status? l.status === status : true) &&
    (license? l.license.status === license : true) &&
    (city? l.city === city : true) &&
    (activeNow? String(l.activeNow) === activeNow : true) &&
    (spec? l.mainSpec === spec : true) &&
    (rating? (rating === 'بدون' ? !l.rating : (rating === 'الأعلى' ? l.rating >= 4.5 : l.rating < 4.0)) : true) &&
    (autoAssign? String(l.autoAssign || false) === autoAssign : true)
  ), [q,status,license,city,activeNow,spec,rating,autoAssign])

  const data = useMemo(() => {
    const rows = [...filtered]
    if (joined === 'منضم حديثًا') {
      rows.sort((a,b)=> new Date(b.joinedAt) - new Date(a.joinedAt))
    } else if (joined === 'قديم') {
      rows.sort((a,b)=> new Date(a.joinedAt) - new Date(b.joinedAt))
    }
    return rows
  }, [filtered, joined])

  const cities = Array.from(new Set(seed.map(l=>l.city)))
  const specs = Array.from(new Set(seed.map(l=>l.mainSpec)))

  const clearFilters = () => {
    setQ(''); setStatus(''); setLicense(''); setCity(''); setActiveNow(''); setSpec(''); setRating(''); setAutoAssign(''); setJoined('')
  }

  // Stats on current scope (other filters applied)
  const scope = useMemo(()=> [...filtered], [filtered])
  const stats = useMemo(()=> ({
    total: scope.length,
    verified: scope.filter(l=>l.status==='موثق').length,
    pending: scope.filter(l=>l.status==='قيد المراجعة').length,
    suspended: scope.filter(l=>l.status==='موقوف').length,
    rejected: scope.filter(l=>l.status==='مرفوض').length,
    activeNow: scope.filter(l=>l.activeNow).length
  }), [scope])

  // Active filter chips
  const chips = useMemo(()=> {
    const arr = []
    if (q) arr.push({key:'q', label:`بحث: ${q}`, clear:()=>setQ('')})
    if (status) arr.push({key:'status', label:`حالة: ${status}`, clear:()=>setStatus('')})
    if (license) arr.push({key:'license', label:`ترخيص: ${license}`, clear:()=>setLicense('')})
    if (city) arr.push({key:'city', label:`مدينة: ${city}`, clear:()=>setCity('')})
    if (activeNow) arr.push({key:'activeNow', label:`نشاط: ${activeNow==='true'?'نشط':'غير نشط'}`, clear:()=>setActiveNow('')})
    if (spec) arr.push({key:'spec', label:`تخصص: ${spec}`, clear:()=>setSpec('')})
    if (rating) arr.push({key:'rating', label:`تقييم: ${rating}` , clear:()=>setRating('')})
    if (autoAssign) arr.push({key:'autoAssign', label:`ترشيح: ${autoAssign==='true'?'مفعل':'غير مفعل'}`, clear:()=>setAutoAssign('')})
    if (joined) arr.push({key:'joined', label:`انضمام: ${joined}`, clear:()=>setJoined('')})
    return arr
  }, [q,status,license,city,activeNow,spec,rating,autoAssign,joined])

  return (
    <div className="grid" style={{gap:16}}>
      <div className="card" style={{position:'sticky', top:0, zIndex:5}}>
        <div className="filters" role="toolbar" aria-label="شريط الفلاتر">
          <div className="search">
            <span className="icon-btn" aria-hidden><FiSearch /></span>
            <input className="input" placeholder="بحث بالاسم أو الجوال" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <select className="select" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">حالة الحساب</option>
            {['قيد المراجعة','موثق','مرفوض','موقوف'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={license} onChange={e=>setLicense(e.target.value)}>
            <option value="">حالة الترخيص</option>
            {['ساري','منتهي','مرفوض','قيد المراجعة'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={activeNow} onChange={e=>setActiveNow(e.target.value)}>
            <option value="">النشاط الفوري</option>
            <option value="true">نشط</option>
            <option value="false">غير نشط</option>
          </select>
          <select className="select" value={city} onChange={e=>setCity(e.target.value)}>
            <option value="">المدينة</option>
            {cities.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select" value={spec} onChange={e=>setSpec(e.target.value)}>
            <option value="">التخصص</option>
            {specs.map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={rating} onChange={e=>setRating(e.target.value)}>
            <option value="">التقييم</option>
            {['الأعلى','الأقل','بدون'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={autoAssign} onChange={e=>setAutoAssign(e.target.value)}>
            <option value="">الترشيح التلقائي</option>
            <option value="true">مفعل</option>
            <option value="false">غير مفعل</option>
          </select>
          <select className="select" value={joined} onChange={e=>setJoined(e.target.value)}>
            <option value="">تاريخ الانضمام</option>
            {['منضم حديثًا','قديم'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <button className="btn-icon" title="إعادة تعيين" onClick={clearFilters}><FiRefreshCcw /></button>
        </div>
        <div style={{marginTop:10, fontSize:12, color:'var(--gray-70)'}}>{data.length} نتيجة</div>
      </div>

      {chips.length > 0 && (
        <div className="row" style={{gap:8}} aria-label="عوامل مفعّلة">
          {chips.map(c => (
            <span key={c.key} className="chip dismissible">
              {c.label}
              <button className="close" aria-label={`إزالة ${c.label}`} onClick={c.clear}><FiX size={14} /></button>
            </span>
          ))}
        </div>
      )}

      <div className="stats-grid">
        <StatCard label="إجمالي" value={stats.total} icon={<FiUsers />} onClick={()=> setStatus('')} active={status===''} />
        <StatCard label="موثق" value={stats.verified} icon={<FiCheckCircle />} onClick={()=> setStatus(prev=> prev==='موثق'? '' : 'موثق')} active={status==='موثق'} />
        <StatCard label="قيد المراجعة" value={stats.pending} icon={<FiClock />} onClick={()=> setStatus(prev=> prev==='قيد المراجعة'? '' : 'قيد المراجعة')} active={status==='قيد المراجعة'} />
        <StatCard label="موقوف" value={stats.suspended} icon={<FiSlash />} onClick={()=> setStatus(prev=> prev==='موقوف'? '' : 'موقوف')} active={status==='موقوف'} />
        <StatCard label="مرفوض" value={stats.rejected} icon={<FiX />} onClick={()=> setStatus(prev=> prev==='مرفوض'? '' : 'مرفوض')} active={status==='مرفوض'} />
        <StatCard label="نشط فوريًا" value={stats.activeNow} icon={<FiZap />} onClick={()=> setActiveNow(prev=> prev==='true'? '' : 'true')} active={activeNow==='true'} />
      </div>

      {data.length === 0 ? (
        <div className="card" style={{textAlign:'center', padding:40}}>
          <div style={{fontSize:18, fontWeight:800, color:'var(--secondary-700)'}}>لا يوجد محامون مسجلون</div>
          <div style={{color:'#757575'}}>حاول تعديل معايير البحث أو إضافة بيانات</div>
        </div>
      ) : (
        <div className="card-grid">
          {data.map(l => (
            <LawyerCard key={l.id} l={l} />
          ))}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, icon, onClick, active }) {
  return (
    <button type="button" className="stat-card" onClick={onClick} aria-pressed={active} title={label}>
      <div className="kv" style={{gap:4}}>
        <span className="label">{label}</span>
        <span className="value">{value}</span>
      </div>
      <span className="icon">{icon}</span>
    </button>
  )
}

function LawyerCard({ l }) {
  const [autoAssign, setAutoAssign] = React.useState(!!l.autoAssign)
  const [status, setStatus] = React.useState(l.status)
  const [licenseStatus] = React.useState(l.license.status)

  const licenseBtnClass = licenseStatus === 'ساري' ? 'btn sm soft-secondary block' : 'btn sm soft-warning block'
  const autoAssignClass = autoAssign ? 'btn sm soft-warning block' : 'btn sm soft-success block'
  const autoAssignLabel = autoAssign ? 'إلغاء الترشيح' : 'تفعيل الترشيح'
  const banClass = status === 'موقوف' ? 'btn sm soft-success block' : 'btn sm soft-warning block'
  const banLabel = status === 'موقوف' ? 'إلغاء الحظر' : 'حظر'

  return (
    <div className="card" style={{display:'grid', gap:10}}>
      <div className="row" style={{justifyContent:'space-between', alignItems:'start'}}>
        <div className="row" style={{gap:10, alignItems:'center'}}>
          <Avatar name={l.name} />
          <div>
            <div style={{fontWeight:800, color:'var(--secondary-700)'}}>{l.name}</div>
            <RatingStars value={l.rating || 0} />
          </div>
        </div>
        <details style={{position:'relative'}}>
          <summary className="icon-btn" title="إجراءات"><FiMoreVertical /></summary>
          <div className="card action-menu" style={{position:'absolute', top:40, insetInlineEnd:0, zIndex:10, minWidth:220}}>
            <div className="kv"><Link className="btn sm soft-info block" to={`/lawyers/${l.id}`}><FiEye /> عرض التفاصيل</Link></div>
            <div className="kv"><Link className="btn sm soft-primary block" to={`/lawyers/${l.id}/edit`}><FiEdit3 /> تعديل الحساب</Link></div>
            <div className="kv"><Link className={licenseBtnClass} to={`/lawyers/${l.id}/license`}><FiShield /> إدارة الترخيص</Link></div>
            <div className="kv"><button className={autoAssignClass} type="button" onClick={()=>setAutoAssign(v=>!v)}><FiZap /> {autoAssignLabel}</button></div>
            <div className="kv"><button className={banClass} type="button" onClick={()=> setStatus(s=> s==='موقوف' ? 'موثق' : 'موقوف')}><FiSlash /> {banLabel}</button></div>
            <div className="kv"><button className="btn sm soft-danger block" type="button"><FiTrash2 /> حذف الحساب</button></div>
          </div>
        </details>
      </div>

      <div className="divider" />

      <div className="grid cols-2">
        <div className="kv"><small><FiPhone /> الجوال</small><span>{l.phone}</span></div>
        <div className="kv"><small><FiMapPin /> المدينة</small><span>{l.city}</span></div>
        <div className="kv"><small><FiUser /> حالة الحساب</small><StatusPill kind="account" value={status} /></div>
        <div className="kv"><small><FiShield /> الترخيص</small><StatusPill kind="license" value={l.license.status} /></div>
        <div className="kv"><small><FiCalendar /> تاريخ الانضمام</small><span>{l.joinedAt}</span></div>
        <div className="kv"><small>التخصص</small><span className="chip">{l.mainSpec}</span></div>
        <div className="kv"><small>النشاط الفوري</small><StatusPill kind="activity" value={l.activeNow} /></div>
        <div className="kv"><small>الترشيح التلقائي</small><span className="chip">{autoAssign? 'مفعل':'غير مفعل'}</span></div>
      </div>
    </div>
  )
}
