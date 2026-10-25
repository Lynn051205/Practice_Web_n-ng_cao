'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

function safeCallbackUrl(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) {
    return '/'
  }
  return value
}

export function LoginForm({ githubConfigured }: { githubConfigured: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = safeCallbackUrl(searchParams.get('callbackUrl'))
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const formData = new FormData(event.currentTarget)

    try {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
        redirectTo: callbackUrl,
      })

      if (!result || result.error) {
        setError('Email hoặc mật khẩu không chính xác.')
        return
      }

      router.replace(callbackUrl)
      router.refresh()
    } catch {
      setError('Không thể đăng nhập lúc này. Vui lòng thử lại.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="auth-form-wrap">
      <form className="form-stack" onSubmit={submit}>
        <label>
          Email
          <input autoComplete="email" name="email" required type="email" />
        </label>
        <label>
          Mật khẩu
          <input autoComplete="current-password" name="password" required type="password" />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" disabled={pending} type="submit">
          {pending ? 'Đang đăng nhập…' : 'Đăng nhập'}
        </button>
      </form>
      <div className="auth-divider"><span>hoặc</span></div>
      {githubConfigured ? (
        <button
          className="secondary-button"
          onClick={() => signIn('github', { redirectTo: callbackUrl })}
          type="button"
        >
          Tiếp tục với GitHub
        </button>
      ) : (
        <p className="configuration-note" role="status">
          GitHub OAuth chưa được cấu hình. Bạn vẫn có thể đăng nhập bằng email.
        </p>
      )}
    </div>
  )
}
