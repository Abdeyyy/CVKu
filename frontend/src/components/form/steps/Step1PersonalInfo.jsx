import { useCallback, useRef } from 'react'
import { UploadSimple, User } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'

const FIELDS = [
  { key: 'fullName', label: 'Nama Lengkap', placeholder: 'Budi Santoso', required: true },
  { key: 'email', label: 'Email', placeholder: 'budi@email.com', type: 'email', required: true },
  { key: 'phone', label: 'Nomor Telepon', placeholder: '+62 812 3456 7890' },
  { key: 'address', label: 'Alamat', placeholder: 'Jl. Sudirman No. 1' },
  { key: 'city', label: 'Kota', placeholder: 'Jakarta Selatan' },
  { key: 'website', label: 'Website / Portfolio', placeholder: 'https://portfolio.id', type: 'url' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
]

export default function Step1PersonalInfo() {
  const { personalInfo, setPersonalInfo, setPhotoBase64 } = useCVStore()
  const fileRef = useRef()

  const handleChange = useCallback(
    (key) => (e) => setPersonalInfo({ [key]: e.target.value }),
    [setPersonalInfo]
  )

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoBase64(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Data Diri</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Isi informasi dasar yang akan muncul di semua jenis CV.</p>
      </div>

      {/* Photo upload */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-16 h-16 rounded-2xl bg-surface-700 border border-surface-600
                     flex items-center justify-center cursor-pointer overflow-hidden
                     hover:border-accent/50 transition-colors group shrink-0"
        >
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Foto profil" className="w-full h-full object-cover" />
          ) : (
            <User size={24} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          )}
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="btn-ghost text-xs px-3 py-1.5"
          >
            <UploadSimple size={13} />
            Upload Foto
          </button>
          <p className="text-[11px] text-zinc-600 mt-1.5">JPG atau PNG, maks 2MB</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handlePhoto}
          />
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(({ key, label, placeholder, type = 'text', required }) => (
          <div key={key} className={key === 'fullName' ? 'sm:col-span-2' : ''}>
            <label className="label-base">
              {label}
              {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <input
              type={type}
              value={personalInfo[key] || ''}
              onChange={handleChange(key)}
              placeholder={placeholder}
              className="input-base"
            />
          </div>
        ))}
      </div>

      {/* Summary */}
      <div>
        <label className="label-base">Ringkasan Profesional</label>
        <textarea
          value={personalInfo.summary || ''}
          onChange={(e) => setPersonalInfo({ summary: e.target.value })}
          placeholder="Deskripsikan dirimu secara singkat: pengalaman, keahlian utama, dan tujuan karier..."
          rows={4}
          className="input-base resize-none"
        />
        <p className="text-[11px] text-zinc-600 mt-1">
          {(personalInfo.summary || '').length}/500 karakter
        </p>
      </div>
    </div>
  )
}
