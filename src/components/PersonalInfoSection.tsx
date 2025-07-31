import { User } from "lucide-react";
import type { CVData } from "../types";

interface PersonalInfoSectionProps {
  personalInfo: CVData["personalInfo"];
  onUpdate: (personalInfo: CVData["personalInfo"]) => void;
}

export const PersonalInfoSection = ({
  personalInfo,
  onUpdate,
}: PersonalInfoSectionProps) => {
  const handleChange = (field: keyof CVData["personalInfo"], value: string) => {
    onUpdate({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={personalInfo.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};
