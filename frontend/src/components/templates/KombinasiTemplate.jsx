/* ────────────────────────────────────────────────────────────
   Kombinasi Template — skills summary on top, then chronological work history
   Best for mid-career professionals wanting both highlights.
──────────────────────────────────────────────────────────── */

export default function KombinasiTemplate({ data, theme }) {
  const {
    personalInfo = {},
    educationList = [],
    experienceList = [],
    skillList = [],
    certificationList = [],
    languageList = [],
    projectList = [],
    visibleSections = {},
  } = data

  const accent = theme?.accentColor || '#0F766E'
  const font = '"Inter Tight", Arial, sans-serif'
  const hard = skillList.filter((s) => s.type === 'hard')
  const soft = skillList.filter((s) => s.type === 'soft')

  const SectionTitle = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px' }}>
      <div style={{ width: '4px', height: '18px', background: accent, borderRadius: '2px', flexShrink: 0 }} />
      <h2 style={{ fontSize: '10.5pt', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0, color: '#1a1a1a' }}>
        {children}
      </h2>
    </div>
  )

  return (
    <div style={{ fontFamily: font, fontSize: '10pt', color: '#1a1a1a', backgroundColor: '#fff', maxWidth: '760px', margin: '0 auto', minHeight: '1056px' }}>
      {/* Header */}
      <div style={{ padding: '28px 36px 20px', borderBottom: `3px solid ${accent}` }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Foto profil" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover', border: `2px solid ${accent}` }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '22pt', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-0.03em', color: '#0a0a0a' }}>
              {personalInfo.fullName || 'Nama Lengkap'}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '9pt', color: '#555' }}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.city && <span>{personalInfo.city}</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            </div>
          </div>
        </div>
        {personalInfo.summary && (
          <p style={{ margin: '12px 0 0', fontSize: '10pt', color: '#444', lineHeight: '1.6' }}>
            {personalInfo.summary}
          </p>
        )}
      </div>

      <div style={{ padding: '20px 36px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '28px' }}>
        {/* Left column (main) */}
        <div>
          {/* Skills summary */}
          {visibleSections.skills !== false && skillList.length > 0 && (
            <div style={{ marginBottom: '20px', padding: '14px', background: `${accent}06`, borderRadius: '8px', border: `1px solid ${accent}20` }}>
              <SectionTitle>Keahlian Utama</SectionTitle>
              {hard.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {hard.map((s) => (
                      <span key={s.id} style={{ fontSize: '8.5pt', padding: '3px 10px', background: accent, color: '#fff', borderRadius: '999px' }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {soft.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {soft.map((s) => (
                    <span key={s.id} style={{ fontSize: '8.5pt', padding: '3px 10px', background: 'transparent', color: accent, borderRadius: '999px', border: `1px solid ${accent}60` }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Experience (chronological) */}
          {visibleSections.experience !== false && experienceList.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <SectionTitle>Pengalaman Kerja</SectionTitle>
              {experienceList.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '10px', borderLeft: `2px solid ${accent}30` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '10.5pt', margin: '0', color: '#0a0a0a' }}>{exp.position}</p>
                      <p style={{ fontSize: '9.5pt', color: accent, margin: '1px 0 0', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '8.5pt', color: '#777', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {exp.startDate}{exp.isCurrent ? ' - Sekarang' : exp.endDate ? ` - ${exp.endDate}` : ''}
                    </span>
                  </div>
                  {(exp.bullets || []).filter(Boolean).map((b, i) => (
                    <p key={i} style={{ fontSize: '9.5pt', margin: '3px 0', color: '#444', lineHeight: '1.5' }}>
                      <span style={{ color: accent, marginRight: '5px' }}>•</span>{b}
                    </p>
                  ))}
                  {!(exp.bullets || []).filter(Boolean).length && exp.description && (
                    <p style={{ fontSize: '9.5pt', margin: '3px 0', color: '#444' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {visibleSections.projects !== false && projectList.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <SectionTitle>Proyek</SectionTitle>
              {projectList.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '10px', paddingLeft: '10px', borderLeft: `2px solid ${accent}30` }}>
                  <p style={{ fontWeight: '700', margin: '0', fontSize: '10pt' }}>{proj.name}</p>
                  {proj.role && <p style={{ fontSize: '9pt', color: accent, margin: '1px 0' }}>{proj.role}</p>}
                  {proj.tech && <p style={{ fontSize: '8.5pt', color: '#666', margin: '1px 0' }}>Stack: {proj.tech}</p>}
                  {proj.description && <p style={{ fontSize: '9.5pt', color: '#333', margin: '3px 0 0' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div>
          {/* Education */}
          {visibleSections.education !== false && educationList.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <SectionTitle>Pendidikan</SectionTitle>
              {educationList.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <p style={{ fontWeight: '700', fontSize: '9.5pt', margin: '0' }}>{edu.degree}</p>
                  {edu.field && <p style={{ fontSize: '9pt', color: '#444', margin: '1px 0' }}>{edu.field}</p>}
                  <p style={{ fontSize: '9pt', color: accent, margin: '0' }}>{edu.institution}</p>
                  <p style={{ fontSize: '8.5pt', color: '#777', margin: '0' }}>
                    {edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}
                    {edu.gpa ? ` · IPK ${edu.gpa}` : ''}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {visibleSections.languages !== false && languageList.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <SectionTitle>Bahasa</SectionTitle>
              {languageList.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '9.5pt' }}>
                  <span>{l.name}</span>
                  <span style={{ color: '#777', fontSize: '8.5pt' }}>{l.level}</span>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {visibleSections.certifications !== false && certificationList.length > 0 && (
            <div>
              <SectionTitle>Sertifikasi</SectionTitle>
              {certificationList.map((c) => (
                <div key={c.id} style={{ marginBottom: '7px' }}>
                  <p style={{ fontWeight: '600', fontSize: '9pt', margin: '0' }}>{c.name}</p>
                  <p style={{ fontSize: '8.5pt', color: '#666', margin: '0' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
