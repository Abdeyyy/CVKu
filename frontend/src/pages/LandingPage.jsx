import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Checks, Sparkle, DownloadSimple } from '@phosphor-icons/react'
import Navbar from '../components/layout/Navbar'
import heroImg from '../assets/Example/hero.png'

function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="card p-6 lg:p-8 hover:border-surface-500 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-surface-700 text-accent flex items-center justify-center mb-5">
        <Icon size={24} weight="duotone" />
      </div>
      <h3 className="text-lg font-bold text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-950 font-sans selection:bg-accent/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-[140px] pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black leading-[1.1] mb-6 max-w-4xl mx-auto">
              Bangun CV Profesional<br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Tersedia 5 Format</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
              Aplikasi pembuat CV modern yang siap pakai!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/form" className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto justify-center">
                Mulai Buat CV
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link to="/templates" className="btn-ghost text-base px-8 py-3.5 w-full sm:w-auto justify-center bg-surface-800">
                Lihat Galeri Template
              </Link>
            </div>
          </motion.div>

          {/* Hero Image/Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl mt-16 relative"
          >
            <div className="w-full rounded-2xl border border-surface-600 bg-surface-900 overflow-hidden shadow-2xl relative shadow-accent/10">
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-surface-600 flex items-center px-4 gap-2 bg-surface-700/50">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-10">
                <img src={heroImg} alt="CV Generator Preview" className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-surface-700/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Didesain untuk Efisiensi</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Tidak perlu mengatur margin atau font secara manual. Fokus pada isi konten CV Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={FileText}
            title="Single Source of Truth"
            desc="Isi master data Anda satu kali. Pindah dari template ATS ke desain kreatif tanpa perlu mengetik ulang apapun."
          />
          <FeatureCard
            icon={Checks}
            title="ATS Optimized"
            desc="Satu template khusus dibuat mengikuti standar parsing ATS, memastikan CV Anda terbaca sempurna oleh robot rekrutmen."
          />
          <FeatureCard
            icon={Sparkle}
            title="Desain Kualitas Agency"
            desc="Template kami dibuat dengan prinsip desain profesional. Tipografi, hierarki visual, dan spacing yang matang."
          />
          <FeatureCard
            icon={DownloadSimple}
            title="Export Instan"
            desc="Export ke PDF berkualitas tinggi atau gambar raster (PNG) dalam satu klik. Langsung dari browser Anda."
          />
          <FeatureCard
            icon={ArrowRight} /* Placeholder icon for local storage saving */
            title="Auto-Save Lokal"
            desc="Semua data tersimpan otomatis di browser secara lokal. Privasi terjaga, tidak ada data CV yang dikirim ke server."
          />
        </div>
      </section>

      <footer className="border-t border-surface-700 py-8 px-6 text-center text-sm text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText weight="fill" className="text-zinc-400" size={16} />
            <span className="font-semibold text-zinc-300">CV Generator</span>
          </div>
          <p>© {new Date().getFullYear()} CV Generator App. Dibangun untuk Job Seekers.</p>
        </div>
      </footer>
    </div>
  )
}
