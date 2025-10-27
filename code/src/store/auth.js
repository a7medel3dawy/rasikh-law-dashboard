import { create } from 'zustand'

export const useAuthStore = create((set, get) => ({
  isAuthed: false,
  user: null,
  loginError: '',
  login: async ({ email, password }) => {
    if (!email || !password) {
      return set({ loginError: 'هذا الحقل مطلوب' })
    }
    // Mocked admin check
    const ok = email?.toLowerCase() === 'admin@rasekh.local' && password === 'admin123'
    if (ok) {
      set({ isAuthed: true, user: { name: 'مشرف النظام', email }, loginError: '' })
      return true
    }
    set({ loginError: 'بيانات الدخول غير صحيحة' })
    return false
  },
  logout: () => set({ isAuthed: false, user: null })
}))

