import { useState } from "react";
import { BulkUploadPage } from "./BulkUploadPage";
import { ViewUploadedTalentPage } from "./ViewUploadedTalentPage";

export const TalentExtractPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleBackToProjects = () => {
    setSelectedProjectId(null);
  };

  return (
    <div className="space-y-6">
      {selectedProjectId ? (
        <ViewUploadedTalentPage 
          selectedProjectId={selectedProjectId}
          onBackToProjects={handleBackToProjects}
        />
      ) : (
        <BulkUploadPage onProjectSelect={handleProjectSelect} />
      )}
    </div>
  );
};