import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import AppBrand from '../components/AppBrand'
import { useAuth } from '../lib/auth'

const nav = [
  { to: '/client', label: 'Dashboard', end: true },
  { to: '/client/new', label: 'New Form' },
  { to: '/client/submissions', label: 'My Submissions' },
]

export default function ClientLayout() {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f5f7f1,_#fafaf7_42%)]">
      <header className="material-surface sticky top-0 z-30 h-[72px] border-b border-white/70 bg-white/72 backdrop-blur-xl flex items-center px-6 gap-8">
        <AppBrand />
        <nav className="flex items-center gap-1">
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-[transform,background-color,color] duration-200 active:scale-[0.97] ${
                  isActive ? 'bg-bottle-600 text-white shadow-sm' : 'text-ink/70 hover:bg-white/80'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-[13px] text-ink/60">{session?.name}</span>
          <button
            onClick={() => {
              logout()
              navigate('/login/client')
            }}
            className="focus-ring text-[13px] text-ink/60 hover:text-clay transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8 apple-enter">
        <Outlet />
      </main>
    </div>
  )
}
