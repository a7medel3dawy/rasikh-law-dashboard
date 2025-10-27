import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Pie, Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Tooltip, Legend)

const gridColor = 'rgba(0,0,0,0.06)'
const primary = '#b29569'
const secondary = '#1c3522'

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top', labels: { color: '#162a1b', font: { family: 'Tajawal' } } },
    tooltip: { titleFont: { family: 'Tajawal' }, bodyFont: { family: 'Tajawal' } }
  },
  scales: {
    x: { grid: { color: gridColor }, ticks: { color: '#616161', font: { family: 'Tajawal' } } },
    y: { grid: { color: gridColor }, ticks: { color: '#616161', font: { family: 'Tajawal' } } }
  }
}

export function LineChart({ labels, data, title }) {
  const ds = [{ label: title, data, borderColor: primary, backgroundColor:'rgba(178,149,105,0.18)', tension: 0.35, pointRadius: 3 }]
  return <Line data={{ labels, datasets: ds }} options={baseOptions} />
}

export function PieChart({ labels, data }) {
  const colors = [primary, secondary, '#86704f', '#a0865f']
  return <Pie data={{ labels, datasets:[{ data, backgroundColor: colors, borderColor: '#fff', borderWidth: 2 }] }} options={baseOptions} />
}

export function BarChart({ labels, data, title }) {
  const ds = [{ label:title, data, backgroundColor: secondary, borderRadius: 6, maxBarThickness: 28 }]
  return <Bar data={{ labels, datasets: ds }} options={baseOptions} />
}
