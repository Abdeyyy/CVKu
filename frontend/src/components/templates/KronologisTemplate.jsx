/* ────────────────────────────────────────────────────────────
   Kronologis Template — two-column: thin sidebar left, main right
   Highlights work history in reverse chronological order.
──────────────────────────────────────────────────────────── */

function SideSection({ title, children, accent }) {
  return (
    <div className="mb-5">
      <h3 style={{ fontSize: '9pt', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, borderBottom: `1px solid ${accent}40`, paddingBottom: '3px', marginBottom: '8px' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function MainSection({ title, children, accent }) {
  return (
    <div className="mb-5">
      <h2 style={{ fontSize: '10pt', fontWeight: '700', letterSpacing: '0.06em', textTransform: 'uppercase', color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: '3px', marginBottom: '10px' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

export default function KronologisTemplate({ data, theme }) {
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

  const accent = theme?.accentColor || '#2563EB'
  const font = '"Inter Tight", Arial, sans-serif'

  const hard = skillList.filter((s) => s.type === 'hard')
  const soft = skillList.filter((s) => s.type === 'soft')

  return (
    <div style={{ fontFamily: font, fontSize: '10pt', color: '#111', backgroundColor: '#fff', display: 'flex', minHeight: '1056px', maxWidth: '760px', margin: '0 auto' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', backgroundColor: '#f8f9fa', padding: '28px 16px', shrink: 0, flexShrink: 0 }}>
        {/* Photo */}
        {personalInfo.photo && (
          <div style={{ marginBottom: '16px', textAlign: 'center' }}>
            <img src={personalInfo.photo} alt="Foto profil" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${accent}` }} />
          </div>
        )}

        {/* Contact */}
        <SideSection title="Kontak" accent={accent}>
          {personalInfo.email && <p style={{ fontSize: '8.5pt', margin: '0 0 3px', wordBreak: 'break-all' }}>{personalInfo.email}</p>}
          {personalInfo.phone && <p style={{ fontSize: '8.5pt', margin: '0 0 3px' }}>{personalInfo.phone}</p>}
          {personalInfo.city && <p style={{ fontSize: '8.5pt', margin: '0 0 3px' }}>{personalInfo.city}</p>}
          {personalInfo.website && <p style={{ fontSize: '8.5pt', margin: '0 0 3px', wordBreak: 'break-all' }}>{personalInfo.website}</p>}
          {personalInfo.linkedin && <p style={{ fontSize: '8.5pt', margin: '0', wordBreak: 'break-all' }}>{personalInfo.linkedin}</p>}
        </SideSection>

        {/* Education in sidebar */}
        {visibleSections.education !== false && educationList.length > 0 && (
          <SideSection title="Pendidikan" accent={accent}>
            {educationList.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '8.5pt', fontWeight: '700', margin: '0' }}>{edu.degree}</p>
                <p style={{ fontSize: '8pt', margin: '0', color: '#444' }}>{edu.field}</p>
                <p style={{ fontSize: '8pt', margin: '0', color: '#666' }}>{edu.institution}</p>
                <p style={{ fontSize: '8pt', margin: '0', color: '#888' }}>
                  {edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}
                </p>
                {edu.gpa && <p style={{ fontSize: '8pt', margin: '0', color: '#444' }}>IPK: {edu.gpa}</p>}
              </div>
            ))}
          </SideSection>
        )}

        {/* Skills in sidebar */}
        {visibleSections.skills !== false && skillList.length > 0 && (
          <SideSection title="Keahlian" accent={accent}>
            {hard.length > 0 && (
              <>
                <p style={{ fontSize: '8pt', fontWeight: '700', margin: '0 0 3px', color: '#444' }}>Hard Skill</p>
                {hard.map((s) => (
                  <div key={s.id} style={{ marginBottom: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8.5pt', marginBottom: '1px' }}>
                      <span>{s.name}</span>
                    </div>
                    <div style={{ height: '3px', background: '#e0e0e0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(s.level / 5) * 100}%`, background: accent, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </>
            )}
            {soft.length > 0 && (
              <>
                <p style={{ fontSize: '8pt', fontWeight: '700', margin: '8px 0 3px', color: '#444' }}>Soft Skill</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {soft.map((s) => (
                    <span key={s.id} style={{ fontSize: '7.5pt', padding: '2px 6px', background: `${accent}15`, color: accent, borderRadius: '999px', border: `1px solid ${accent}40` }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </>
            )}
          </SideSection>
        )}

        {/* Languages */}
        {visibleSections.languages !== false && languageList.length > 0 && (
          <SideSection title="Bahasa" accent={accent}>
            {languageList.map((l) => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', fontSize: '8.5pt' }}>
                <span>{l.name}</span>
                <span style={{ color: '#666' }}>{l.level}</span>
              </div>
            ))}
          </SideSection>
        )}

        {/* Certifications */}
        {visibleSections.certifications !== false && certificationList.length > 0 && (
          <SideSection title="Sertifikasi" accent={accent}>
            {certificationList.map((c) => (
              <div key={c.id} style={{ marginBottom: '5px' }}>
                <p style={{ fontSize: '8.5pt', fontWeight: '700', margin: '0' }}>{c.name}</p>
                <p style={{ fontSize: '8pt', color: '#666', margin: '0' }}>{c.issuer} {c.year && `· ${c.year}`}</p>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '28px 24px 28px 20px' }}>
        {/* Name & title */}
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ fontSize: '18pt', fontWeight: '800', margin: '0 0 2px', color: '#111' }}>
            {personalInfo.fullName || 'Nama Lengkap'}
          </h1>
          {personalInfo.summary && (
            <p style={{ fontSize: '9.5pt', color: '#444', margin: '6px 0 0', lineHeight: '1.5' }}>
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Experience */}
        {visibleSections.experience !== false && experienceList.length > 0 && (
          <MainSection title="Pengalaman Kerja" accent={accent}>
            {experienceList.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '10.5pt', margin: '0' }}>{exp.position}</p>
                    <p style={{ fontSize: '9.5pt', color: accent, margin: '1px 0 0' }}>{exp.company}</p>
                  </div>
                  <span style={{ fontSize: '8.5pt', color: '#666', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {exp.startDate}{exp.isCurrent ? ' - Sekarang' : exp.endDate ? ` - ${exp.endDate}` : ''}
                  </span>
                </div>
                {(exp.bullets || []).length > 0 ? (
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i} style={{ fontSize: '9.5pt', marginBottom: '2px', color: '#333' }}>{b}</li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p style={{ margin: '4px 0 0', fontSize: '9.5pt', color: '#333' }}>{exp.description}</p>
                ) : null}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {visibleSections.projects !== false && projectList.length > 0 && (
          <MainSection title="Proyek" accent={accent}>
            {projectList.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: '700', fontSize: '10pt', margin: '0' }}>{proj.name}</p>
                  {proj.startDate && <span style={{ fontSize: '8.5pt', color: '#666' }}>{proj.startDate}</span>}
                </div>
                {proj.role && <p style={{ fontSize: '9pt', color: accent, margin: '1px 0' }}>{proj.role}</p>}
                {proj.tech && <p style={{ fontSize: '8.5pt', color: '#666', margin: '1px 0' }}>Teknologi: {proj.tech}</p>}
                {proj.description && <p style={{ fontSize: '9.5pt', color: '#333', margin: '3px 0 0' }}>{proj.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* References */}
        {visibleSections.references && referenceList.length > 0 && (
          <MainSection title="Referensi" accent={accent}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {referenceList.map((ref) => (
                <div key={ref.id}>
                  <p style={{ fontWeight: '700', fontSize: '10pt', margin: '0' }}>{ref.name}</p>
                  <p style={{ fontSize: '9pt', margin: '1px 0', color: '#444' }}>{ref.position}{ref.company ? `, ${ref.company}` : ''}</p>
                  {ref.email && <p style={{ fontSize: '8.5pt', margin: '1px 0', color: '#666' }}>{ref.email}</p>}
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  )
}
