// Mock data — scaled up
const cities = ['الرياض','جدة','مكة','المدينة','الدمام','الطائف','أبها','تبوك','حائل','بريدة']
const firstNames = ['أحمد','محمد','سالم','مازن','طارق','علي','عبدالله','عبدالرحمن','إبراهيم','حسن','سارة','منى','ريم','نسرين','آية','غادة','نهى','مشاعل','نورة','وداد']
const lastNames = ['الشاذلي','الحربي','القحطاني','الغامدي','القرشي','الزهراني','العنزي','الحارثي','المطيري','السبيعي']
const mainSpecs = [
  { name:'أحوال شخصية', subs:['زواج','طلاق','حضانة','نفقة'] },
  { name:'تجاري', subs:['شركات','علامات تجارية','عقود'] },
  { name:'جنائي', subs:['قضايا مخدرات','اعتداء','سرقة'] },
  { name:'عمالي', subs:['عقد عمل','فصل تعسفي','مكافأة نهاية خدمة'] },
  { name:'عقاري', subs:['إفراغات','منازعات إيجار','ملكية'] },
  { name:'مروري', subs:['حادث مروري','تعويض','مخالفات'] },
  { name:'إداري', subs:['ديوان المظالم','قرارات إدارية','عقود حكومية'] },
  { name:'ضريبي', subs:['زكاة','قيمة مضافة','اعتراض'] },
  { name:'تنفيذي', subs:['سندات تنفيذ','إيقاف خدمات','حجز'] },
  { name:'مالي', subs:['مطالبات مالية','شيكات','كمبيالات'] },
  { name:'مدني', subs:['تعويض','مسؤولية مدنية','مطالبات'] },
  { name:'تأمين', subs:['مركبات','تجاري','صحي'] }
]

