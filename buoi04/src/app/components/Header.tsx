import Link from 'next/link'
import { auth } from '../../../auth'
import { logout } from '../actions'
import { FavoriteBadge } from './FavoriteBadge'

export async function Header() {
  const session = await auth()

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="NEST / 04 - Trang chủ">
        NEST / 04
      </Link>
      <form className="header-search" action="/" role="search">
        <label className="visually-hidden" htmlFor="site-search">Tìm sản phẩm</label>
        <input id="site-search" name="q" type="search" placeholder="Tìm sản phẩm..." />
        <button type="submit" aria-label="Tìm kiếm">⌕</button>
      </form>
      <nav className="header-nav" aria-label="Điều hướng chính">
        <Link href="/">Khám phá</Link>
        <FavoriteBadge />
        {session?.user ? (
          <>
            <Link href="/profile" className="user-link">{session.user.name || session.user.email}</Link>
            {session.user.role === 'admin' && <Link href="/admin">Quản trị</Link>}
            <form action={logout}>
              <button className="link-button" type="submit">Đăng xuất</button>
            </form>
          </>
        ) : (
          <Link className="login-nav" href="/login">Đăng nhập</Link>
        )}
      </nav>
    </header>
  )
}
