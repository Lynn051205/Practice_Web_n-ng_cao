'use server'

import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { prisma } from '../../lib/prisma'
import { registrationSchema } from '../../lib/validations/auth'

export type RegisterState = {
  status: 'idle' | 'error' | 'success'
  message?: string
  fieldErrors?: Partial<Record<'name' | 'email' | 'password' | 'confirmPassword', string[]>>
}

export async function registerAction(
  _previousState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = registrationSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })

  if (!parsed.success) {
    return {
      status: 'error',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  })
  if (existingUser) {
    return { status: 'error', message: 'Email này đã được đăng ký.' }
  }

  const passwordHash = await hash(parsed.data.password, 12)
  try {
    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        role: 'user',
      },
      select: { id: true },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return { status: 'error', message: 'Email này đã được đăng ký.' }
    }
    throw error
  }

  return { status: 'success', message: 'Đăng ký thành công.' }
}
