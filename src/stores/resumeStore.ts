import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ResumeData, TailorResult } from '@/types/resume'

// ── History for undo/redo ─────────────────────────────────────
const MAX_HISTORY = 50

// ── Helper: Set value at deep path ────────────────────────────
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split('.')
  let current = obj as Record<string, unknown>
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }
  current[keys[keys.length - 1]] = value
}

interface EditorState {
  resume:          ResumeData | null
  past:            ResumeData[]
  future:          ResumeData[]
  isDirty:         boolean
  isSaving:        boolean
  isAISidebarOpen: boolean
  tailorResult:    TailorResult | null
  activeSection:   string
}

interface EditorActions {
  setResume:         (resume: ResumeData) => void
  updateField:       (path: string, value: unknown) => void
  undo:              () => void
  redo:              () => void
  setIsSaving:       (v: boolean) => void
  setIsDirty:        (v: boolean) => void
  toggleAISidebar:   () => void
  setTailorResult:   (result: TailorResult | null) => void
  setActiveSection:  (section: string) => void
  applySuggestion:   (fieldPath: string, value: string) => void
}

export const useEditorStore = create<EditorState & EditorActions>()(
  immer((set) => ({
    resume:          null,
    past:            [],
    future:          [],
    isDirty:         false,
    isSaving:        false,
    isAISidebarOpen: false,
    tailorResult:    null,
    activeSection:   'personal',

    setResume: (resume) => set(state => { state.resume = resume }),

    updateField: (path, value) => set(state => {
      if (!state.resume) return
      // Push current to history
      state.past.push(JSON.parse(JSON.stringify(state.resume)))
      if (state.past.length > MAX_HISTORY) state.past.shift()
      state.future = []
      // Apply update using deep path support
      setNestedValue(state.resume, path, value)
      state.isDirty = true
    }),

    undo: () => set(state => {
      if (state.past.length === 0 || !state.resume) return
      state.future.push(JSON.parse(JSON.stringify(state.resume)))
      state.resume = state.past.pop()!
      state.isDirty = true
    }),

    redo: () => set(state => {
      if (state.future.length === 0 || !state.resume) return
      state.past.push(JSON.parse(JSON.stringify(state.resume)))
      state.resume = state.future.pop()!
      state.isDirty = true
    }),

    setIsSaving:      (v)       => set(state => { state.isSaving = v }),
    setIsDirty:       (v)       => set(state => { state.isDirty = v }),
    toggleAISidebar:  ()        => set(state => { state.isAISidebarOpen = !state.isAISidebarOpen }),
    setTailorResult:  (result)  => set(state => { state.tailorResult = result }),
    setActiveSection: (section) => set(state => { state.activeSection = section }),

    applySuggestion: (fieldPath, value) => set(state => {
      if (!state.resume) return
      state.past.push(JSON.parse(JSON.stringify(state.resume)))
      setNestedValue(state.resume, fieldPath, value)
      state.isDirty = true
    }),
  }))
)
