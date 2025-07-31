import { ArrowLeft, Briefcase, ArrowRight, FileText } from "lucide-react";

interface JobDescriptionStepProps {
  jobDescription: string;
  onUpdate: (jobDescription: string) => void;
  onBack: () => void;
  onNext: () => void;
  onUseSampleData: () => void;
}

export const JobDescriptionStep = ({
  jobDescription,
  onUpdate,
  onBack,
  onNext,
  onUseSampleData,
}: JobDescriptionStepProps) => {
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
          disabled={!jobDescription.trim()}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center mb-8">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Job Description
        </h2>
        <p className="text-gray-600">
          Paste the job description or requirements. AI will create a tailored
          cover letter.
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Job Description / Requirements
          </label>
          <button
            onClick={onUseSampleData}
            className="text-sm text-primary-600 hover:text-primary-800 flex items-center space-x-1"
          >
            <FileText className="w-3 h-3" />
            <span>Use Sample Job Description</span>
          </button>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => onUpdate(e.target.value)}
          rows={12}
          className="textarea-field"
          placeholder="Paste the job description here..."
        />
      </div>

      {!jobDescription.trim() && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">
                Quick Start Tip
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Click "Use Sample Job Description" above to get started with a
                realistic job posting example.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
