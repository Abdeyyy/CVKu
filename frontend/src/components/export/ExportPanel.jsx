import { useRef, useState } from 'react'
import { toPng, toJpeg } from 'html-to-image'
import { DownloadSimple, FilePdf, Image, ArrowsClockwise, Eye, EyeSlash } from '@phosphor-icons/react'
import useCVStore from '../../store/cvStore'
import ATSTemplate from '../templates/ATSTemplate'
import KronologisTemplate from '../templates/KronologisTemplate'
import FungsionalTemplate from '../templates/FungsionalTemplate'
import KombinasiTemplate from '../templates/KombinasiTemplate'
import KreatifTemplate from '../templates/KreatifTemplate'

const ALL_TEMPLATES = [
  { id: 'ats', label: 'ATS', Component: ATSTemplate },
  { id: 'kronologis', label: 'Kronologis', Component: KronologisTemplate },
  { id: 'fungsional', label: 'Fungsional', Component: FungsionalTemplate },
  { id: 'kombinasi', label: 'Kombinasi', Component: KombinasiTemplate },
  { id: 'kreatif', label: 'Kreatif', Component: KreatifTemplate },
]

export default function ExportPanel() {
  const store = useCVStore()
  const [downloading, setDownloading] = useState(false)
  const [downloadingAll, setDownloadingAll] = useState(false)
  const printRef = useRef()

  const getCVData = () => ({
    personalInfo: store.personalInfo,
    educationList: store.educationList,
    experienceList: store.experienceList,
    skillList: store.skillList,
    certificationList: store.certificationList,
    languageList: store.languageList,
    projectList: store.projectList,
    referenceList: store.referenceList,
    visibleSections: store.visibleSections,
  })

  const handlePrint = () => {
    window.print()
  }

  const handleExportPNG = async () => {
    if (!printRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(printRef.current, { quality: 1, pixelRatio: 2 })
      const link = document.createElement('a')
      link.download = `CV_${store.personalInfo.fullName || 'export'}_${store.selectedTemplate}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export PNG error:', err)
    }
    setDownloading(false)
  }

  const handleExportAllPNG = async () => {
    setDownloadingAll(true)
    const data = getCVData()
    for (const { id, label, Component } of ALL_TEMPLATES) {
      // Create off-screen div
      const div = document.createElement('div')
      div.style.position = 'fixed'
      div.style.left = '-9999px'
      div.style.top = '0'
      div.style.width = '760px'
      div.style.backgroundColor = '#fff'
      document.body.appendChild(div)
      const { createRoot } = await import('react-dom/client')
      const root = createRoot(div)
      const { default: React } = await import('react')
      root.render(React.createElement(Component, { data, theme: store.themeConfig }))
      await new Promise((r) => setTimeout(r, 600))
      try {
        const url = await toPng(div, { quality: 1, pixelRatio: 2 })
        const link = document.createElement('a')
        link.download = `CV_${store.personalInfo.fullName || 'export'}_${label}.png`
        link.href = url
        link.click()
        await new Promise((r) => setTimeout(r, 200))
      } catch (e) {
        console.error(`Export ${label} failed`, e)
      }
      root.unmount()
      document.body.removeChild(div)
    }
    setDownloadingAll(false)
  }

  // Visible sections toggle
  const sections = [
    { key: 'education', label: 'Pendidikan' },
    { key: 'experience', label: 'Pengalaman' },
    { key: 'skills', label: 'Keahlian' },
    { key: 'certifications', label: 'Sertifikasi' },
    { key: 'languages', label: 'Bahasa' },
    { key: 'projects', label: 'Proyek' },
    { key: 'references', label: 'Referensi' },
  ]

  return (
    <div className="space-y-5">
      {/* Section visibility */}
      <div>
        <p className="label-base mb-3">Tampilkan Seksi</p>
        <div className="grid grid-cols-2 gap-1.5">
          {sections.map(({ key, label }) => {
            const visible = store.visibleSections[key] !== false
            return (
              <button
                key={key}
                onClick={() => store.toggleSection(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium
                  transition-all duration-150 border
                  ${visible
                    ? 'bg-accent/10 border-accent/30 text-accent-300'
                    : 'bg-surface-800 border-surface-600 text-zinc-500 hover:text-zinc-400'
                  }`}
              >
                {visible ? <Eye size={12} /> : <EyeSlash size={12} />}
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Color picker */}
      <div>
        <label className="label-base">Warna Aksen</label>
        <div className="flex items-center gap-2 mt-1.5">
          {['#3B82F6', '#6366F1', '#7C3AED', '#0F766E', '#B45309', '#DC2626', '#475569'].map((color) => (
            <button
              key={color}
              onClick={() => store.setThemeConfig({ accentColor: color })}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 rounded-full transition-all duration-150 shrink-0
                ${store.themeConfig.accentColor === color ? 'ring-2 ring-offset-2 ring-offset-surface-800 ring-white scale-110' : 'hover:scale-110'}`}
            />
          ))}
          <input
            type="color"
            value={store.themeConfig.accentColor}
            onChange={(e) => store.setThemeConfig({ accentColor: e.target.value })}
            className="w-6 h-6 rounded-full cursor-pointer bg-transparent border-0 p-0"
            title="Pilih warna kustom"
          />
        </div>
      </div>

      {/* Export buttons */}
      <div className="space-y-2">
        <p className="label-base">Export CV</p>
        <button
          onClick={handlePrint}
          className="btn-primary w-full justify-center"
        >
          <FilePdf size={16} />
          Cetak / Simpan PDF
        </button>
        <button
          onClick={handleExportPNG}
          disabled={downloading}
          className="btn-ghost w-full justify-center"
        >
          <Image size={16} />
          {downloading ? 'Mengekspor...' : 'Export PNG'}
        </button>
        <button
          onClick={handleExportAllPNG}
          disabled={downloadingAll}
          className="btn-ghost w-full justify-center text-xs"
        >
          <ArrowsClockwise size={14} className={downloadingAll ? 'animate-spin' : ''} />
          {downloadingAll ? 'Sedang export semua...' : 'Download Semua Format (PNG)'}
        </button>
        <p className="text-[11px] text-zinc-600">
          Untuk PDF: gunakan Ctrl+P dan pilih "Save as PDF" di browser.
        </p>
      </div>

      {/* Save CV button */}
      <button
        onClick={() => {
          store.saveCurrentCV()
          alert('CV berhasil disimpan ke Dashboard!')
        }}
        className="btn-ghost w-full justify-center"
      >
        <DownloadSimple size={16} />
        Simpan ke Dashboard
      </button>
    </div>
  )
}
