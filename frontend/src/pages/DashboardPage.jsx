import { Link, useNavigate } from 'react-router-dom'
import { Plus, Trash, Copy, PencilSimple } from '@phosphor-icons/react'
import Navbar from '../components/layout/Navbar'
import useCVStore from '../store/cvStore'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { savedCVs, loadCV, duplicateCV, deleteCV, startNewCV } = useCVStore()

  const handleEdit = (id) => {
    loadCV(id)
    navigate('/form')
  }

  const handleCreate = () => {
    startNewCV()
    navigate('/form')
  }

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus CV ini?')) {
      deleteCV(id)
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 pt-[var(--nav-height)]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">Dashboard CV Anda</h1>
            <p className="text-sm text-zinc-400 mt-1">Kelola dan edit CV yang sudah Anda buat.</p>
          </div>
          <button onClick={handleCreate} className="btn-primary">
            <Plus size={16} weight="bold" />
            Buat CV Baru
          </button>
        </div>

        {savedCVs.length === 0 ? (
          <div className="card p-12 flex flex-col items-center gap-4 text-center mt-12 bg-surface-900 border-dashed border-2 border-surface-700">
            <div className="w-16 h-16 rounded-2xl bg-surface-800 flex items-center justify-center">
              <Plus size={24} className="text-zinc-500" />
            </div>
            <div>
              <p className="text-base font-medium text-zinc-300">Belum ada CV yang tersimpan</p>
              <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
                Mulai buat CV pertamamu dengan template profesional yang sudah tersedia.
              </p>
            </div>
            <button onClick={handleCreate} className="btn-primary mt-2">
              Buat Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCVs.map((cv) => (
              <div key={cv.id} className="card p-5 group flex flex-col hover:border-surface-500 transition-colors">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-accent transition-colors">
                    {cv.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Terakhir diubah: {new Date(cv.updatedAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="badge">Template {cv.selectedTemplate}</span>
                    <span className="badge opacity-60">
                      {Object.keys(cv.visibleSections).filter(k => cv.visibleSections[k]).length} Seksi Aktif
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 pt-4 border-t border-surface-700">
                  <button
                    onClick={() => handleEdit(cv.id)}
                    className="btn-primary flex-1 !py-2 text-xs justify-center bg-surface-700 text-zinc-200 hover:bg-accent hover:text-white"
                  >
                    <PencilSimple size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => duplicateCV(cv.id)}
                    className="btn-ghost !py-2 px-3 hover:text-accent"
                    title="Duplikasi"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="btn-ghost !py-2 px-3 hover:text-red-400 hover:border-red-400/30"
                    title="Hapus"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
