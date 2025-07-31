import { Briefcase, Plus, Trash2 } from "lucide-react";
import type { CVData } from "../types";

interface ExperienceSectionProps {
  experience: CVData["experience"];
  onUpdate: (experience: CVData["experience"]) => void;
}

export const ExperienceSection = ({
  experience,
  onUpdate,
}: ExperienceSectionProps) => {
  const addNewExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      duration: "",
      description: "",
    };
    onUpdate([...experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const newExperience = experience.filter((_, i) => i !== index);
    onUpdate(newExperience);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onUpdate(newExperience);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Work Experience
        </h3>
        <button
          onClick={addNewExperience}
          className="btn-secondary flex items-center space-x-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 relative"
          >
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
              title="Remove this experience"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
              <input
                type="text"
                value={exp.title}
                onChange={(e) =>
                  updateExperience(index, "title", e.target.value)
                }
                className="input-field"
                placeholder="Job Title"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="input-field"
                placeholder="Company"
              />
            </div>
            <input
              type="text"
              value={exp.duration}
              onChange={(e) =>
                updateExperience(index, "duration", e.target.value)
              }
              className="input-field mb-4"
              placeholder="Duration (e.g., 2021 - Present)"
            />
            <textarea
              value={exp.description}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              rows={2}
              className="textarea-field"
              placeholder="Job description and achievements..."
            />
          </div>
        ))}
        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No work experience added yet</p>
            <p className="text-sm">Click "Add Experience" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
