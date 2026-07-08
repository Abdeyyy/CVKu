import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Checks, Sparkle, DownloadSimple } from '@phosphor-icons/react'
import Navbar from '../components/layout/Navbar'

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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-800 border border-surface-600 mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-zinc-300">100% Gratis di Browser Anda</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-6 max-w-4xl mx-auto">
              Bangun CV Profesional. <span className="text-zinc-500">Isi Sekali,</span> <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">Generate 5 Format.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-body">
              Aplikasi pembuat CV modern yang memisahkan data Anda dari desain visualnya. 
              Mulai dari CV ATS yang ramah mesin hingga desain kreatif yang menarik perhatian recruiter.
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

          {/* Abstract Hero Image/Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mt-16 relative"
          >
            <div className="aspect-[16/9] w-full rounded-2xl border border-surface-600 bg-surface-900 overflow-hidden shadow-2xl relative shadow-accent/10">
              <div className="absolute top-0 left-0 right-0 h-10 border-b border-surface-700 flex items-center px-4 gap-2 bg-surface-800/50">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="absolute inset-0 top-10 flex">
                <div className="w-64 border-r border-surface-700 p-4 space-y-3 opacity-60">
                   <div className="h-6 w-32 bg-surface-600 rounded" />
                   <div className="space-y-2 mt-6">
                     <div className="h-8 bg-surface-700 rounded w-full" />
                     <div className="h-8 bg-surface-700 rounded w-full" />
                     <div className="h-8 bg-accent/20 border border-accent/30 rounded w-full" />
                   </div>
                </div>
                <div className="flex-1 bg-[#f1f5f9] p-8 overflow-hidden relative">
                   {/* Fake CV Preview rendered in hero */}
                   <div className="bg-white shadow-xl h-full w-full rounded max-w-[600px] mx-auto opacity-90 relative overflow-hidden flex transform scale-[0.85] origin-top">
                     <div className="w-[180px] bg-blue-600 h-full p-6">
                        <div className="w-16 h-16 rounded-full bg-white/20 mx-auto" />
                        <div className="h-2 w-full bg-white/20 mt-6 rounded" />
                        <div className="h-2 w-3/4 bg-white/20 mt-2 rounded" />
                     </div>
                     <div className="flex-1 p-8">
                       <div className="h-6 w-1/2 bg-gray-800 rounded" />
                       <div className="h-2 w-1/3 bg-blue-600 mt-2 rounded" />
                       
                       <div className="mt-8 space-y-4">
                         <div className="h-3 w-1/4 bg-gray-800 mt-4 rounded" />
                         <div className="space-y-2">
                           <div className="h-2 w-full bg-gray-300 rounded" />
                           <div className="h-2 w-5/6 bg-gray-300 rounded" />
                           <div className="h-2 w-4/6 bg-gray-300 rounded" />
                         </div>
                       </div>
                     </div>
                   </div>
                </div>
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
