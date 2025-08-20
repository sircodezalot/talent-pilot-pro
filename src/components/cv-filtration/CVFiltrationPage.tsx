import { useState } from "react";
import { BulkUploadPage } from "./BulkUploadPage";
import { ViewUploadedCVsPage } from "./ViewUploadedCVsPage";
import { Button } from "@/components/ui/button";
import { Upload, FileSearch } from "lucide-react";

export const CVFiltrationPage = () => {
  const [activeSubTab, setActiveSubTab] = useState("upload");

  const subNavigation = [
    { id: "upload", name: "Bulk Upload", icon: Upload },
    { id: "view", name: "View Uploaded CVs", icon: FileSearch },
  ];

  return (
    <div className="space-y-6">
      {/* Sub Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {subNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSubTab === item.id ? "default" : "ghost"}
                className={`
                  flex items-center space-x-2 px-4 py-2 border-b-2 rounded-none
                  ${activeSubTab === item.id 
                    ? "border-primary bg-primary/5" 
                    : "border-transparent hover:border-muted-foreground/25"
                  }
                `}
                onClick={() => setActiveSubTab(item.id)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div>
        {activeSubTab === "upload" && <BulkUploadPage />}
        {activeSubTab === "view" && <ViewUploadedCVsPage />}
      </div>
    </div>
  );
};