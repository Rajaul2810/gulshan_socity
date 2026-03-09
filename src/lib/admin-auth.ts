const ADMIN_STORAGE_KEY = 'gulshan_admin_session'
const ADMIN_EMAIL = 'admin@gulshansociety.com'
const ADMIN_PASSWORD = 'gulshan@society'

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true'
}

export function setAdminAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return
  if (value) {
    localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
  } else {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD
}
