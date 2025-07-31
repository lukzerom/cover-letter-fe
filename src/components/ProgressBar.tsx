import { CheckCircle } from "lucide-react";
import type { Step, StepConfig } from "../types";

interface ProgressBarProps {
  steps: StepConfig[];
  currentStep: Step;
  canNavigateToStep: (stepId: Step) => boolean;
  onNavigateToStep: (stepId: Step) => void;
}

export const ProgressBar = ({
  steps,
  currentStep,
  canNavigateToStep,
  onNavigateToStep,
}: ProgressBarProps) => {
  const getCurrentStepIndex = () =>
    steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = getCurrentStepIndex() > index;
          const canNavigate = canNavigateToStep(step.id as Step);

          return (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  isActive
                    ? "border-primary-600 bg-primary-600 text-white"
                    : isCompleted
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                } ${
                  canNavigate && !isActive
                    ? "cursor-pointer hover:border-primary-400 hover:bg-primary-50"
                    : !canNavigate && !isActive && !isCompleted
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                onClick={() => onNavigateToStep(step.id as Step)}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <StepIcon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary-600"
                    : isCompleted
                    ? "text-green-600"
                    : "text-gray-500"
                } ${
                  canNavigate && !isActive
                    ? "cursor-pointer hover:text-primary-500"
                    : ""
                }`}
                onClick={() => onNavigateToStep(step.id as Step)}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`mx-6 h-px w-16 transition-colors duration-200 ${
                    isCompleted ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
