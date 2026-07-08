import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  'Data Diri',
  'Pendidikan',
  'Pengalaman',
  'Keahlian',
  'Sertifikasi',
  'Bahasa',
  'Proyek',
  'Referensi',
]

export default function StepIndicator({ currentStep, onStepClick }) {
  return (
    <div className="space-y-3">
      {/* Mobile: compact step count */}
      <div className="flex md:hidden items-center justify-between px-1">
        <span className="text-xs text-zinc-500">
          Langkah {currentStep + 1} dari {STEPS.length}
        </span>
        <span className="text-xs font-medium text-zinc-300">{STEPS[currentStep]}</span>
      </div>

      {/* Progress bar (mobile) */}
      <div className="md:hidden h-1 bg-surface-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={false}
          animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Desktop: steplist */}
      <div className="hidden md:flex flex-col gap-0.5">
        {STEPS.map((label, idx) => {
          const state = idx < currentStep ? 'done' : idx === currentStep ? 'active' : 'upcoming'
          return (
            <button
              key={label}
              onClick={() => onStepClick(idx)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                transition-all duration-200 text-left group
                ${state === 'active' ? 'bg-accent/10 text-accent-300' : ''}
                ${state === 'done' ? 'text-zinc-400 hover:text-zinc-200 hover:bg-surface-700/50' : ''}
                ${state === 'upcoming' ? 'text-zinc-600 hover:text-zinc-400' : ''}
              `}
            >
              {/* Step number / check */}
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0
                  transition-all duration-200
                  ${state === 'active' ? 'bg-accent text-white' : ''}
                  ${state === 'done' ? 'bg-surface-600 text-zinc-300' : ''}
                  ${state === 'upcoming' ? 'bg-surface-700 text-zinc-600' : ''}
                `}
              >
                {state === 'done' ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  idx + 1
                )}
              </span>
              <span className="font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { STEPS }
