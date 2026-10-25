import { describe, expect, it } from '@jest/globals'
import { loginSchema, registrationSchema } from './auth'

describe('authentication schemas', () => {
  it('normalizes email addresses', () => {
    expect(loginSchema.parse({ email: '  USER@Example.com ', password: 'secret' }).email)
      .toBe('user@example.com')
  })

  it('rejects invalid email and short passwords during registration', () => {
    const result = registrationSchema.safeParse({
      name: 'Test User',
      email: 'not-an-email',
      password: 'short',
      confirmPassword: 'short',
    })

    expect(result.success).toBe(false)
  })

  it('requires matching confirmation and a bcrypt-safe UTF-8 password length', () => {
    const mismatch = registrationSchema.safeParse({
      name: 'Test User',
      email: 'user@example.com',
      password: 'correct-password',
      confirmPassword: 'different-password',
    })
    const longUtf8 = registrationSchema.safeParse({
      name: 'Test User',
      email: 'user@example.com',
      password: '😀'.repeat(19),
      confirmPassword: '😀'.repeat(19),
    })

    expect(mismatch.success).toBe(false)
    expect(longUtf8.success).toBe(false)
  })
})
