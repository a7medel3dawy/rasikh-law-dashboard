import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './shared/AdminLayout.jsx'
import Login from './screens/auth/Login.jsx'
import Dashboard from './screens/dashboard/Dashboard.jsx'
import LawyersList from './screens/lawyers/LawyersList.jsx'
import LawyerProfile from './screens/lawyers/LawyerProfile.jsx'
import LawyerEdit from './screens/lawyers/LawyerEdit.jsx'
import LicenseManagement from './screens/lawyers/LicenseManagement.jsx'
import ClientsList from './screens/clients/ClientsList.jsx'
import ClientProfile from './screens/clients/ClientProfile.jsx'
import ClientEdit from './screens/clients/ClientEdit.jsx'
import SpecsList from './screens/specs/SpecsList.jsx'
import SpecDetails from './screens/specs/SpecDetails.jsx'
import SpecEdit from './screens/specs/SpecEdit.jsx'
import ConsultationsList from './screens/consultations/ConsultationsList.jsx'
import ConsultationDetails from './screens/consultations/ConsultationDetails.jsx'
import ReplaceLawyer from './screens/consultations/ReplaceLawyer.jsx'
import { useAuthStore } from './store/auth.js'
import Profile from './screens/profile/Profile.jsx'
import ButtonsKit from './screens/styleguide/ButtonsKit.jsx'

function PrivateRoute({ children }) {
  const { isAuthed } = useAuthStore()
  return isAuthed ? children : <Navigate to="/login" replace />
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="lawyers" element={<LawyersList />} />
        <Route path="lawyers/:id" element={<LawyerProfile />} />
        <Route path="lawyers/:id/edit" element={<LawyerEdit />} />
        <Route path="lawyers/:id/license" element={<LicenseManagement />} />
        <Route path="clients" element={<ClientsList />} />
        <Route path="clients/:id" element={<ClientProfile />} />
        <Route path="clients/:id/edit" element={<ClientEdit />} />
        <Route path="specs" element={<SpecsList />} />
        <Route path="specs/:id" element={<SpecDetails />} />
        <Route path="specs/:id/edit" element={<SpecEdit />} />
        <Route path="consultations" element={<ConsultationsList />} />
        <Route path="consultations/:id" element={<ConsultationDetails />} />
        <Route path="consultations/:id/replace-lawyer" element={<ReplaceLawyer />} />
        <Route path="profile" element={<Profile />} />
        <Route path="_dev/kit/buttons" element={<ButtonsKit />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
