/** @jest-environment node */
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { Session } from 'next-auth'

type AuthMock = jest.MockedFunction<() => Promise<Session | null>>
type CreateMock = jest.MockedFunction<
  (input: { data: { message: string } }) => Promise<{
    id: string
    message: string
    createdAt: Date
  }>
>

let authMock: AuthMock
let createMock: CreateMock

function sessionFor(role: 'admin' | 'user'): Session {
  return {
    user: {
      id: `${role}-1`,
      role,
      name: role === 'admin' ? 'Admin' : 'Test User',
      email: `${role}@example.com`,
    },
    expires: '2099-01-01',
  }
}

async function runAction(input: unknown) {
  const { createAnnouncement } = await import('./actions')
  return createAnnouncement(input)
}

describe('createAnnouncement authorization', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../../auth', () => ({ auth: jest.fn() }))
    jest.doMock('../../lib/prisma', () => ({
      prisma: { announcement: { create: jest.fn() } },
    }))
    jest.doMock('next/cache', () => ({ revalidatePath: jest.fn() }))

    authMock = (
      jest.requireMock('../../../auth') as { auth: AuthMock }
    ).auth
    createMock = (
      jest.requireMock('../../lib/prisma') as {
        prisma: { announcement: { create: CreateMock } }
      }
    ).prisma.announcement.create
  })

  it('rejects a request without a session', async () => {
    authMock.mockResolvedValue(null)

    await expect(runAction('Store is open')).resolves.toMatchObject({
      ok: false,
      error: 'unauthenticated',
    })
    expect(createMock).not.toHaveBeenCalled()
  })

  it('rejects a signed-in user without the admin role', async () => {
    authMock.mockResolvedValue(sessionFor('user'))

    await expect(runAction('Store is open')).resolves.toMatchObject({
      ok: false,
      error: 'forbidden',
    })
    expect(createMock).not.toHaveBeenCalled()
  })

  it('rejects invalid admin input before writing to the database', async () => {
    authMock.mockResolvedValue(sessionFor('admin'))

    await expect(runAction('  ')).resolves.toMatchObject({
      ok: false,
      error: 'invalid_input',
    })
    expect(createMock).not.toHaveBeenCalled()
  })

  it('allows an admin to create a validated announcement', async () => {
    authMock.mockResolvedValue(sessionFor('admin'))
    createMock.mockResolvedValue({
      id: 'notice-1',
      message: 'Store is open',
      createdAt: new Date(),
    })

    await expect(runAction('Store is open')).resolves.toEqual({ ok: true })
    expect(createMock).toHaveBeenCalledWith({ data: { message: 'Store is open' } })
  })
})
