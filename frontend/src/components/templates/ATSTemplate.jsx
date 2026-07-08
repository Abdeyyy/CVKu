/* ────────────────────────────────────────────────────────────
   ATS Template — plain text friendly, single-column, no graphics
   Ideal for applicant tracking systems.
──────────────────────────────────────────────────────────── */

function SectionTitle({ children }) {
  return (
    <div className="mt-5 mb-2">
      <h2 style={{ fontSize: '10pt', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '2px', margin: '0' }}>
        {children}
      </h2>
    </div>
  )
}

export default function ATSTemplate({ data, theme }) {
  const {
    personalInfo = {},
    educationList = [],
    experienceList = [],
    skillList = [],
    certificationList = [],
    languageList = [],
    projectList = [],
    referenceList = [],
    visibleSections = {},
  } = data

  const font = theme?.font === 'jetbrains' ? '"JetBrains Mono"' : '"Courier New", Courier, monospace'
  const accentColor = '#000000' // ATS = black only

  return (
    <div style={{
      fontFamily: font,
      fontSize: '10pt',
      lineHeight: '1.5',
      color: '#000',
      backgroundColor: '#fff',
      padding: '28px 32px',
      maxWidth: '760px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h1 style={{ fontSize: '16pt', fontWeight: '700', margin: '0 0 4px' }}>
          {personalInfo.fullName || 'Nama Lengkap'}
        </h1>
        <div style={{ fontSize: '9pt', color: '#333' }}>
          {[personalInfo.email, personalInfo.phone, personalInfo.city, personalInfo.website, personalInfo.linkedin]
            .filter(Boolean)
            .join('  |  ')}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <>
          <SectionTitle>Ringkasan Profesional</SectionTitle>
          <p style={{ margin: '0', fontSize: '10pt' }}>{personalInfo.summary}</p>
        </>
      )}

      {/* Experience */}
      {visibleSections.experience !== false && experienceList.length > 0 && (
        <>
          <SectionTitle>Pengalaman Kerja</SectionTitle>
          {experienceList.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>{exp.position}{exp.company ? `, ${exp.company}` : ''}</span>
                <span style={{ fontWeight: '400', fontSize: '9pt' }}>
                  {exp.startDate}{exp.isCurrent ? ' - Sekarang' : exp.endDate ? ` - ${exp.endDate}` : ''}
                </span>
              </div>
              {(exp.bullets || []).length > 0 ? (
                <ul style={{ margin: '3px 0 0 16px', padding: 0 }}>
                  {exp.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} style={{ marginBottom: '1px', fontSize: '10pt' }}>{b}</li>
                  ))}
                </ul>
              ) : exp.description ? (
                <p style={{ margin: '2px 0 0', fontSize: '10pt' }}>{exp.description}</p>
              ) : null}
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {visibleSections.education !== false && educationList.length > 0 && (
        <>
          <SectionTitle>Pendidikan</SectionTitle>
          {educationList.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
                <span>{edu.degree} {edu.field ? `- ${edu.field}` : ''}</span>
                <span style={{ fontWeight: '400', fontSize: '9pt' }}>
                  {edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}
                </span>
              </div>
              <div style={{ fontSize: '10pt' }}>
                {edu.institution}{edu.gpa ? ` | IPK: ${edu.gpa}` : ''}
              </div>
              {edu.description && <p style={{ margin: '2px 0 0', fontSize: '9.5pt' }}>{edu.description}</p>}
            </div>
          ))}
        </>
      )}

      {/* Skills */}
      {visibleSections.skills !== false && skillList.length > 0 && (
        <>
          <SectionTitle>Keahlian</SectionTitle>
          {(() => {
            const hard = skillList.filter((s) => s.type === 'hard').map((s) => s.name).filter(Boolean)
            const soft = skillList.filter((s) => s.type === 'soft').map((s) => s.name).filter(Boolean)
            return (
              <div style={{ fontSize: '10pt' }}>
                {hard.length > 0 && <p style={{ margin: '0' }}><strong>Hard Skill:</strong> {hard.join(', ')}</p>}
                {soft.length > 0 && <p style={{ margin: '2px 0 0' }}><strong>Soft Skill:</strong> {soft.join(', ')}</p>}
              </div>
            )
          })()}
        </>
      )}

      {/* Certifications */}
      {visibleSections.certifications !== false && certificationList.length > 0 && (
        <>
          <SectionTitle>Sertifikasi</SectionTitle>
          {certificationList.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>{cert.name}</strong>{cert.issuer ? ` - ${cert.issuer}` : ''}</span>
              <span style={{ fontSize: '9pt' }}>{cert.year}</span>
            </div>
          ))}
        </>
      )}

      {/* Languages */}
      {visibleSections.languages !== false && languageList.length > 0 && (
        <>
          <SectionTitle>Bahasa</SectionTitle>
          <p style={{ margin: 0, fontSize: '10pt' }}>
            {languageList.map((l) => `${l.name} (${l.level})`).join('  |  ')}
          </p>
        </>
      )}

      {/* Projects */}
      {visibleSections.projects !== false && projectList.length > 0 && (
        <>
          <SectionTitle>Proyek</SectionTitle>
          {projectList.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <div style={{ fontWeight: '700' }}>
                {proj.name}{proj.role ? ` - ${proj.role}` : ''}
                {proj.startDate ? <span style={{ fontWeight: '400', fontSize: '9pt' }}> ({proj.startDate})</span> : ''}
              </div>
              {proj.tech && <div style={{ fontSize: '9.5pt', color: '#444' }}>Teknologi: {proj.tech}</div>}
              {proj.description && <p style={{ margin: '2px 0 0', fontSize: '10pt' }}>{proj.description}</p>}
              {proj.url && <div style={{ fontSize: '9pt', color: '#333' }}>{proj.url}</div>}
            </div>
          ))}
        </>
      )}

      {/* References */}
      {visibleSections.references && referenceList.length > 0 && (
        <>
          <SectionTitle>Referensi</SectionTitle>
          {referenceList.map((ref) => (
            <div key={ref.id} style={{ marginBottom: '6px' }}>
              <strong>{ref.name}</strong>
              {ref.position && `, ${ref.position}`}
              {ref.company && ` - ${ref.company}`}
              {ref.email && <span style={{ fontSize: '9pt' }}> | {ref.email}</span>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
