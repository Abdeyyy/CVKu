import { Trash, Plus } from '@phosphor-icons/react'
import useCVStore from '../../../store/cvStore'
import DraggableList from '../DraggableList'

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="transition-transform hover:scale-110"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill={star <= value ? '#3B82F6' : 'transparent'} stroke={star <= value ? '#3B82F6' : '#52525b'} strokeWidth="1">
            <polygon points="7,1 8.8,5.3 13.4,5.6 10,8.6 11.1,13.1 7,10.4 2.9,13.1 4,8.6 0.6,5.6 5.2,5.3" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function SkillCard({ item }) {
  const { updateSkill, removeSkill } = useCVStore()

  return (
    <div className="card p-3 flex items-center gap-3">
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div>
          <label className="label-base">Nama Keahlian</label>
          <input
            value={item.name}
            onChange={(e) => updateSkill(item.id, { name: e.target.value })}
            placeholder="React, Python, Photoshop..."
            className="input-base"
          />
        </div>
        <div>
          <label className="label-base">Tipe</label>
          <select
            value={item.type}
            onChange={(e) => updateSkill(item.id, { type: e.target.value })}
            className="input-base"
          >
            <option value="hard">Hard Skill</option>
            <option value="soft">Soft Skill</option>
          </select>
        </div>
      </div>
      <div className="shrink-0 flex flex-col items-center gap-1">
        <span className="label-base text-center">Level</span>
        <StarRating value={item.level} onChange={(val) => updateSkill(item.id, { level: val })} />
      </div>
      <button onClick={() => removeSkill(item.id)} className="btn-danger shrink-0 px-2">
        <Trash size={13} />
      </button>
    </div>
  )
}

export default function Step4Skills() {
  const { skillList, addSkill, reorderSkill } = useCVStore()
  const hardSkills = skillList.filter((s) => s.type === 'hard')
  const softSkills = skillList.filter((s) => s.type === 'soft')

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="text-base font-semibold text-zinc-100">Keahlian</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Tambahkan hard skill dan soft skill. Beri rating 1-5 bintang. Seret untuk mengatur urutan.</p>
      </div>

      {skillList.length === 0 ? (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-zinc-500">Belum ada keahlian yang ditambahkan</p>
        </div>
      ) : (
        <DraggableList
          items={skillList}
          onReorder={reorderSkill}
          renderItem={(item) => <SkillCard item={item} />}
        />
      )}

      <button onClick={addSkill} className="btn-ghost w-full justify-center text-xs">
        <Plus size={12} />
        Tambah Keahlian
      </button>

      {/* Quick summary */}
      {skillList.length > 0 && (
        <div className="flex gap-2 text-xs text-zinc-500">
          <span className="badge">{hardSkills.length} Hard Skill</span>
          <span className="badge">{softSkills.length} Soft Skill</span>
        </div>
      )}
    </div>
  )
}
