import { Trash } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'
import DraggableList from '../DraggableList'

function EducationCard({ item }) {
  const { updateEducation, removeEducation } = useCVStore()
  const upd = (key) => (e) => updateEducation(item.id, { [key]: e.target.value })

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          <div>
            <label className="label-base">Nama Institusi <span className="text-red-400">*</span></label>
            <input value={item.institution} onChange={upd('institution')} placeholder="Universitas Indonesia" className="input-base" />
          </div>
          <div>
            <label className="label-base">Jenjang</label>
            <select value={item.degree} onChange={upd('degree')} className="input-base">
              <option value="">Pilih jenjang...</option>
              <option>SD</option><option>SMP</option><option>SMA/SMK</option>
              <option>D1</option><option>D2</option><option>D3</option><option>D4</option>
              <option>S1</option><option>S2</option><option>S3</option>
            </select>
          </div>
          <div>
            <label className="label-base">Jurusan / Program Studi</label>
            <input value={item.field} onChange={upd('field')} placeholder="Teknik Informatika" className="input-base" />
          </div>
          <div>
            <label className="label-base">IPK (opsional)</label>
            <input value={item.gpa} onChange={upd('gpa')} placeholder="3.85 / 4.00" className="input-base" />
          </div>
          <div>
            <label className="label-base">Tahun Masuk</label>
            <input value={item.startYear} onChange={upd('startYear')} placeholder="2018" className="input-base" />
          </div>
          <div>
            <label className="label-base">Tahun Lulus</label>
            <input value={item.endYear} onChange={upd('endYear')} placeholder="2022 atau Sekarang" className="input-base" />
          </div>
        </div>
        <button onClick={() => removeEducation(item.id)} className="btn-danger shrink-0 mt-0">
          <Trash size={14} />
        </button>
      </div>
      <div>
        <label className="label-base">Deskripsi / Pencapaian (opsional)</label>
        <textarea value={item.description} onChange={upd('description')} placeholder="Ketua HIMA, penelitian AI, dll..." rows={2} className="input-base resize-none" />
      </div>
    </div>
  )
}

export default function Step2Education() {
  const { educationList, addEducation, reorderEducation } = useCVStore()

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Pendidikan</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Tambahkan riwayat pendidikan dari terbaru ke terlama. Seret untuk mengatur urutan.</p>
      </div>

      {educationList.length === 0 ? (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <div className="w-10 h-10 rounded-xl bg-surface-700 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500">
              <path d="M22 9L12 5 2 9l10 4 10-4zM6 11.5v5M18 11.5v5M12 15v4"/>
            </svg>
          </div>
          <p className="text-sm text-zinc-500">Belum ada riwayat pendidikan</p>
        </div>
      ) : (
        <DraggableList
          items={educationList}
          onReorder={reorderEducation}
          renderItem={(item) => <EducationCard item={item} />}
        />
      )}

      <button onClick={addEducation} className="btn-ghost w-full justify-center text-xs">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        Tambah Pendidikan
      </button>
    </div>
  )
}
