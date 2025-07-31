import { FileText } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Cover Letter Generator
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            Created with 🤖 by{" "}
            <a
              href="http://zeromski.dev"
              className="text-primary-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Łukasz Żeromski
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
