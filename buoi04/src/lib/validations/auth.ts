import { z } from 'zod'

export function isWithinBcryptByteLimit(password: string): boolean {
  let byteLength = 0
  for (const character of password) {
    if (character.length === 2) {
      byteLength += 4
    } else {
      const codePoint = character.charCodeAt(0)
      byteLength += codePoint <= 0x7f ? 1 : codePoint <= 0x7ff ? 2 : 3
    }

    if (byteLength > 72) {
      return false
    }
  }
  return true
}

export const emailSchema = z
  .string()
  .trim()
  .email('Vui lòng nhập email hợp lệ.')
  .max(254, 'Email quá dài.')
  .transform((email) => email.toLowerCase())

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu.')
    .refine(isWithinBcryptByteLimit, {
      message: 'Thông tin đăng nhập không hợp lệ.',
    }),
})

export const registrationSchema = z
  .object({
    name: z.string().trim().min(2, 'Họ tên cần có ít nhất 2 ký tự.').max(80),
    email: emailSchema,
    password: z
      .string()
      .min(8, 'Mật khẩu cần có ít nhất 8 ký tự.')
      .max(72, 'Mật khẩu không được quá 72 ký tự.')
      .refine(isWithinBcryptByteLimit, {
        message: 'Mật khẩu không được vượt quá 72 byte UTF-8.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Hai mật khẩu không khớp.',
  })

export type RegistrationInput = z.infer<typeof registrationSchema>
