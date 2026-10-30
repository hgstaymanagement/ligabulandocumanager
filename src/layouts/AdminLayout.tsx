import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import AppBrand from '../components/AppBrand'
import { useAuth } from '../lib/auth'

const nav = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/clients', label: 'Clients' },
  { to: '/admin/barangays', label: 'Barangays' },
  { to: '/admin/forms', label: 'Forms' },
  { to: '/admin/submissions', label: 'Submissions' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-[radial-gradient(circle_at_top_left,_#f5f7f1,_#fafaf7_42%)]">
      <aside className="material-surface w-64 shrink-0 border-r border-white/70 bg-white/72 backdrop-blur-xl flex flex-col">
        <div className="h-[72px] flex items-center px-6 border-b border-white/70">
          <AppBrand />
        </div>
        <nav className="flex-1 px-3 py-5">
          {nav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-[13.5px] font-medium transition-[background-color,color,transform] duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'text-bottle-700 bg-bottle-100/70 shadow-sm'
                    : 'text-ink/65 hover:text-ink hover:bg-white/75'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-5 border-t border-white/70">
          <button
            onClick={() => {
              logout()
              navigate('/login/admin')
            }}
            className="focus-ring w-full rounded-lg px-2 py-2 text-left text-[13px] text-ink/60 hover:text-clay hover:bg-clay/5 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
