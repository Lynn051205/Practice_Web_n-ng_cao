export type UserRole = 'admin' | 'user'

export function isUserRole(value: string): value is UserRole {
  return value === 'admin' || value === 'user'
}
