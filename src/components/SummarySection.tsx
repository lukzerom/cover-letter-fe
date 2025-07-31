interface SummarySectionProps {
  summary: string;
  onUpdate: (summary: string) => void;
}

export const SummarySection = ({ summary, onUpdate }: SummarySectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-4">Professional Summary</h3>
      <textarea
        value={summary}
        onChange={(e) => onUpdate(e.target.value)}
        rows={3}
        className="textarea-field"
        placeholder="Brief professional summary..."
      />
    </div>
  );
};
