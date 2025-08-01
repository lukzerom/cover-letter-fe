export interface CVData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  skills: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

export interface PersonalizationData {
  motivation: string; // Why do you want to work here?
  highlightExperience: string; // Which experience should be emphasized?
  passionValues: string; // What do you care about professionally?
}

export interface GenerationSettings {
  tone:
    | "formal"
    | "friendly"
    | "enthusiastic"
    | "straightforward"
    | "creative"
    | "assertive";
  length: "short" | "standard" | "long";
  careerChange: boolean;
  roleLevel: "entry-level" | "mid-level" | "senior" | "executive";
  language:
    | "english"
    | "polish"
    | "german"
    | "french"
    | "spanish"
    | "italian"
    | "dutch"
    | "portuguese";
  temperature: number; // 0-2, controls creativity/randomness
}

export type Step =
  | "upload"
  | "review"
  | "job-description"
  | "personalize"
  | "generate";

export interface StepConfig {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}
