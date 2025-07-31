import axios from "axios";
import type { CVData, PersonalizationData, GenerationSettings } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.your-domain.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

export interface GenerateCoverLetterRequest {
  cvData: CVData;
  jobDescription: string;
  personalizationData: PersonalizationData;
  generationSettings: GenerationSettings;
}

export const parseCV = async (file: File): Promise<CVData> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<CVData>("/parse-cv", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const generateCoverLetter = async (
  request: GenerateCoverLetterRequest
): Promise<string> => {
  const response = await api.post<{ coverLetter: string }>(
    "/generate-cover-letter",
    request
  );
  return response.data.coverLetter;
};
