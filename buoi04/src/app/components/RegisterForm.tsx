'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { registerAction, type RegisterState } from '../register/actions'

const initialState: RegisterState = { status: 'idle', fieldErrors: {} }

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState)

  return (
    <form className="form-stack" action={formAction} noValidate>
      <label>
        Họ tên
        <input autoComplete="name" name="name" required />
        {state.fieldErrors?.name?.map((message) => <small className="field-error" key={message}>{message}</small>)}
      </label>
      <label>
        Email
        <input autoComplete="email" name="email" required type="email" />
        {state.fieldErrors?.email?.map((message) => <small className="field-error" key={message}>{message}</small>)}
      </label>
      <label>
        Mật khẩu
        <input autoComplete="new-password" name="password" required type="password" />
        {state.fieldErrors?.password?.map((message) => <small className="field-error" key={message}>{message}</small>)}
      </label>
      <label>
        Xác nhận mật khẩu
        <input autoComplete="new-password" name="confirmPassword" required type="password" />
        {state.fieldErrors?.confirmPassword?.map((message) => <small className="field-error" key={message}>{message}</small>)}
      </label>
      {state.status === 'error' && <p className="form-error" role="alert">{state.message}</p>}
      {state.status === 'success' && (
        <p className="form-success" role="status">
          Đăng ký thành công. <Link href="/login">Đăng nhập ngay</Link>
        </p>
      )}
      <button className="primary-button" disabled={pending || state.status === 'success'} type="submit">
        {pending ? 'Đang tạo tài khoản…' : 'Tạo tài khoản'}
      </button>
      <p className="form-footnote">Tài khoản mới luôn được tạo với vai trò người dùng.</p>
    </form>
  )
}
