import React from 'react'
import { FiPlus, FiTrash2, FiEye, FiEdit3 } from 'react-icons/fi'

export default function ButtonsKit(){
  const Row = ({title, children}) => (
    <div className="card">
      <div className="section-title">{title}</div>
      <div className="row" style={{gap:8, flexWrap:'wrap'}}>{children}</div>
    </div>
  )

  const Btn = (props) => <button {...props} className={`btn ${props.className||''}`.trim()} />

  return (
    <div className="grid" style={{gap:16}}>
      <Row title="Primary">
        <Btn className="primary sm"><FiPlus /> صغير</Btn>
        <Btn className="primary md"><FiPlus /> متوسط</Btn>
        <Btn className="primary lg"><FiPlus /> كبير</Btn>
        <Btn className="primary md" disabled>معطل</Btn>
      </Row>
      <Row title="Secondary">
        <Btn className="secondary sm"><FiEye /> صغير</Btn>
        <Btn className="secondary md"><FiEye /> متوسط</Btn>
        <Btn className="secondary lg"><FiEye /> كبير</Btn>
        <Btn className="secondary md" disabled>معطل</Btn>
      </Row>
      <Row title="Outline">
        <Btn className="outline sm">صغير</Btn>
        <Btn className="outline md">متوسط</Btn>
        <Btn className="outline lg">كبير</Btn>
      </Row>
      <Row title="Ghost">
        <Btn className="ghost sm">صغير</Btn>
        <Btn className="ghost md">متوسط</Btn>
        <Btn className="ghost lg">كبير</Btn>
      </Row>
      <Row title="Status (Success/Warning/Danger)">
        <Btn className="success md"><FiPlus /> إضافة</Btn>
        <Btn className="warning md"><FiEdit3 /> تعديل</Btn>
        <Btn className="danger md"><FiTrash2 /> حذف</Btn>
      </Row>
      <Row title="Soft Variants (شفافة)">
        <Btn className="soft-info sm">تفاصيل</Btn>
        <Btn className="soft-primary sm">تعديل</Btn>
        <Btn className="soft-secondary sm">ترخيص</Btn>
        <Btn className="soft-success sm">تفعيل</Btn>
        <Btn className="soft-warning sm">إيقاف</Btn>
        <Btn className="soft-danger sm">حذف</Btn>
      </Row>
    </div>
  )
}

