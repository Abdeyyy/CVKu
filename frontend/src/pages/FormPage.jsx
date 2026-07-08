import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CaretLeft, CaretRight, FileText, ArrowLeft } from '@phosphor-icons/react'
import Navbar from '../components/layout/Navbar'
import StepIndicator, { STEPS } from '../components/form/StepIndicator'
import Step1PersonalInfo from '../components/form/steps/Step1PersonalInfo'
import Step2Education from '../components/form/steps/Step2Education'
import Step3Experience from '../components/form/steps/Step3Experience'
import Step4Skills from '../components/form/steps/Step4Skills'
import Step5Certifications from '../components/form/steps/Step5Certifications'
import Step6Languages from '../components/form/steps/Step6Languages'
import Step7Projects from '../components/form/steps/Step7Projects'
import Step8References from '../components/form/steps/Step8References'
import CVPreview from '../components/preview/CVPreview'
import ExportPanel from '../components/export/ExportPanel'
import useCVStore from '../store/cvStore'

const STEP_COMPONENTS = [
  Step1PersonalInfo,
  Step2Education,
  Step3Experience,
  Step4Skills,
  Step5Certifications,
  Step6Languages,
  Step7Projects,
  Step8References,
]

const TEMPLATE_OPTS = [
  { id: 'ats', label: 'ATS' },
  { id: 'kronologis', label: 'Kronologis' },
  { id: 'fungsional', label: 'Fungsional' },
  { id: 'kombinasi', label: 'Kombinasi' },
  { id: 'kreatif', label: 'Kreatif' },
]

export default function FormPage() {
  const navigate = useNavigate()
  const store = useCVStore()
  const { currentStep, setStep, nextStep, prevStep, selectedTemplate, setTemplate, themeConfig } = store
  const [showPreview, setShowPreview] = useState(false) // mobile toggle

  const StepComponent = STEP_COMPONENTS[currentStep]

  const cvData = {
    personalInfo: store.personalInfo,
    educationList: store.educationList,
    experienceList: store.experienceList,
    skillList: store.skillList,
    certificationList: store.certificationList,
    languageList: store.languageList,
    projectList: store.projectList,
    referenceList: store.referenceList,
    visibleSections: store.visibleSections,
  }

  // Calculate scale for preview panel
  const previewScale = 0.58

  return (
    <div className="min-h-[100dvh] bg-surface-950 flex flex-col">
      <Navbar />

      <div className="flex flex-1" style={{ paddingTop: 'var(--nav-height)' }}>
        {/* ── Left Panel: Sidebar (steps) + Form ── */}
        <div className="flex flex-col w-full lg:w-[520px] xl:w-[580px] shrink-0 border-r border-surface-700">
          <div className="flex flex-1 min-h-0">
            {/* Steps sidebar (desktop) */}
            <div className="hidden md:block w-44 xl:w-52 shrink-0 border-r border-surface-700 p-4 overflow-y-auto">
              <StepIndicator currentStep={currentStep} onStepClick={setStep} />
            </div>

            {/* Form scrollable area */}
            <div className="flex-1 overflow-y-auto p-5 lg:p-6">
              {/* Mobile step indicator */}
              <div className="md:hidden mb-4">
                <StepIndicator currentStep={currentStep} onStepClick={setStep} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation footer */}
          <div className="shrink-0 border-t border-surface-700 p-4 flex items-center justify-between gap-3 bg-surface-900">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`btn-ghost text-xs px-4 ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <CaretLeft size={14} />
              Sebelumnya
            </button>

            {/* Step label (mobile) */}
            <span className="text-[11px] text-zinc-600 font-mono">
              {currentStep + 1}/{STEPS.length}
            </span>

            {currentStep < STEPS.length - 1 ? (
              <button onClick={nextStep} className="btn-primary text-xs px-4">
                Selanjutnya
                <CaretRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => { store.saveCurrentCV(); navigate('/dashboard') }}
                className="btn-primary text-xs px-4"
              >
                Selesai
                <FileText size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ── Right Panel: Preview + Controls ── */}
        <div className="hidden lg:flex flex-1 flex-col bg-surface-900 overflow-hidden">
          {/* Template selector tabs */}
          <div className="shrink-0 border-b border-surface-700 px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-zinc-500 shrink-0 mr-1">Template:</span>
            {TEMPLATE_OPTS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTemplate(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0
                  ${selectedTemplate === id
                    ? 'bg-accent text-white'
                    : 'bg-surface-700 text-zinc-400 hover:text-zinc-200'}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* CV Preview (scrollable) */}
            <div className="flex-1 overflow-auto p-6">
              <div style={{ width: `${760 * previewScale}px` }}>
                <CVPreview
                  data={cvData}
                  selectedTemplate={selectedTemplate}
                  themeConfig={themeConfig}
                  scale={previewScale}
                />
              </div>
            </div>

            {/* Right controls sidebar */}
            <div className="w-64 shrink-0 border-l border-surface-700 overflow-y-auto p-4">
              <ExportPanel />
            </div>
          </div>
        </div>

        {/* Mobile: floating preview toggle */}
        <button
          className="lg:hidden fixed bottom-20 right-4 z-30 btn-primary shadow-lg shadow-accent/20"
          onClick={() => setShowPreview(true)}
        >
          <FileText size={16} />
          Preview CV
        </button>
      </div>

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-surface-950/95 backdrop-blur-sm overflow-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-zinc-100">Preview CV</h2>
                <button className="btn-ghost text-xs px-3 py-1.5" onClick={() => setShowPreview(false)}>
                  <ArrowLeft size={13} />
                  Kembali ke Form
                </button>
              </div>

              {/* Template picker mobile */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {TEMPLATE_OPTS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setTemplate(id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0
                      ${selectedTemplate === id ? 'bg-accent text-white' : 'bg-surface-700 text-zinc-400'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Preview scaled for mobile */}
              <div className="overflow-auto">
                <div style={{ width: `${760 * 0.45}px` }}>
                  <CVPreview data={cvData} selectedTemplate={selectedTemplate} themeConfig={themeConfig} scale={0.45} />
                </div>
              </div>

              <div className="mt-4">
                <ExportPanel />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
