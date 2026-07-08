import { Trash, Plus } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'

export default function Step7Projects() {
  const { projectList, addProject, updateProject, removeProject } = useCVStore()

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Proyek & Portofolio</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Opsional tapi penting untuk CV Kreatif. Tambahkan proyek yang pernah kamu kerjakan.</p>
      </div>

      <div className="space-y-3">
        {projectList.map((item) => (
          <div key={item.id} className="card p-4 space-y-3">
            <div className="flex items-start gap-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <div>
                  <label className="label-base">Nama Proyek</label>
                  <input value={item.name} onChange={(e) => updateProject(item.id, { name: e.target.value })} placeholder="Aplikasi CV Generator" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Peran</label>
                  <input value={item.role} onChange={(e) => updateProject(item.id, { role: e.target.value })} placeholder="Full-Stack Developer" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Periode</label>
                  <input value={item.startDate} onChange={(e) => updateProject(item.id, { startDate: e.target.value })} placeholder="Jan 2023 - Mar 2023" className="input-base" />
                </div>
                <div>
                  <label className="label-base">Teknologi / Tools</label>
                  <input value={item.tech} onChange={(e) => updateProject(item.id, { tech: e.target.value })} placeholder="React, Node.js, PostgreSQL" className="input-base" />
                </div>
                <div className="sm:col-span-2">
                  <label className="label-base">Link Proyek (opsional)</label>
                  <input value={item.url} onChange={(e) => updateProject(item.id, { url: e.target.value })} placeholder="https://github.com/username/project" className="input-base" />
                </div>
              </div>
              <button onClick={() => removeProject(item.id)} className="btn-danger shrink-0">
                <Trash size={14} />
              </button>
            </div>
            <div>
              <label className="label-base">Deskripsi</label>
              <textarea value={item.description} onChange={(e) => updateProject(item.id, { description: e.target.value })} placeholder="Jelaskan apa yang dibangun, teknologi yang digunakan, dan dampaknya..." rows={2} className="input-base resize-none" />
            </div>
          </div>
        ))}
      </div>

      {projectList.length === 0 && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-500">Belum ada proyek (opsional)</p>
        </div>
      )}

      <button onClick={addProject} className="btn-ghost w-full justify-center text-xs">
        <Plus size={12} />
        Tambah Proyek
      </button>
    </div>
  )
}
