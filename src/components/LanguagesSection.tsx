import { Globe, Plus, Trash2 } from "lucide-react";
import type { CVData } from "../types";

interface LanguagesSectionProps {
  languages: CVData["languages"];
  onUpdate: (languages: CVData["languages"]) => void;
}

export const LanguagesSection = ({
  languages,
  onUpdate,
}: LanguagesSectionProps) => {
  const addNewLanguage = () => {
    const newLanguage = {
      language: "",
      proficiency: "",
    };
    onUpdate([...languages, newLanguage]);
  };

  const removeLanguage = (index: number) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    onUpdate(newLanguages);
  };

  const updateLanguage = (index: number, field: string, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    onUpdate(newLanguages);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Languages
        </h3>
        <button
          onClick={addNewLanguage}
          className="btn-secondary flex items-center space-x-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Language</span>
        </button>
      </div>
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 relative"
          >
            <button
              onClick={() => removeLanguage(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
              title="Remove this language"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
              <input
                type="text"
                value={lang.language}
                onChange={(e) =>
                  updateLanguage(index, "language", e.target.value)
                }
                className="input-field"
                placeholder="Language (e.g., English, Spanish)"
              />
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  updateLanguage(index, "proficiency", e.target.value)
                }
                className="input-field"
              >
                <option value="">Select proficiency level</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Beginner">Beginner</option>
              </select>
            </div>
          </div>
        ))}
        {languages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No languages added yet</p>
            <p className="text-sm">Click "Add Language" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
