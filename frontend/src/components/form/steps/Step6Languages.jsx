import { Trash, Plus } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'

const LEVELS = ['Dasar', 'Menengah', 'Mahir', 'Native']

export default function Step6Languages() {
  const { languageList, addLanguage, updateLanguage, removeLanguage } = useCVStore()

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Bahasa</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Opsional. Tambahkan bahasa yang kamu kuasai beserta tingkat kemampuannya.</p>
      </div>

      <div className="space-y-3">
        {languageList.map((item) => (
          <div key={item.id} className="card p-4 flex items-end gap-3">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <label className="label-base">Bahasa</label>
                <input
                  value={item.name}
                  onChange={(e) => updateLanguage(item.id, { name: e.target.value })}
                  placeholder="Bahasa Indonesia, Inggris..."
                  className="input-base"
                />
              </div>
              <div>
                <label className="label-base">Tingkat Kemampuan</label>
                <div className="flex gap-1 flex-wrap mt-1">
                  {LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => updateLanguage(item.id, { level: lvl })}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150
                        ${item.level === lvl
                          ? 'bg-accent text-white'
                          : 'bg-surface-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => removeLanguage(item.id)} className="btn-danger shrink-0">
              <Trash size={14} />
            </button>
          </div>
        ))}
      </div>

      {languageList.length === 0 && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-500">Belum ada bahasa (opsional)</p>
        </div>
      )}

      <button onClick={addLanguage} className="btn-ghost w-full justify-center text-xs">
        <Plus size={12} />
        Tambah Bahasa
      </button>
    </div>
  )
}
