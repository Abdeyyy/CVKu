import { Trash, Plus } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'

export default function Step5Certifications() {
  const { certificationList, addCertification, updateCertification, removeCertification } = useCVStore()

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Sertifikasi & Penghargaan</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Opsional. Tambahkan sertifikat, lisensi, atau penghargaan yang relevan.</p>
      </div>

      <div className="space-y-3">
        {certificationList.map((item) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-start gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <div>
                  <label className="label-base">Nama Sertifikasi</label>
                  <input
                    value={item.name}
                    onChange={(e) => updateCertification(item.id, { name: e.target.value })}
                    placeholder="AWS Certified Developer"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="label-base">Penerbit</label>
                  <input
                    value={item.issuer}
                    onChange={(e) => updateCertification(item.id, { issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="label-base">Tahun</label>
                  <input
                    value={item.year}
                    onChange={(e) => updateCertification(item.id, { year: e.target.value })}
                    placeholder="2023"
                    className="input-base"
                  />
                </div>
                <div>
                  <label className="label-base">URL (opsional)</label>
                  <input
                    value={item.url}
                    onChange={(e) => updateCertification(item.id, { url: e.target.value })}
                    placeholder="https://credential.id/..."
                    className="input-base"
                  />
                </div>
              </div>
              <button onClick={() => removeCertification(item.id)} className="btn-danger shrink-0">
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificationList.length === 0 && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-500">Belum ada sertifikasi (opsional)</p>
        </div>
      )}

      <button onClick={addCertification} className="btn-ghost w-full justify-center text-xs">
        <Plus size={12} />
        Tambah Sertifikasi
      </button>
    </div>
  )
}
