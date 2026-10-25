import { z } from 'zod'

export const announcementSchema = z.object({
  message: z
    .string()
    .trim()
    .min(3, 'Thông báo cần có ít nhất 3 ký tự.')
    .max(240, 'Thông báo không được vượt quá 240 ký tự.'),
})
