import { ArrowLeft, CheckCircle, Copy, Sparkles, Settings } from "lucide-react";
import type { GenerationSettings } from "../types";

interface GeneratedLetterStepProps {
  coverLetter: string;
  generationSettings: GenerationSettings;
  onUpdateSettings: (settings: GenerationSettings) => void;
  onGenerate: () => void;
  onClearLetter: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const GeneratedLetterStep = ({
  coverLetter,
  generationSettings,
  onUpdateSettings,
  onGenerate,
  onClearLetter,
  onBack,
  isLoading,
}: GeneratedLetterStepProps) => {
  const handleSettingChange = (
    field: keyof GenerationSettings,
    value: string | boolean
  ) => {
    onUpdateSettings({
      ...generationSettings,
      [field]: value,
    });
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      // You could add a toast notification here
      alert("Cover letter copied to clipboard!");
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = coverLetter;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Cover letter copied to clipboard!");
    }
  };

  const hasGeneratedLetter = coverLetter.trim().length > 0;

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
        {hasGeneratedLetter && (
          <div className="flex space-x-3">
            <button
              onClick={handleCopyText}
              className="btn-primary flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Text</span>
            </button>
          </div>
        )}
      </div>

      {!hasGeneratedLetter ? (
        <div>
          <div className="text-center mb-8">
            <Settings className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Customize Your Cover Letter
            </h2>
            <p className="text-gray-600">
              Fine-tune the style and approach of your cover letter to match
              your preferences.
            </p>
          </div>

          {/* Generation Settings */}
          <div className="space-y-6 mb-8">
            {/* Language */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Language</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(
                  [
                    { value: "english", label: "English", flag: "🇬🇧" },
                    { value: "polish", label: "Polish", flag: "🇵🇱" },
                    { value: "german", label: "German", flag: "🇩🇪" },
                    { value: "french", label: "French", flag: "🇫🇷" },
                    { value: "spanish", label: "Spanish", flag: "🇪🇸" },
                    { value: "italian", label: "Italian", flag: "🇮🇹" },
                    { value: "dutch", label: "Dutch", flag: "🇳🇱" },
                    { value: "portuguese", label: "Portuguese", flag: "🇵🇹" },
                  ] as const
                ).map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handleSettingChange("language", lang.value)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors flex items-center space-x-2 ${
                      generationSettings.language === lang.value
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Tone</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(
                  [
                    "formal",
                    "friendly",
                    "enthusiastic",
                    "straightforward",
                    "creative",
                    "assertive",
                  ] as const
                ).map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleSettingChange("tone", tone)}
                    className={`p-3 rounded-lg border text-sm font-medium capitalize transition-colors ${
                      generationSettings.tone === tone
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">Length</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(
                  [
                    {
                      value: "short",
                      label: "Short",
                      description: "1-2 paragraphs",
                    },
                    {
                      value: "standard",
                      label: "Standard",
                      description: "3-4 paragraphs",
                    },
                    {
                      value: "long",
                      label: "Long",
                      description: "5+ paragraphs",
                    },
                  ] as const
                ).map((length) => (
                  <button
                    key={length.value}
                    onClick={() => handleSettingChange("length", length.value)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      generationSettings.length === length.value
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div
                      className={`font-medium ${
                        generationSettings.length === length.value
                          ? "text-primary-700"
                          : "text-gray-900"
                      }`}
                    >
                      {length.label}
                    </div>
                    <div
                      className={`text-sm ${
                        generationSettings.length === length.value
                          ? "text-primary-600"
                          : "text-gray-500"
                      }`}
                    >
                      {length.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Role Level & Career Change */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Level */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Role Level</h3>
                <div className="space-y-2">
                  {(
                    [
                      { value: "entry-level", label: "Entry Level" },
                      { value: "mid-level", label: "Mid Level" },
                      { value: "senior", label: "Senior" },
                      { value: "executive", label: "Executive" },
                    ] as const
                  ).map((level) => (
                    <label
                      key={level.value}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="roleLevel"
                        value={level.value}
                        checked={generationSettings.roleLevel === level.value}
                        onChange={(e) =>
                          handleSettingChange("roleLevel", e.target.value)
                        }
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Career Change */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Career Transition
                </h3>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generationSettings.careerChange}
                    onChange={(e) =>
                      handleSettingChange("careerChange", e.target.checked)
                    }
                    className="mt-1 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <div>
                    <span className="text-gray-700 font-medium">
                      Career change application
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Check this if you're transitioning to a different field or
                      industry
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={onGenerate}
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2 mx-auto px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Generating Your Cover Letter...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Cover Letter</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Cover Letter is Ready!
            </h2>
            <p className="text-gray-600">
              Review your personalized cover letter below. You can copy the text
              or adjust settings to regenerate.
            </p>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-8 font-serif text-gray-900 leading-relaxed">
            <div className="prose max-w-none">
              {coverLetter.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className={paragraph.trim() === "" ? "mb-4" : "mb-4"}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Regenerate with different settings */}
          <div className="mt-6 text-center">
            <button
              onClick={onClearLetter}
              className="btn-secondary flex items-center space-x-2 mx-auto"
            >
              <Settings className="w-4 h-4" />
              <span>Adjust Settings & Regenerate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
