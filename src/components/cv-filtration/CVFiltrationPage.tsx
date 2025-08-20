import { useState } from "react";
import { BulkUploadPage } from "./BulkUploadPage";
import { ViewUploadedCVsPage } from "./ViewUploadedCVsPage";

export const CVFiltrationPage = () => {
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
        <ViewUploadedCVsPage 
          selectedProjectId={selectedProjectId}
          onBackToProjects={handleBackToProjects}
        />
      ) : (
        <BulkUploadPage onProjectSelect={handleProjectSelect} />
      )}
    </div>
  );
};