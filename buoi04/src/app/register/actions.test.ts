/** @jest-environment node */
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { compare } from 'bcryptjs'

type UserMock = {
  findUnique: jest.MockedFunction<
    (input: { where: { email: string }; select: { id: true } }) =>
      Promise<{ id: string } | null>
  >
  create: jest.MockedFunction<
    (input: {
      data: { name: string; email: string; passwordHash: string; role: 'user' }
      select: { id: true }
    }) => Promise<{ id: string }>
  >
}

let userMock: UserMock

function createFormData(): FormData {
  const formData = new FormData()
  formData.set('name', 'Test User')
  formData.set('email', 'USER@example.com')
  formData.set('password', 'my-safe-password')
  formData.set('confirmPassword', 'my-safe-password')
  formData.set('role', 'admin')
  return formData
}

async function runAction(formData: FormData) {
  const { registerAction } = await import('./actions')
  return registerAction({ status: 'idle' }, formData)
}

describe('registerAction', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../lib/prisma', () => ({
      prisma: { user: { findUnique: jest.fn(), create: jest.fn() } },
    }))
    userMock = (
      jest.requireMock('../../lib/prisma') as { prisma: { user: UserMock } }
    ).prisma.user
  })

  it('reports invalid form fields without querying or writing a user', async () => {
    const formData = createFormData()
    formData.set('password', 'short')

    const result = await runAction(formData)

    expect(result.status).toBe('error')
    expect(userMock.findUnique).not.toHaveBeenCalled()
    expect(userMock.create).not.toHaveBeenCalled()
  })

  it('creates a hashed user account with a fixed user role', async () => {
    userMock.findUnique.mockResolvedValue(null)
    userMock.create.mockResolvedValue({ id: 'new-user' })

    const result = await runAction(createFormData())

    expect(result.status).toBe('success')
    const createInput = userMock.create.mock.calls[0][0]
    expect(createInput.data.email).toBe('user@example.com')
    expect(createInput.data.role).toBe('user')
    expect(createInput.data.passwordHash).not.toBe('my-safe-password')
    await expect(compare('my-safe-password', createInput.data.passwordHash)).resolves.toBe(true)
  })
})
