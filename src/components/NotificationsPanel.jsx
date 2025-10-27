import React from 'react'

const typeMap = {
  warning: { className: 'badge warning', label: 'تنبيه' },
  error: { className: 'badge error', label: 'خطأ' },
  success: { className: 'badge success', label: 'نجاح' }
}

export default function NotificationsPanel({ items = [] }) {
  return (
    <div className="panel">
      <div className="panel-header">الإشعارات</div>
      <div className="panel-body" style={{display:'grid', gap:8}}>
        {items.length === 0 && <div style={{color:'#757575'}}>لا توجد إشعارات</div>}
        {items.map(n => (
          <div key={n.id} className="row" style={{justifyContent:'space-between'}}>
            <span>{n.text}</span>
            <span className={typeMap[n.type]?.className}>{typeMap[n.type]?.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

