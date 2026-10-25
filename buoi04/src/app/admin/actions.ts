'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '../../../auth'
import { prisma } from '../../lib/prisma'
import { announcementSchema } from '../../lib/validations/announcement'

export type AnnouncementActionResult =
  | { ok: true }
  | {
      ok: false
      error: 'unauthenticated' | 'forbidden' | 'invalid_input'
      message: string
      fieldErrors?: string[]
    }

export async function createAnnouncement(input: unknown): Promise<AnnouncementActionResult> {
  const session = await auth()
  if (!session?.user) {
    return {
      ok: false,
      error: 'unauthenticated',
      message: 'Vui lòng đăng nhập để tiếp tục.',
    }
  }

  if (session.user.role !== 'admin') {
    return {
      ok: false,
      error: 'forbidden',
      message: 'Bạn không có quyền thực hiện thao tác này.',
    }
  }

  const parsed = announcementSchema.safeParse({ message: input })
  if (!parsed.success) {
    return {
      ok: false,
      error: 'invalid_input',
      message: 'Nội dung thông báo không hợp lệ.',
      fieldErrors: parsed.error.issues.map((issue) => issue.message),
    }
  }

  await prisma.announcement.create({ data: { message: parsed.data.message } })
  revalidatePath('/admin')
  return { ok: true }
}
