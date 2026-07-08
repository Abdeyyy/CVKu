import { Trash, Plus, CheckCircle } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'

export default function Step8References() {
  const { referenceList, addReference, updateReference, removeReference } = useCVStore()

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Referensi</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Opsional. Tambahkan kontak yang bisa memberikan rekomendasi untukmu.</p>
      </div>

      <div className="space-y-3">
        {referenceList.map((item) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-start gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <div>
                  <label className="label-base">Nama</label>
                  <input value={item.name} onChange={(e) => updateReference(item.id, { name: e.target.value })} placeholder="Dr. Andi Prasetyo" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Jabatan</label>
                  <input value={item.position} onChange={(e) => updateReference(item.id, { position: e.target.value })} placeholder="Head of Engineering" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Perusahaan</label>
                  <input value={item.company} onChange={(e) => updateReference(item.id, { company: e.target.value })} placeholder="PT Inovasi Digital" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Email</label>
                  <input value={item.email} onChange={(e) => updateReference(item.id, { email: e.target.value })} placeholder="andi@perusahaan.com" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Telepon (opsional)</label>
                  <input value={item.phone} onChange={(e) => updateReference(item.id, { phone: e.target.value })} placeholder="+62 812 xxx" className="input-base" />
                </div>
              </div>
              <button onClick={() => removeReference(item.id)} className="btn-danger shrink-0">
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {referenceList.length === 0 && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-500">Belum ada referensi (opsional)</p>
        </div>
      )}

      <button onClick={addReference} className="btn-ghost w-full justify-center text-xs">
        <Plus size={12} />
        Tambah Referensi
      </button>

      {/* Completion hint */}
      <div className="card-inner p-4 flex items-start gap-3">
        <CheckCircle size={18} weight="fill" className="text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-zinc-200">Semua data sudah terisi!</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Kamu bisa langsung melihat preview CV di panel kanan dan mengunduh hasilnya.
          </p>
        </div>
      </div>
    </div>
  )
}
