import { useState, useCallback } from "react";
import { Upload, User, Briefcase, Heart, Sparkles } from "lucide-react";
import type {
  CVData,
  Step,
  StepConfig,
  PersonalizationData,
  GenerationSettings,
} from "./types";
import {
  Header,
  ProgressBar,
  CVUpload,
  CVReviewStep,
  JobDescriptionStep,
  PersonalizationStep,
  GeneratedLetterStep,
} from "./components";
import {
  createMockCVData,
  getSampleJobDescription,
} from "./utils/dataGenerators";
import { parseCV, generateCoverLetter } from "./api";

function App() {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [personalizationData, setPersonalizationData] =
    useState<PersonalizationData>({
      motivation: "",
      highlightExperience: "",
      passionValues: "",
    });
  const [generationSettings, setGenerationSettings] =
    useState<GenerationSettings>({
      tone: "friendly",
      length: "standard",
      careerChange: false,
      roleLevel: "mid-level",
      language: "english",
      temperature: 0.7,
    });
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showSlowMessage, setShowSlowMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (
        file &&
        (file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      ) {
        setCvFile(file);
        setIsUploading(true);
        setShowSlowMessage(false);
        setError(null);

        // Show "may take up to 15 seconds" message after 3 seconds
        const slowMessageTimer = setTimeout(() => {
          setShowSlowMessage(true);
        }, 3000);

        try {
          const parsedCvData = await parseCV(file);
          setCvData(parsedCvData);
          setCurrentStep("review");
        } catch (err) {
          console.error("CV parsing error:", err);
          setError(
            `Failed to parse CV: ${
              err instanceof Error ? err.message : "Unknown error"
            }`
          );
        } finally {
          clearTimeout(slowMessageTimer);
          setIsUploading(false);
          setShowSlowMessage(false);
        }
      }
    },
    []
  );

  const handleUseFakeData = useCallback(() => {
    setCvData(createMockCVData());
    setCurrentStep("review");
  }, []);

  const handleUseSampleJobDescription = useCallback(() => {
    setJobDescription(getSampleJobDescription());
  }, []);

  const handleGenerateCoverLetter = async () => {
    if (!cvData || !jobDescription) return;

    setIsLoading(true);
    setError(null);

    try {
      const generatedLetter = await generateCoverLetter({
        cvData,
        jobDescription,
        personalizationData,
        generationSettings,
      });

      setCoverLetter(generatedLetter);
    } catch (err) {
      console.error("Cover letter generation error:", err);
      setError(
        `Failed to generate cover letter: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLetter = useCallback(() => {
    setCoverLetter("");
    setError(null);
  }, []);

  const steps: StepConfig[] = [
    { id: "upload", title: "Upload CV", icon: Upload },
    { id: "review", title: "Review Data", icon: User },
    { id: "job-description", title: "Job Details", icon: Briefcase },
    { id: "personalize", title: "Personalize", icon: Heart },
    { id: "generate", title: "Generate Letter", icon: Sparkles },
  ];

  const canNavigateToStep = (stepId: Step) => {
    if (stepId === "upload") return true;
    if (stepId === "review") return cvData !== null;
    if (stepId === "job-description") return cvData !== null;
    if (stepId === "personalize")
      return cvData !== null && jobDescription.trim() !== "";
    if (stepId === "generate")
      return cvData !== null && jobDescription.trim() !== "";
    return false;
  };

  const navigateToStep = (stepId: Step) => {
    if (canNavigateToStep(stepId)) {
      setCurrentStep(stepId);
      setError(null); // Clear errors when navigating
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "upload":
        return (
          <div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <CVUpload
              cvFile={cvFile}
              onFileUpload={handleFileUpload}
              onUseFakeData={handleUseFakeData}
              isUploading={isUploading}
              showSlowMessage={showSlowMessage}
            />
          </div>
        );

      case "review":
        return cvData ? (
          <CVReviewStep
            cvData={cvData}
            onUpdate={setCvData}
            onContinue={() => setCurrentStep("job-description")}
          />
        ) : null;

      case "job-description":
        return (
          <JobDescriptionStep
            jobDescription={jobDescription}
            onUpdate={setJobDescription}
            onBack={() => setCurrentStep("review")}
            onNext={() => setCurrentStep("personalize")}
            onUseSampleData={handleUseSampleJobDescription}
          />
        );

      case "personalize":
        return (
          <PersonalizationStep
            personalizationData={personalizationData}
            onUpdate={setPersonalizationData}
            onBack={() => setCurrentStep("job-description")}
            onNext={() => setCurrentStep("generate")}
          />
        );

      case "generate":
        return (
          <div>
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            <GeneratedLetterStep
              coverLetter={coverLetter}
              generationSettings={generationSettings}
              onUpdateSettings={setGenerationSettings}
              onGenerate={handleGenerateCoverLetter}
              onClearLetter={handleClearLetter}
              onBack={() => setCurrentStep("personalize")}
              isLoading={isLoading}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBar
          steps={steps}
          currentStep={currentStep}
          canNavigateToStep={canNavigateToStep}
          onNavigateToStep={navigateToStep}
        />

        <div className="card max-w-4xl mx-auto">{renderStepContent()}</div>
      </div>
    </div>
  );
}

export default App;
