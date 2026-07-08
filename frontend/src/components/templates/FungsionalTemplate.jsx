/* ────────────────────────────────────────────────────────────
   Fungsional Template — skills & competencies first, then brief experience
   Best for fresh graduates and career switchers.
──────────────────────────────────────────────────────────── */

export default function FungsionalTemplate({ data, theme }) {
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

  const accent = theme?.accentColor || '#6366F1'
  const font = '"Inter Tight", Arial, sans-serif'
  const hard = skillList.filter((s) => s.type === 'hard')
  const soft = skillList.filter((s) => s.type === 'soft')

  return (
    <div style={{ fontFamily: font, fontSize: '10pt', color: '#111', backgroundColor: '#fff', padding: '0', maxWidth: '760px', margin: '0 auto', minHeight: '1056px' }}>
      {/* Header banner */}
      <div style={{ backgroundColor: accent, padding: '28px 32px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Foto profil" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)' }} />
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '20pt', fontWeight: '800', margin: '0 0 2px', letterSpacing: '-0.02em' }}>
              {personalInfo.fullName || 'Nama Lengkap'}
            </h1>
            <div style={{ fontSize: '8.5pt', opacity: 0.8, marginTop: '4px' }}>
              {[personalInfo.email, personalInfo.phone, personalInfo.city, personalInfo.linkedin]
                .filter(Boolean)
                .join('  ·  ')}
            </div>
          </div>
        </div>
        {personalInfo.summary && (
          <p style={{ margin: '12px 0 0', fontSize: '9.5pt', opacity: 0.9, lineHeight: '1.6', maxWidth: '540px' }}>
            {personalInfo.summary}
          </p>
        )}
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* Core Competencies (skills grid) */}
        {visibleSections.skills !== false && skillList.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '10pt', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '4px', margin: '0 0 12px' }}>
              Kompetensi Utama
            </h2>
            {hard.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '8.5pt', fontWeight: '700', color: '#555', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Hard Skill</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {hard.map((s) => (
                    <div key={s.id} style={{ padding: '6px 10px', background: `${accent}08`, border: `1px solid ${accent}20`, borderRadius: '6px' }}>
                      <p style={{ fontSize: '9pt', fontWeight: '600', margin: '0 0 3px' }}>{s.name}</p>
                      <div style={{ height: '3px', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(s.level / 5) * 100}%`, background: accent, borderRadius: '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {soft.length > 0 && (
              <div>
                <p style={{ fontSize: '8.5pt', fontWeight: '700', color: '#555', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Soft Skill</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {soft.map((s) => (
                    <span key={s.id} style={{ fontSize: '8.5pt', padding: '4px 10px', background: '#f3f4f6', color: '#374151', borderRadius: '999px', border: '1px solid #e5e7eb' }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '24px' }}>
          <div>
            {/* Experience (summarized) */}
            {visibleSections.experience !== false && experienceList.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '10pt', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '4px', margin: '0 0 12px' }}>
                  Pengalaman Kerja
                </h2>
                {experienceList.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p style={{ fontWeight: '700', fontSize: '10pt', margin: '0' }}>{exp.position}</p>
                      <span style={{ fontSize: '8.5pt', color: '#666' }}>
                        {exp.startDate}{exp.isCurrent ? ' - Sekarang' : exp.endDate ? ` - ${exp.endDate}` : ''}
                      </span>
                    </div>
                    <p style={{ color: accent, fontSize: '9pt', margin: '1px 0 4px' }}>{exp.company}</p>
                    {(exp.bullets || []).filter(Boolean).slice(0, 3).map((b, i) => (
                      <p key={i} style={{ fontSize: '9.5pt', margin: '1px 0', paddingLeft: '12px', borderLeft: `2px solid ${accent}40`, color: '#444' }}>{b}</p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {visibleSections.projects !== false && projectList.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ fontSize: '10pt', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '4px', margin: '0 0 12px' }}>
                  Proyek
                </h2>
                {projectList.map((proj) => (
                  <div key={proj.id} style={{ marginBottom: '10px' }}>
                    <p style={{ fontWeight: '700', margin: '0' }}>{proj.name}</p>
                    {proj.tech && <p style={{ fontSize: '8.5pt', color: '#666', margin: '1px 0' }}>{proj.tech}</p>}
                    {proj.description && <p style={{ fontSize: '9.5pt', color: '#333', margin: '2px 0 0' }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div>
            {/* Education */}
            {visibleSections.education !== false && educationList.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '9pt', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: '0 0 8px' }}>
                  Pendidikan
                </h3>
                {educationList.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '8px' }}>
                    <p style={{ fontWeight: '700', fontSize: '9.5pt', margin: '0' }}>{edu.degree}</p>
                    <p style={{ fontSize: '8.5pt', color: '#444', margin: '1px 0' }}>{edu.field}</p>
                    <p style={{ fontSize: '8.5pt', color: '#666', margin: '0' }}>{edu.institution}</p>
                    <p style={{ fontSize: '8pt', color: '#888', margin: '0' }}>{edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}</p>
                    {edu.gpa && <p style={{ fontSize: '8pt', margin: '0' }}>IPK: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {visibleSections.languages !== false && languageList.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '9pt', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: '0 0 8px' }}>
                  Bahasa
                </h3>
                {languageList.map((l) => (
                  <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', fontSize: '9pt' }}>
                    <span>{l.name}</span>
                    <span style={{ color: '#666', fontSize: '8.5pt' }}>{l.level}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {visibleSections.certifications !== false && certificationList.length > 0 && (
              <div>
                <h3 style={{ fontSize: '9pt', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: '0 0 8px' }}>
                  Sertifikasi
                </h3>
                {certificationList.map((c) => (
                  <div key={c.id} style={{ marginBottom: '6px' }}>
                    <p style={{ fontWeight: '600', fontSize: '9pt', margin: '0' }}>{c.name}</p>
                    <p style={{ fontSize: '8pt', color: '#666', margin: '0' }}>{c.issuer} {c.year && `· ${c.year}`}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
