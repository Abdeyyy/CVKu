/* ────────────────────────────────────────────────────────────
   Kreatif Template — bold visual design with colored sidebar
   For designers, illustrators, creative professionals.
──────────────────────────────────────────────────────────── */

function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
        <div style={{ width: '18px', height: '2px', background: accent }} />
        <h3 style={{ fontSize: '9pt', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', color: accent, margin: 0 }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

function MainSection({ title, accent, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <div style={{ width: '3px', height: '18px', background: accent, borderRadius: '2px' }} />
        <h2 style={{ fontSize: '11pt', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, color: '#1a1a1a' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  )
}

export default function KreatifTemplate({ data, theme }) {
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

  const accent = theme?.accentColor || '#7C3AED'
  const font = 'Outfit, "Inter Tight", Arial, sans-serif'
  const hard = skillList.filter((s) => s.type === 'hard')
  const soft = skillList.filter((s) => s.type === 'soft')

  // Darken accent for sidebar background
  const sidebarBg = accent

  return (
    <div style={{ fontFamily: font, fontSize: '10pt', color: '#1a1a1a', backgroundColor: '#fff', display: 'flex', maxWidth: '760px', margin: '0 auto', minHeight: '1056px' }}>
      {/* Sidebar (colored) */}
      <div style={{ width: '210px', background: sidebarBg, padding: '0', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Photo area */}
        <div style={{ padding: '28px 20px 20px', textAlign: 'center' }}>
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Foto profil" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.35)', marginBottom: '14px' }} />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.35)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '28pt', fontWeight: '700', color: 'rgba(255,255,255,0.6)' }}>
                {(personalInfo.fullName || 'N')[0]}
              </span>
            </div>
          )}
          <h1 style={{ fontSize: '13pt', fontWeight: '800', color: '#fff', margin: '0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            {personalInfo.fullName || 'Nama Lengkap'}
          </h1>
        </div>

        {/* Sidebar section divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 20px' }} />

        <div style={{ padding: '18px 20px', flex: 1 }}>
          {/* Contact */}
          <Section title="Kontak" accent="rgba(255,255,255,0.7)">
            {personalInfo.email && (
              <p style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.9)', margin: '0 0 5px', wordBreak: 'break-all' }}>
                {personalInfo.email}
              </p>
            )}
            {personalInfo.phone && (
              <p style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.9)', margin: '0 0 5px' }}>{personalInfo.phone}</p>
            )}
            {personalInfo.city && (
              <p style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.9)', margin: '0 0 5px' }}>{personalInfo.city}</p>
            )}
            {personalInfo.website && (
              <p style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.8)', margin: '0 0 5px', wordBreak: 'break-all' }}>{personalInfo.website}</p>
            )}
            {personalInfo.linkedin && (
              <p style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.8)', margin: '0', wordBreak: 'break-all' }}>{personalInfo.linkedin}</p>
            )}
          </Section>

          {/* Skills */}
          {visibleSections.skills !== false && skillList.length > 0 && (
            <Section title="Keahlian" accent="rgba(255,255,255,0.7)">
              {hard.map((s) => (
                <div key={s.id} style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '8.5pt', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>{s.name}</span>
                    <span style={{ fontSize: '7.5pt', color: 'rgba(255,255,255,0.55)' }}>{s.level}/5</span>
                  </div>
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(s.level / 5) * 100}%`, background: 'rgba(255,255,255,0.9)', borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
              {soft.length > 0 && (
                <>
                  <p style={{ fontSize: '7.5pt', color: 'rgba(255,255,255,0.55)', margin: '10px 0 5px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Soft Skill</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {soft.map((s) => (
                      <span key={s.id} style={{ fontSize: '7.5pt', padding: '2px 7px', background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.25)' }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </Section>
          )}

          {/* Languages */}
          {visibleSections.languages !== false && languageList.length > 0 && (
            <Section title="Bahasa" accent="rgba(255,255,255,0.7)">
              {languageList.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '8.5pt' }}>
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>{l.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{l.level}</span>
                </div>
              ))}
            </Section>
          )}

          {/* Education in sidebar */}
          {visibleSections.education !== false && educationList.length > 0 && (
            <Section title="Pendidikan" accent="rgba(255,255,255,0.7)">
              {educationList.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '8.5pt', fontWeight: '700', color: 'rgba(255,255,255,0.95)', margin: '0' }}>{edu.degree}</p>
                  <p style={{ fontSize: '8pt', color: 'rgba(255,255,255,0.75)', margin: '1px 0' }}>{edu.field}</p>
                  <p style={{ fontSize: '8pt', color: 'rgba(255,255,255,0.6)', margin: '0' }}>{edu.institution}</p>
                  <p style={{ fontSize: '7.5pt', color: 'rgba(255,255,255,0.5)', margin: '0' }}>
                    {edu.startYear}{edu.endYear ? ` - ${edu.endYear}` : ''}
                    {edu.gpa ? ` · ${edu.gpa}` : ''}
                  </p>
                </div>
              ))}
            </Section>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '28px 28px 28px 24px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '20px', padding: '14px', background: `${accent}08`, borderRadius: '8px', borderLeft: `4px solid ${accent}` }}>
            <p style={{ fontSize: '10pt', color: '#333', lineHeight: '1.7', margin: 0 }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {visibleSections.experience !== false && experienceList.length > 0 && (
          <MainSection title="Pengalaman" accent={accent}>
            {experienceList.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', display: 'flex', gap: '12px' }}>
                <div style={{ width: '10px', paddingTop: '4px', flexShrink: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: accent, marginBottom: '4px' }} />
                  <div style={{ width: '1px', background: `${accent}30`, margin: '0 auto', height: 'calc(100% - 12px)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '11pt', margin: '0', color: '#1a1a1a' }}>{exp.position}</p>
                      <p style={{ fontSize: '9.5pt', color: accent, margin: '2px 0 0', fontWeight: '600' }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '8.5pt', color: '#999', whiteSpace: 'nowrap', marginLeft: '8px', background: `${accent}10`, padding: '2px 8px', borderRadius: '999px' }}>
                      {exp.startDate}{exp.isCurrent ? ' - Sekarang' : exp.endDate ? ` - ${exp.endDate}` : ''}
                    </span>
                  </div>
                  {(exp.bullets || []).filter(Boolean).map((b, i) => (
                    <p key={i} style={{ fontSize: '9.5pt', margin: '5px 0 0', color: '#444', lineHeight: '1.5', display: 'flex', gap: '6px' }}>
                      <span style={{ color: accent, fontWeight: '700', flexShrink: 0 }}>›</span>
                      {b}
                    </p>
                  ))}
                  {!(exp.bullets || []).filter(Boolean).length && exp.description && (
                    <p style={{ fontSize: '9.5pt', margin: '5px 0 0', color: '#444' }}>{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {visibleSections.projects !== false && projectList.length > 0 && (
          <MainSection title="Proyek & Portofolio" accent={accent}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projectList.map((proj) => (
                <div key={proj.id} style={{ padding: '10px 12px', border: `1px solid ${accent}25`, borderRadius: '8px', background: `${accent}05` }}>
                  <p style={{ fontWeight: '700', fontSize: '9.5pt', margin: '0', color: '#1a1a1a' }}>{proj.name}</p>
                  {proj.role && <p style={{ fontSize: '8.5pt', color: accent, margin: '1px 0', fontWeight: '600' }}>{proj.role}</p>}
                  {proj.tech && <p style={{ fontSize: '8pt', color: '#888', margin: '2px 0' }}>{proj.tech}</p>}
                  {proj.description && <p style={{ fontSize: '8.5pt', color: '#555', margin: '4px 0 0', lineHeight: '1.5' }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Certifications */}
        {visibleSections.certifications !== false && certificationList.length > 0 && (
          <MainSection title="Sertifikasi" accent={accent}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {certificationList.map((c) => (
                <div key={c.id} style={{ padding: '8px 12px', background: '#f9f9f9', borderRadius: '6px', borderLeft: `3px solid ${accent}` }}>
                  <p style={{ fontWeight: '600', fontSize: '9pt', margin: '0' }}>{c.name}</p>
                  <p style={{ fontSize: '8.5pt', color: '#777', margin: '1px 0 0' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </div>
    </div>
  )
}
