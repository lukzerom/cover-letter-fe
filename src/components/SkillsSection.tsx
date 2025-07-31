import { Trash2 } from "lucide-react";

interface SkillsSectionProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
}

export const SkillsSection = ({ skills, onUpdate }: SkillsSectionProps) => {
  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onUpdate(newSkills);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(index)}
              className="text-primary-600 hover:text-primary-800"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
