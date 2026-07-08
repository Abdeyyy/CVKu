import { Trash, Plus } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'
import DraggableList from '../DraggableList'

function ExperienceCard({ item }) {
  const { updateExperience, removeExperience } = useCVStore()
  const upd = (key) => (e) => updateExperience(item.id, { [key]: e.target.value })

  const handleBulletChange = (idx, val) => {
    const bullets = [...(item.bullets || [])]
    bullets[idx] = val
    updateExperience(item.id, { bullets })
  }

  const addBullet = () => {
    updateExperience(item.id, { bullets: [...(item.bullets || []), ''] })
  }

  const removeBullet = (idx) => {
    const bullets = (item.bullets || []).filter((_, i) => i !== idx)
    updateExperience(item.id, { bullets })
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          <div>
            <label className="label-base">Perusahaan <span className="text-red-400">*</span></label>
            <input value={item.company} onChange={upd('company')} placeholder="PT Teknologi Maju" className="input-base" />
          </div>
          <div>
            <label className="label-base">Jabatan <span className="text-red-400">*</span></label>
            <input value={item.position} onChange={upd('position')} placeholder="Software Engineer" className="input-base" />
          </div>
          <div>
            <label className="label-base">Mulai</label>
            <input value={item.startDate} onChange={upd('startDate')} placeholder="Jan 2022" className="input-base" />
          </div>
          <div>
            <label className="label-base">Selesai</label>
            <div className="space-y-1.5">
              <input
                value={item.isCurrent ? '' : item.endDate}
                onChange={upd('endDate')}
                placeholder="Mar 2024"
                disabled={item.isCurrent}
                className="input-base disabled:opacity-40"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.isCurrent}
                  onChange={(e) => updateExperience(item.id, { isCurrent: e.target.checked })}
                  className="rounded border-surface-600 bg-surface-700 text-accent"
                />
                <span className="text-xs text-zinc-500">Masih bekerja di sini</span>
              </label>
            </div>
          </div>
        </div>
        <button onClick={() => removeExperience(item.id)} className="btn-danger shrink-0">
          <Trash size={14} />
        </button>
      </div>

      {/* Bullets */}
      <div>
        <label className="label-base">Deskripsi / Pencapaian (bullet points)</label>
        <div className="space-y-2">
          {(item.bullets || []).map((bullet, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-zinc-600 text-sm shrink-0">•</span>
              <input
                value={bullet}
                onChange={(e) => handleBulletChange(idx, e.target.value)}
                placeholder="Mengembangkan fitur X yang meningkatkan efisiensi 30%"
                className="input-base flex-1"
              />
              <button onClick={() => removeBullet(idx)} className="text-zinc-600 hover:text-red-400 transition-colors shrink-0">
                <Trash size={13} />
              </button>
            </div>
          ))}
          <button onClick={addBullet} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            <Plus size={12} />
            Tambah poin
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Step3Experience() {
  const { experienceList, addExperience, reorderExperience } = useCVStore()

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Pengalaman Kerja</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Urutkan dari yang terbaru. Seret untuk mengatur ulang.</p>
      </div>

      {experienceList.length === 0 ? (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-xl bg-surface-700 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
          </div>
          <p className="text-sm text-zinc-500">Belum ada pengalaman kerja</p>
        </div>
      ) : (
        <DraggableList
          items={experienceList}
          onReorder={reorderExperience}
          renderItem={(item) => <ExperienceCard item={item} />}
        />
      )}

      <button onClick={addExperience} className="btn-ghost w-full justify-center text-xs">
        <Plus size={12} />
        Tambah Pengalaman
      </button>
    </div>
  )
}
