// ─────────────────────────────────────────────────────────────
//  All Gemini Prompt Templates
// ─────────────────────────────────────────────────────────────

export const PARSE_RESUME_PROMPT = `
You are a precise resume data extraction engine.
Extract ALL information from the provided resume document into the JSON schema below.

STRICT RULES:
1. Never invent or hallucinate data. Missing fields → use null or empty array.
2. Normalize all dates to "YYYY-MM" format. "Present"/"Current" → null for endDate.
3. Split any combined bullet points into separate concise items.
4. Detect the document's language and return it as an ISO 639-1 code (e.g. "en", "fr").
5. Infer skill categories: "Technical", "Soft Skills", "Languages", "Tools", "Frameworks".
6. Return ONLY valid JSON — no explanation, no markdown fences.

Required JSON structure:
{
  "personal": {
    "firstName": "", "lastName": "", "title": "", "email": "",
    "phone": "", "location": "", "website": null, "linkedin": null, "github": null
  },
  "experience": [{
    "company": "", "position": "", "location": "",
    "startDate": "YYYY-MM", "endDate": "YYYY-MM or null",
    "current": false, "bullets": []
  }],
  "education": [{
    "institution": "", "degree": "", "field": "", "location": "",
    "startDate": "YYYY-MM", "endDate": "YYYY-MM or null", "gpa": null
  }],
  "skills": [{ "category": "", "items": [] }],
  "projects": [{ "name": "", "description": "", "url": null, "tech": [], "bullets": [] }],
  "certifications": [{ "name": "", "issuer": "", "date": "YYYY-MM", "url": null }],
  "languages": [{ "language": "", "proficiency": "Native|Fluent|Advanced|Intermediate|Basic" }],
  "detectedLanguage": "en"
}
`

export const TAILOR_TO_JOB_PROMPT = ({
  resumeJSON,
  jobDescription,
}: {
  resumeJSON: string
  jobDescription: string
}) => `
You are an expert ATS optimization specialist and senior career coach.

CANDIDATE RESUME (JSON):
${resumeJSON}

TARGET JOB DESCRIPTION:
${jobDescription}

TASK: Perform a comprehensive gap analysis and return optimization suggestions.

RULES:
1. Identify keywords/phrases in the JD that are missing or underrepresented in the resume.
2. For each suggestion, provide the exact fieldPath (e.g. "experience.0.bullets.2").
3. Improved text must naturally include the target keyword without sounding forced.
4. Prioritize: exact JD keyword matches > seniority alignment > quantified achievements.
5. Never suggest removing truthful information.
6. ATS scores are 0-100. Be realistic — most resumes score 40-75 before optimization.

Return ONLY this JSON structure:
{
  "atsScore": 0-100,
  "projectedScore": 0-100,
  "missingKeywords": ["keyword1", "keyword2"],
  "suggestions": [
    {
      "section": "experience",
      "fieldPath": "experience.0.bullets.1",
      "original": "original text here",
      "improved": "improved text with keyword naturally included",
      "reason": "brief explanation of why this change helps",
      "keyword": "the target keyword"
    }
  ]
}
`

export const IMPROVE_BULLET_PROMPT = (bullet: string, context: string) => `
You are an expert resume writer specializing in impactful bullet points.

BULLET TO IMPROVE: "${bullet}"
JOB CONTEXT: "${context}"

REWRITE using the XYZ achievement formula: "Accomplished [X] as measured by [Y] by doing [Z]"

RULES:
1. Start with a strong action verb (Led, Built, Reduced, Increased, Designed, etc.)
2. Add specific metrics where they can be reasonably inferred (%, $, time saved, team size)
3. Remove weak phrases: "responsible for", "worked on", "helped with", "assisted in"
4. Keep under 20 words
5. Preserve factual accuracy — don't invent specific numbers, use ranges if needed
6. Provide 2 alternative phrasings

Return ONLY this JSON:
{
  "improved": "primary improved bullet",
  "alternatives": ["alternative 1", "alternative 2"],
  "explanation": "what was improved and why"
}
`

export const GENERATE_SUMMARY_PROMPT = ({
  experience,
  targetRole,
  tone,
}: {
  experience: string
  targetRole: string
  tone: 'executive' | 'technical' | 'creative' | 'balanced'
}) => `
You are an expert resume writer. Write a compelling professional summary.

CANDIDATE EXPERIENCE: ${experience}
TARGET ROLE: ${targetRole}
TONE: ${tone}

RULES:
1. 2-3 sentences maximum (50-80 words)
2. Start with years of experience + specialization
3. Highlight top 2-3 achievements or skills
4. End with value proposition for the target role
5. Tone: ${tone} — executive=formal/authoritative, technical=precise/concrete, creative=dynamic/unique, balanced=professional/warm
6. No first-person pronouns (no "I", "my", "me")

Return ONLY this JSON:
{
  "summary": "the generated summary text",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
`
