import { GraduationCap, Plus, Trash2 } from "lucide-react";
import type { CVData } from "../types";

interface EducationSectionProps {
  education: CVData["education"];
  onUpdate: (education: CVData["education"]) => void;
}

export const EducationSection = ({
  education,
  onUpdate,
}: EducationSectionProps) => {
  const addNewEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      year: "",
      description: "",
    };
    onUpdate([...education, newEducation]);
  };

  const removeEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    onUpdate(newEducation);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onUpdate(newEducation);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Education
        </h3>
        <button
          onClick={addNewEducation}
          className="btn-secondary flex items-center space-x-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg border border-gray-200 relative"
          >
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
              title="Remove this education"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-8">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="input-field"
                  placeholder="Degree (e.g., Bachelor of Science in Computer Science)"
                />
              </div>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                className="input-field"
                placeholder="Institution"
              />
              <input
                type="text"
                value={edu.year}
                onChange={(e) => updateEducation(index, "year", e.target.value)}
                className="input-field"
                placeholder="Year (e.g., 2019)"
              />
            </div>
            <textarea
              value={edu.description}
              onChange={(e) =>
                updateEducation(index, "description", e.target.value)
              }
              rows={2}
              className="textarea-field"
              placeholder="Education details, relevant coursework, achievements..."
            />
          </div>
        ))}
        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No education added yet</p>
            <p className="text-sm">Click "Add Education" to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
