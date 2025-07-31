import { ArrowLeft, ArrowRight, Heart, Target, Star } from "lucide-react";
import type { PersonalizationData } from "../types";

interface PersonalizationStepProps {
  personalizationData: PersonalizationData;
  onUpdate: (data: PersonalizationData) => void;
  onBack: () => void;
  onNext: () => void;
}

export const PersonalizationStep = ({
  personalizationData,
  onUpdate,
  onBack,
  onNext,
}: PersonalizationStepProps) => {
  const handleChange = (field: keyof PersonalizationData, value: string) => {
    onUpdate({
      ...personalizationData,
      [field]: value,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="btn-secondary flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onNext}
          className="btn-primary flex items-center space-x-2"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mb-8">
        <Heart className="w-16 h-16 text-primary-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personalize Your Letter
        </h2>
        <p className="text-gray-600">
          Help AI service create a more personalized and compelling cover letter
          by sharing some insights about your motivation and interests.
        </p>
      </div>

      <div className="space-y-8">
        {/* Motivation */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start space-x-3 mb-4">
            <Target className="w-5 h-5 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Why do you want to work here?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Share your motivation for applying to this specific company or
                role
              </p>
            </div>
          </div>
          <textarea
            value={personalizationData.motivation}
            onChange={(e) => handleChange("motivation", e.target.value)}
            rows={3}
            className="textarea-field"
            placeholder="e.g., I'm excited about your company's mission to democratize technology education, and I believe my experience in building scalable learning platforms would contribute significantly to your goals..."
          />
        </div>

        {/* Highlight Experience */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start space-x-3 mb-4">
            <Star className="w-5 h-5 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Which experience should be emphasized?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Highlight a specific role, project, or achievement that's most
                relevant to this position
              </p>
            </div>
          </div>
          <textarea
            value={personalizationData.highlightExperience}
            onChange={(e) =>
              handleChange("highlightExperience", e.target.value)
            }
            rows={3}
            className="textarea-field"
            placeholder="e.g., My role at Tech Corp where I led the microservices migration project, reducing system latency by 40% and mentoring a team of 5 developers..."
          />
        </div>

        {/* Passion & Values */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-start space-x-3 mb-4">
            <Heart className="w-5 h-5 text-primary-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-900">
                What do you care about professionally?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Share your professional values, interests, or what drives you in
                your career
              </p>
            </div>
          </div>
          <textarea
            value={personalizationData.passionValues}
            onChange={(e) => handleChange("passionValues", e.target.value)}
            rows={3}
            className="textarea-field"
            placeholder="e.g., I'm passionate about creating inclusive technology that empowers people from all backgrounds. I particularly enjoy mentoring junior developers and contributing to open-source projects..."
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">💡 Tip</h4>
            <p className="text-sm text-blue-700 mt-1">
              These fields are completely optional! You can skip this step
              entirely or fill in just the ones that resonate with you. Even a
              small personal touch will make your cover letter stand out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
