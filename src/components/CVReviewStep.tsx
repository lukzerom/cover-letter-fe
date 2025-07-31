import { ArrowRight } from "lucide-react";
import type { CVData } from "../types";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { SummarySection } from "./SummarySection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SkillsSection } from "./SkillsSection";
import { LanguagesSection } from "./LanguagesSection";

interface CVReviewStepProps {
  cvData: CVData;
  onUpdate: (cvData: CVData) => void;
  onContinue: () => void;
}

export const CVReviewStep = ({
  cvData,
  onUpdate,
  onContinue,
}: CVReviewStepProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Review & Edit Your Information
        </h2>
        <button
          onClick={onContinue}
          className="btn-primary flex items-center space-x-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        <PersonalInfoSection
          personalInfo={cvData.personalInfo}
          onUpdate={(personalInfo) => onUpdate({ ...cvData, personalInfo })}
        />

        <SummarySection
          summary={cvData.summary}
          onUpdate={(summary) => onUpdate({ ...cvData, summary })}
        />

        <ExperienceSection
          experience={cvData.experience}
          onUpdate={(experience) => onUpdate({ ...cvData, experience })}
        />

        <EducationSection
          education={cvData.education}
          onUpdate={(education) => onUpdate({ ...cvData, education })}
        />

        <SkillsSection
          skills={cvData.skills}
          onUpdate={(skills) => onUpdate({ ...cvData, skills })}
        />

        <LanguagesSection
          languages={cvData.languages}
          onUpdate={(languages) => onUpdate({ ...cvData, languages })}
        />
      </div>
    </div>
  );
};
