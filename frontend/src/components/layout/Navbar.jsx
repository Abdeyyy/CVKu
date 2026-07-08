import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, SquaresFour, Palette, Plus } from '@phosphor-icons/react'
import useCVStore from '../../store/cvStore'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: SquaresFour },
  { to: '/templates', label: 'Template', icon: Palette },
]

export default function Navbar() {
  const location = useLocation()
  const startNewCV = useCVStore((s) => s.startNewCV)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20 glass border-b border-white/5"
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <FileText weight="fill" className="text-white" size={16} />
          </div>
          <span className="font-sans font-semibold text-sm text-zinc-100 tracking-tight">
            CV<span className="text-accent">Generator</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm
                  transition-colors duration-150
                  ${active ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-surface-700 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={16} weight={active ? 'fill' : 'regular'} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <Link
          to="/form"
          onClick={startNewCV}
          className="btn-primary text-xs px-4 py-2"
        >
          <Plus size={14} weight="bold" />
          Buat CV Baru
        </Link>
      </div>
    </nav>
  )
}
