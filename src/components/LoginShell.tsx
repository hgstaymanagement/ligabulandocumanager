import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import AppBrand from './AppBrand'

type LoginShellProps = {
  role: 'admin' | 'client'
  children: ReactNode
  footer?: ReactNode
}

export default function LoginShell({ role, children, footer }: LoginShellProps) {
  const otherPath = role === 'admin' ? '/login/client' : '/login/admin'
  const otherLabel = role === 'admin' ? 'Client sign in' : 'Admin sign in'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#f1f5ef,_#f7f5ee_55%)] px-4">
      <div className="w-full max-w-sm apple-enter">
        <div className="mb-8">
          <AppBrand size="lg" stacked />
        </div>

        <div className="material-surface bg-white/82 backdrop-blur-xl border border-white/80 shadow-float rounded-app p-7">
          <p className="mb-5 text-[12px] font-medium uppercase tracking-wide text-ink/45">
            {role === 'admin' ? 'Administrator access' : 'Client access'}
          </p>
          {children}
        </div>

        <div className="mt-5 flex flex-col items-center gap-2 text-center">
          <Link
            to={otherPath}
            className="focus-ring text-[12.5px] text-bottle-700 hover:text-bottle-800 transition-colors"
          >
            {otherLabel}
          </Link>
          {footer ?? (
            <p className="text-[11.5px] text-ink/40">
              Donated by Harold Winston Guadiz to LIGA Bulan Chapter.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
