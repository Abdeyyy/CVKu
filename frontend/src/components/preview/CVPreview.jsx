import { useRef } from 'react'
import ATSTemplate from '../templates/ATSTemplate'
import KronologisTemplate from '../templates/KronologisTemplate'
import FungsionalTemplate from '../templates/FungsionalTemplate'
import KombinasiTemplate from '../templates/KombinasiTemplate'
import KreatifTemplate from '../templates/KreatifTemplate'

const TEMPLATES = {
  ats: ATSTemplate,
  kronologis: KronologisTemplate,
  fungsional: FungsionalTemplate,
  kombinasi: KombinasiTemplate,
  kreatif: KreatifTemplate,
}

export default function CVPreview({ data, selectedTemplate, themeConfig, scale = 0.65 }) {
  const Template = TEMPLATES[selectedTemplate] || ATSTemplate

  return (
    <div
      className="bg-white shadow-2xl"
      style={{
        width: '760px',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        minHeight: '1056px',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      <Template data={data} theme={themeConfig} />
    </div>
  )
}

export { TEMPLATES }
