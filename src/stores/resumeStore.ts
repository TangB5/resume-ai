import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { set as _set, get as _get } from 'lodash'
import type { ResumeData, TailorResult } from '@/types/resume'

// ── History for undo/redo ─────────────────────────────────────
const MAX_HISTORY = 50

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
  immer((set, get) => ({
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
      // Apply update using lodash set for deep path support
      _set(state.resume, path, value)
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
      _set(state.resume, fieldPath, value)
      state.isDirty = true
    }),
  }))
)
