// ─────────────────────────────────────────────────────────────
//  Core Resume Domain Types
// ─────────────────────────────────────────────────────────────

export type TemplateId = 'creative' | 'simple' | 'modern' | 'professional'

export interface ColorScheme {
  primary:    string
  accent:     string
  background: string
  text:       string
  sidebar?:   string
}

export interface PersonalInfo {
  firstName:   string
  lastName:    string
  title:       string
  email:       string
  phone:       string
  location:    string
  website?:    string
  linkedin?:   string
  github?:     string
  summary?:    string
  avatarUrl?:  string
}

export interface ExperienceItem {
  id:          string
  company:     string
  position:    string
  location:    string
  startDate:   string   // YYYY-MM
  endDate:     string | null  // null = "Present"
  bullets:     string[]
  current:     boolean
}

export interface EducationItem {
  id:          string
  institution: string
  degree:      string
  field:       string
  location:    string
  startDate:   string
  endDate:     string | null
  gpa?:        string
  bullets?:    string[]
}

export interface SkillGroup {
  id:       string
  category: string   // e.g. "Frontend", "Languages", "Tools"
  items:    string[]
}

export interface ProjectItem {
  id:          string
  name:        string
  description: string
  url?:        string
  tech:        string[]
  bullets:     string[]
}

export interface CertificationItem {
  id:       string
  name:     string
  issuer:   string
  date:     string
  url?:     string
}

export interface LanguageItem {
  id:          string
  language:    string
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic'
}

export interface ResumeMeta {
  templateId:   TemplateId
  colorScheme:  ColorScheme
  language:     string
  isPublic:     boolean
  publicSlug?:  string
  atsScore?:    number
  fontPair?:    string
}

export interface ResumeData {
  id:              string
  userId:          string
  title:           string
  meta:            ResumeMeta
  personal:        PersonalInfo
  experience:      ExperienceItem[]
  education:       EducationItem[]
  skills:          SkillGroup[]
  projects:        ProjectItem[]
  certifications:  CertificationItem[]
  languages:       LanguageItem[]
  createdAt:       string
  updatedAt:       string
}

// ── AI Types ─────────────────────────────────────────────────

export interface TailorSuggestion {
  section:     string
  fieldPath:   string         // e.g. "experience.0.bullets.2"
  original:    string
  improved:    string
  reason:      string
  keyword?:    string
}

export interface TailorResult {
  atsScore:       number
  projectedScore: number
  missingKeywords: string[]
  suggestions:    TailorSuggestion[]
}

export interface ImproveResult {
  improved:     string
  alternatives: string[]
  explanation:  string
}

export interface ParsedResume {
  personal:        Partial<PersonalInfo>
  experience:      Omit<ExperienceItem, 'id'>[]
  education:       Omit<EducationItem, 'id'>[]
  skills:          Omit<SkillGroup, 'id'>[]
  projects:        Omit<ProjectItem, 'id'>[]
  certifications:  Omit<CertificationItem, 'id'>[]
  languages:       Omit<LanguageItem, 'id'>[]
  detectedLanguage: string
}
