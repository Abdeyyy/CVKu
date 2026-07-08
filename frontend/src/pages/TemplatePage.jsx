import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import useCVStore from '../store/cvStore'

import atsImg from '../assets/Example/ats.webp'
import kronologisImg from '../assets/Example/kronologis.webp'
import fungsionalImg from '../assets/Example/fungsional.webp'
import kombinasiImg from '../assets/Example/kombinasi.webp'
import kreatifImg from '../assets/Example/kreatif.webp'

const TEMPLATES = [
  {
    id: 'ats',
    name: 'ATS Friendly',
    desc: 'Format teks murni, tanpa grafis. Dijamin lolos sistem screening ATS (Applicant Tracking System).',
    color: '#34d399', // emerald-400
    img: atsImg
  },
  {
    id: 'kronologis',
    name: 'Kronologis',
    desc: 'Menonjolkan riwayat pekerjaan terbaru. Layout dua kolom dengan sidebar yang rapi.',
    color: '#60a5fa', // blue-400
    img: kronologisImg
  },
  {
    id: 'fungsional',
    name: 'Fungsional',
    desc: 'Fokus pada skill dan kompetensi utama. Cocok untuk fresh graduate dan career switcher.',
    color: '#a78bfa', // violet-400
    img: fungsionalImg
  },
  {
    id: 'kombinasi',
    name: 'Kombinasi Modern',
    desc: 'Gabungan skill summary dan riwayat kronologis dalam desain modern satu kolom lebar.',
    color: '#f472b6', // pink-400
    img: kombinasiImg
  },
  {
    id: 'kreatif',
    name: 'Kreatif Visual',
    desc: 'Desain bold dengan hierarki visual kuat. Ideal untuk desainer, ilustrator, atau posisi kreatif.',
    color: '#fbbf24', // amber-400
    img: kreatifImg
  }
]

export default function TemplatePage() {
  const navigate = useNavigate()
  const { startNewCV, setTemplate } = useCVStore()

  const handleUseTemplate = (id) => {
    startNewCV()
    setTemplate(id)
    navigate('/form')
  }

  return (
    <div className="min-h-screen bg-surface-950 pt-[var(--nav-height)]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
            Pilih Template CV Anda
          </h1>
          <p className="text-lg text-zinc-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Satu kali isi data, generator kami bisa membuat semua variasi ini.
            Pilih satu untuk memulai, Anda bisa menggantinya kapan saja nanti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="card flex flex-col overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              {/* Asset preview area */}
              <div
                className="h-64 relative border-b border-surface-600 bg-surface-700 overflow-hidden"
              >
                <img 
                  src={tpl.img} 
                  alt={`Preview ${tpl.name}`} 
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" 
                />
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tpl.color }} />
                  <h3 className="text-xl font-bold text-zinc-100">{tpl.name}</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {tpl.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-surface-700">
                  <button 
                    onClick={() => handleUseTemplate(tpl.id)}
                    className="btn-ghost w-full justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300"
                  >
                    Gunakan Template Ini
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