function choice(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function pad(n){ return n.toString().padStart(2,'0') }
function dateStr(d){ return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}` }
function dateTime(d){ return `${dateStr(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}` }

// Specializations list
export const specializations = mainSpecs.map((m, i) => ({
  id: `S-${i+1}`,
  name: m.name,
  status: 'نشط',
  subs: m.subs.map((s, j) => ({ id: `SS-${(i+1)}${pad(j+1)}`, name: s, status: 'نشط' }))
}))

// Generate 50 lawyers
export const lawyers = Array.from({length:50}, (_,i)=>{
  const joined = new Date(); joined.setDate(joined.getDate() - Math.floor(Math.random()*90))
  const spec = choice(mainSpecs).name
  const statuses = ['موثق','قيد المراجعة','موقوف','مرفوض']
  const licStatuses = ['ساري','قيد المراجعة','منتهي','مرفوض']
  const expiry = new Date(); expiry.setDate(expiry.getDate() + (30 + Math.floor(Math.random()*360)))
  return {
    id: `L-${1001+i}`,
    name: `${choice(firstNames)} ${choice(lastNames)}`,
    phone: `05${pad(Math.floor(10000000 + Math.random()*89999999))}`,
    city: choice(cities),
    activeNow: Math.random()>0.5,
    autoAssign: Math.random()>0.6,
    joinedAt: dateStr(joined),
    status: choice(statuses),
    rating: +(3 + Math.random()*2).toFixed(1),
    mainSpec: spec,
    license: { number: `LIC-2025-${pad(i+1)}`, status: choice(licStatuses), expiry: dateStr(expiry) }
  }
})

// Generate 50 clients
export const clients = Array.from({length:50}, (_,i)=>{
  const joined = new Date(); joined.setDate(joined.getDate() - Math.floor(Math.random()*90))
  const statuses = ['نشط','موقوف','محذوف']
  return {
    id: `C-${2001+i}`,
    name: `${choice(firstNames)} ${choice(lastNames)}`,
    phone: `05${pad(Math.floor(10000000 + Math.random()*89999999))}`,
    city: choice(cities),
    status: choice(statuses),
    joinedAt: dateStr(joined)
  }
})

// Generate many consultations linking lawyers/clients
const types = ['فورية','كتابية','مجدولة']
const statusesC = ['قادمة','نشطة','مكتملة','ملغاة','نزاع']
const durations = [15,30,45]
const titles = ['استشارة عامة','مراجعة عقد','صياغة لائحة','نصيحة قانونية','متابعة قضية']
export const consultations = Array.from({length:120}, (_,i)=>{
  const c = choice(clients)
  const l = choice(lawyers)
  const created = new Date(); created.setDate(created.getDate() - Math.floor(Math.random()*30)); created.setHours(Math.floor(Math.random()*23), Math.floor(Math.random()*59))
  const type = choice(types)
  const status = choice(statusesC)
  const schedule = type==='مجدولة' ? (()=>{ const d=new Date(); d.setDate(d.getDate()+Math.floor(Math.random()*7)+1); d.setHours(9+Math.floor(Math.random()*8),0); return dateTime(d) })() : undefined
  const price = [100,120,150,180,200,250][Math.floor(Math.random()*6)]
  const spec = l.mainSpec
  const attachCount = Math.random()>0.6 ? Math.floor(Math.random()*3) : 0
  const attachments = Array.from({length: attachCount}, (_,k)=> ({ name: `ملف-${i+1}-${k+1}.pdf` }))
  return {
    id: `CN-${3001+i}`,
    client: c.name,
    clientCity: c.city,
    clientPhone: c.phone,
    lawyer: l.name,
    lawyerCity: l.city,
    lawyerLicense: l.license.number,
    type,
    spec,
    duration: choice(durations),
    status,
    price,
    createdAt: dateTime(created),
    schedule,
    voiceNote: Math.random()>0.7,
    title: choice(titles),
    description: 'نص توضيحي مختصر كبيانات ديمو لعرض التفاصيل بشكل متناسق.',
    attachments
  }
})

// Derived dashboard statistics
function countBy(arr, predicate){ return arr.reduce((acc, x)=> acc + (predicate(x)?1:0), 0) }
const cancelledToday = countBy(consultations, c=> c.status==='ملغاة' && (new Date(c.createdAt)).toDateString() === (new Date()).toDateString())
const cancelledWeek = countBy(consultations, c=> c.status==='ملغاة' && (new Date() - new Date(c.createdAt) <= 7*24*60*60*1000))
const cancelledMonth = countBy(consultations, c=> c.status==='ملغاة' && (new Date() - new Date(c.createdAt) <= 30*24*60*60*1000))

const dailySeriesMap = new Map()
for (let i=0;i<30;i++){
  const d = new Date(); d.setDate(d.getDate()- (29-i))
  dailySeriesMap.set(dateStr(d), 0)
}
consultations.forEach(c=>{
  const d = dateStr(new Date(c.createdAt))
  if (dailySeriesMap.has(d)) dailySeriesMap.set(d, dailySeriesMap.get(d)+1)
})
const dailySeries = Array.from(dailySeriesMap.entries()).map(([d,v],idx)=> ({ day: idx+1, date:d, count:v }))

const typeCounts = types.map(t=> ({ label: t, value: consultations.filter(c=>c.type===t).length }))
const specCountsMap = new Map()
consultations.forEach(c=>{ specCountsMap.set(c.spec, (specCountsMap.get(c.spec)||0)+1) })
const topSpecs = Array.from(specCountsMap.entries()).sort((a,b)=> b[1]-a[1]).slice(0,4).map(([label,value])=>({label,value}))

const revenueTotal = consultations.filter(c=> ['مكتملة','نشطة'].includes(c.status)).reduce((s,c)=> s+c.price, 0)
const upcoming = consultations.filter(c=> c.status==='قادمة').length
const active = consultations.filter(c=> c.status==='نشطة').length

const newLawyers7d = lawyers.filter(l=> (new Date() - new Date(l.joinedAt) <= 7*24*60*60*1000)).length
const newClients7d = clients.filter(c=> (new Date() - new Date(c.joinedAt) <= 7*24*60*60*1000)).length

const expiringSoon = lawyers.filter(l=> new Date(l.license.expiry) - new Date() < 14*24*60*60*1000)

export const dashboardStats = {
  totals: { lawyers: lawyers.length, clients: clients.length, consultations: { total: consultations.length, active, upcoming }, revenue: revenueTotal },
  quick: { newLawyers7d, newClients7d, cancelled: { day: cancelledToday, week: cancelledWeek, month: cancelledMonth }, disputesOpen: consultations.filter(c=>c.status==='نزاع').length },
  charts: { dailySeries, types: typeCounts, topSpecs },
  recents: {
    lawyers: [...lawyers].sort((a,b)=> new Date(b.joinedAt) - new Date(a.joinedAt)).slice(0,5),
    clients: [...clients].sort((a,b)=> new Date(b.joinedAt) - new Date(a.joinedAt)).slice(0,5),
    consultations: [...consultations].sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5)
  },
  notifications: [
    ...(expiringSoon.slice(0,2).map((l,idx)=> ({ id:`lic-${idx}`, type:'warning', text:`قرب انتهاء ترخيص ${l.name}` }))),
    { id:'disp-1', type:'warning', text:`هناك ${consultations.filter(c=>c.status==='نزاع').length} نزاعات مفتوحة` }
  ]
}
