import React from 'react'

const map = {
  account: {
    'قيد المراجعة': { cls: 'warning', text: 'قيد المراجعة' },
    'موثق': { cls: 'success', text: 'موثق' },
    'مرفوض': { cls: 'error', text: 'مرفوض' },
    'موقوف': { cls: 'error', text: 'موقوف' }
  },
  license: {
    'ساري': { cls: 'success', text: 'ترخيص ساري' },
    'منتهي': { cls: 'error', text: 'ترخيص منتهي' },
    'مرفوض': { cls: 'error', text: 'ترخيص مرفوض' },
    'قيد المراجعة': { cls: 'warning', text: 'ترخيص قيد المراجعة' }
  },
  activity: {
    true: { cls: 'success', text: 'متاح فوريًا' },
    false: { cls: 'warning', text: 'غير متاح' }
  },
  client: {
    'نشط': { cls: 'success', text: 'نشط' },
    'موقوف': { cls: 'warning', text: 'موقوف' },
    'محذوف': { cls: 'error', text: 'محذوف' }
  },
  consultation: {
    'قادمة': { cls: 'warning', text: 'قادمة' },
    'نشطة': { cls: 'success', text: 'نشطة' },
    'مكتملة': { cls: '', text: 'مكتملة' },
    'ملغاة': { cls: 'error', text: 'ملغاة' },
    'نزاع': { cls: 'error', text: 'نزاع' }
  }
}

export default function StatusPill({ kind, value }) {
  const m = map[kind]?.[value]
  if (!m) return null
  return <span className={`badge ${m.cls}`}>{m.text}</span>
}

