'use client'

import { FormEvent, useState, useTransition } from 'react'
import { createAnnouncement } from '../admin/actions'

export function AnnouncementForm() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [isPending, startTransition] = useTransition()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResult('')
    startTransition(async () => {
      const response = await createAnnouncement(message)
      if (!response.ok) {
        setResult(response.message)
        return
      }
      setMessage('')
      setResult('Đã lưu thông báo.')
    })
  }

  return (
    <form className="announcement-form" onSubmit={submit}>
      <label htmlFor="announcement">Thông báo cửa hàng</label>
      <textarea
        id="announcement"
        maxLength={240}
        onChange={(event) => setMessage(event.target.value)}
        required
        rows={3}
        value={message}
      />
      <div className="form-row">
        <small>{message.length}/240</small>
        <button className="primary-button" disabled={isPending} type="submit">
          {isPending ? 'Đang lưu…' : 'Lưu thông báo'}
        </button>
      </div>
      {result && <p role="status">{result}</p>}
    </form>
  )
}
