import { Upload, FileText, Sparkles } from "lucide-react";

interface CVUploadProps {
  cvFile: File | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUseFakeData: () => void;
  isUploading: boolean;
  showSlowMessage: boolean;
}

export const CVUpload = ({
  cvFile,
  onFileUpload,
  onUseFakeData,
  isUploading,
  showSlowMessage,
}: CVUploadProps) => {
  return (
    <div className="text-center py-12">
      <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your CV</h2>
      <p className="text-gray-600 mb-8">
        Upload your resume in PDF or Word format. AI will extract and structure
        your information.
      </p>

      <div className="max-w-md mx-auto">
        <label className="block">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onFileUpload}
            className="sr-only"
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-primary-500 transition-colors cursor-pointer">
            {cvFile ? (
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">
                  {cvFile.name}
                </span>
              </div>
            ) : (
              <div>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </span>
              </div>
            )}
          </div>
        </label>
      </div>

      {isUploading && (
        <div className="mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              <span className="text-sm text-primary-600">
                Processing your CV...
              </span>
            </div>
            {showSlowMessage && (
              <div className="text-center mt-2">
                <span className="text-xs text-primary-500">
                  This may take up to 15 seconds
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fake Data Option */}
      <div className="mt-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="mt-6">
          <button
            onClick={onUseFakeData}
            className="btn-secondary flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Use Sample Data</span>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Perfect for testing and demo purposes
          </p>
        </div>
      </div>
    </div>
  );
};
