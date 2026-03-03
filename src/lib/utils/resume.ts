import { nanoid } from 'nanoid'
import type {
  ResumeData,
  TemplateId,
  ParsedResume,
  ExperienceItem,
  EducationItem,
  SkillGroup,
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from '@/types/resume'

export const DEFAULT_COLOR_SCHEMES = {
  creative:     { primary: '#7c3aed', accent: '#f59e0b', background: '#fafafa', text: '#1a1a2e' },
  simple:       { primary: '#374151', accent: '#6b7280', background: '#ffffff', text: '#111827' },
  modern:       { primary: '#0891b2', accent: '#06b6d4', background: '#f8fafc', text: '#0f172a' },
  professional: { primary: '#1e3a5f', accent: '#c9a84c', background: '#ffffff', text: '#1a1a1a' },
}

export function createEmptyResume(
  userId: string,
  template: TemplateId = 'modern'
): ResumeData {
  return {
    id:       nanoid(),
    userId,
    title:    'My Resume',
    meta: {
      templateId:  template,
      colorScheme: DEFAULT_COLOR_SCHEMES[template],
      language:    'en',
      isPublic:    false,
    },
    personal: {
      firstName: '', lastName: '',  title: '',
      email: '',    phone: '',      location: '',
    },
    experience:     [],
    education:      [],
    skills:         [],
    projects:       [],
    certifications: [],
    languages:      [],
    createdAt:      new Date().toISOString(),
    updatedAt:      new Date().toISOString(),
  }
}

export function parsedToResume(
  parsed: ParsedResume,
  userId: string
): ResumeData {
  const base = createEmptyResume(userId)
  return {
    ...base,
    meta:     { ...base.meta, language: parsed.detectedLanguage || 'en' },
    personal: { ...base.personal, ...parsed.personal },
    experience:    parsed.experience.map(e => ({ ...e, id: nanoid() })) as ExperienceItem[],
    education:     parsed.education.map(e => ({ ...e, id: nanoid() })) as EducationItem[],
    skills:        parsed.skills.map(s => ({ ...s, id: nanoid() })) as SkillGroup[],
    projects:      parsed.projects.map(p => ({ ...p, id: nanoid() })) as ProjectItem[],
    certifications:parsed.certifications.map(c => ({ ...c, id: nanoid() })) as CertificationItem[],
    languages:     parsed.languages.map(l => ({ ...l, id: nanoid() })) as LanguageItem[],
  }
}

export function generatePublicSlug(): string {
  return nanoid(10)
}
