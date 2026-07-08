import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultTheme = {
  accentColor: '#3B82F6',
  font: 'inter-tight',
  layout: 'standard',
}

const defaultPersonalInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  website: '',
  linkedin: '',
  summary: '',
  photo: null, // base64 string
}

const useCVStore = create(
  persist(
    (set, get) => ({
      // ── Saved CVs (list) ────────────────────────────────────
      savedCVs: [],

      // ── Active CV ID ─────────────────────────────────────────
      activeCVId: null,

      // ── CV Content Data (decoupled from template) ────────────
      personalInfo: { ...defaultPersonalInfo },
      educationList: [],
      experienceList: [],
      skillList: [],
      certificationList: [],
      languageList: [],
      projectList: [],
      referenceList: [],

      // ── Template & Theme ──────────────────────────────────────
      selectedTemplate: 'ats',
      themeConfig: { ...defaultTheme },

      // ── Visible sections toggle ───────────────────────────────
      visibleSections: {
        education: true,
        experience: true,
        skills: true,
        certifications: true,
        languages: true,
        projects: true,
        references: false,
      },

      // ── Wizard UI state ───────────────────────────────────────
      currentStep: 0,

      // ── Actions: Personal Info ───────────────────────────────
      setPersonalInfo: (data) =>
        set((state) => ({ personalInfo: { ...state.personalInfo, ...data } })),

      setPhotoBase64: (base64) =>
        set((state) => ({ personalInfo: { ...state.personalInfo, photo: base64 } })),

      // ── Actions: Education ────────────────────────────────────
      addEducation: () =>
        set((state) => ({
          educationList: [
            ...state.educationList,
            {
              id: crypto.randomUUID(),
              institution: '',
              degree: '',
              field: '',
              startYear: '',
              endYear: '',
              gpa: '',
              description: '',
            },
          ],
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          educationList: state.educationList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeEducation: (id) =>
        set((state) => ({
          educationList: state.educationList.filter((item) => item.id !== id),
        })),

      reorderEducation: (newList) => set({ educationList: newList }),

      // ── Actions: Experience ───────────────────────────────────
      addExperience: () =>
        set((state) => ({
          experienceList: [
            ...state.experienceList,
            {
              id: crypto.randomUUID(),
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              isCurrent: false,
              description: '',
              bullets: [],
            },
          ],
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          experienceList: state.experienceList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeExperience: (id) =>
        set((state) => ({
          experienceList: state.experienceList.filter((item) => item.id !== id),
        })),

      reorderExperience: (newList) => set({ experienceList: newList }),

      // ── Actions: Skills ───────────────────────────────────────
      addSkill: () =>
        set((state) => ({
          skillList: [
            ...state.skillList,
            {
              id: crypto.randomUUID(),
              name: '',
              type: 'hard', // 'hard' | 'soft'
              level: 3, // 1-5
            },
          ],
        })),

      updateSkill: (id, data) =>
        set((state) => ({
          skillList: state.skillList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeSkill: (id) =>
        set((state) => ({
          skillList: state.skillList.filter((item) => item.id !== id),
        })),

      reorderSkill: (newList) => set({ skillList: newList }),

      // ── Actions: Certifications ───────────────────────────────
      addCertification: () =>
        set((state) => ({
          certificationList: [
            ...state.certificationList,
            {
              id: crypto.randomUUID(),
              name: '',
              issuer: '',
              year: '',
              url: '',
            },
          ],
        })),

      updateCertification: (id, data) =>
        set((state) => ({
          certificationList: state.certificationList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeCertification: (id) =>
        set((state) => ({
          certificationList: state.certificationList.filter((item) => item.id !== id),
        })),

      // ── Actions: Languages ────────────────────────────────────
      addLanguage: () =>
        set((state) => ({
          languageList: [
            ...state.languageList,
            {
              id: crypto.randomUUID(),
              name: '',
              level: 'Menengah', // Dasar | Menengah | Mahir | Native
            },
          ],
        })),

      updateLanguage: (id, data) =>
        set((state) => ({
          languageList: state.languageList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeLanguage: (id) =>
        set((state) => ({
          languageList: state.languageList.filter((item) => item.id !== id),
        })),

      // ── Actions: Projects ─────────────────────────────────────
      addProject: () =>
        set((state) => ({
          projectList: [
            ...state.projectList,
            {
              id: crypto.randomUUID(),
              name: '',
              role: '',
              startDate: '',
              endDate: '',
              description: '',
              url: '',
              tech: '',
            },
          ],
        })),

      updateProject: (id, data) =>
        set((state) => ({
          projectList: state.projectList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeProject: (id) =>
        set((state) => ({
          projectList: state.projectList.filter((item) => item.id !== id),
        })),

      // ── Actions: References ───────────────────────────────────
      addReference: () =>
        set((state) => ({
          referenceList: [
            ...state.referenceList,
            {
              id: crypto.randomUUID(),
              name: '',
              position: '',
              company: '',
              email: '',
              phone: '',
            },
          ],
        })),

      updateReference: (id, data) =>
        set((state) => ({
          referenceList: state.referenceList.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      removeReference: (id) =>
        set((state) => ({
          referenceList: state.referenceList.filter((item) => item.id !== id),
        })),

      // ── Actions: Template & Theme ─────────────────────────────
      setTemplate: (templateId) => set({ selectedTemplate: templateId }),

      setThemeConfig: (config) =>
        set((state) => ({ themeConfig: { ...state.themeConfig, ...config } })),

      toggleSection: (section) =>
        set((state) => ({
          visibleSections: {
            ...state.visibleSections,
            [section]: !state.visibleSections[section],
          },
        })),

      // ── Wizard step ───────────────────────────────────────────
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      // ── Save / Load CVs ───────────────────────────────────────
      saveCurrentCV: () => {
        const state = get()
        const id = state.activeCVId || crypto.randomUUID()
        const cvData = {
          id,
          name: state.personalInfo.fullName || 'CV Tanpa Nama',
          updatedAt: new Date().toISOString(),
          personalInfo: state.personalInfo,
          educationList: state.educationList,
          experienceList: state.experienceList,
          skillList: state.skillList,
          certificationList: state.certificationList,
          languageList: state.languageList,
          projectList: state.projectList,
          referenceList: state.referenceList,
          selectedTemplate: state.selectedTemplate,
          themeConfig: state.themeConfig,
          visibleSections: state.visibleSections,
        }
        set((s) => ({
          activeCVId: id,
          savedCVs: s.savedCVs.some((cv) => cv.id === id)
            ? s.savedCVs.map((cv) => (cv.id === id ? cvData : cv))
            : [...s.savedCVs, cvData],
        }))
        return id
      },

      loadCV: (id) => {
        const state = get()
        const cv = state.savedCVs.find((c) => c.id === id)
        if (!cv) return
        set({
          activeCVId: cv.id,
          personalInfo: cv.personalInfo,
          educationList: cv.educationList,
          experienceList: cv.experienceList,
          skillList: cv.skillList,
          certificationList: cv.certificationList,
          languageList: cv.languageList,
          projectList: cv.projectList,
          referenceList: cv.referenceList,
          selectedTemplate: cv.selectedTemplate,
          themeConfig: cv.themeConfig,
          visibleSections: cv.visibleSections,
          currentStep: 0,
        })
      },

      duplicateCV: (id) => {
        const state = get()
        const cv = state.savedCVs.find((c) => c.id === id)
        if (!cv) return
        const newId = crypto.randomUUID()
        const newCV = { ...cv, id: newId, name: `${cv.name} (Salinan)`, updatedAt: new Date().toISOString() }
        set((s) => ({ savedCVs: [...s.savedCVs, newCV] }))
      },

      deleteCV: (id) =>
        set((state) => ({
          savedCVs: state.savedCVs.filter((cv) => cv.id !== id),
          activeCVId: state.activeCVId === id ? null : state.activeCVId,
        })),

      startNewCV: () =>
        set({
          activeCVId: null,
          personalInfo: { ...defaultPersonalInfo },
          educationList: [],
          experienceList: [],
          skillList: [],
          certificationList: [],
          languageList: [],
          projectList: [],
          referenceList: [],
          selectedTemplate: 'ats',
          themeConfig: { ...defaultTheme },
          visibleSections: {
            education: true,
            experience: true,
            skills: true,
            certifications: true,
            languages: true,
            projects: true,
            references: false,
          },
          currentStep: 0,
        }),
    }),
    {
      name: 'cvgenerator-store',
      version: 1,
    }
  )
)

export default useCVStore
