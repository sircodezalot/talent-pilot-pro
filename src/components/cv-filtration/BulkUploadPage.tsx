import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, FileText, Calendar, Users } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  totalCVs: number;
  pendingCVs: number;
  completedCVs: number;
  createdDate: string;
}

interface BulkUploadPageProps {
  onProjectSelect: (projectId: string) => void;
}

export const BulkUploadPage = ({ onProjectSelect }: BulkUploadPageProps) => {
  // Mock projects data with statistics
  const projects: Project[] = [
    {
      id: "1",
      name: "Frontend Developer Hiring",
      description: "React, TypeScript, and modern frontend technologies",
      totalCVs: 15,
      pendingCVs: 3,
      completedCVs: 12,
      createdDate: "2024-01-10"
    },
    {
      id: "2",
      name: "Backend Engineer Recruitment",
      description: "Node.js, Python, and cloud technologies",
      totalCVs: 22,
      pendingCVs: 5,
      completedCVs: 17,
      createdDate: "2024-01-08"
    },
    {
      id: "3",
      name: "Full Stack Developer Search",
      description: "End-to-end development with modern stack",
      totalCVs: 8,
      pendingCVs: 2,
      completedCVs: 6,
      createdDate: "2024-01-12"
    },
    {
      id: "4",
      name: "DevOps Engineer Hiring",
      description: "Infrastructure, CI/CD, and cloud operations",
      totalCVs: 12,
      pendingCVs: 4,
      completedCVs: 8,
      createdDate: "2024-01-05"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Select Project</h1>
        <p className="text-muted-foreground mt-2">
          Choose a project to upload and manage CVs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 hover:border-primary/30"
            onClick={() => onProjectSelect(project.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Created {new Date(project.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <CardDescription className="text-sm mt-2 line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Total CVs</span>
                  </div>
                  <span className="font-semibold text-foreground">{project.totalCVs}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-yellow-500" />
                    <span className="text-muted-foreground">Pending</span>
                  </div>
                  <span className="font-semibold text-yellow-600">{project.pendingCVs}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Completed</span>
                  </div>
                  <span className="font-semibold text-green-600">{project.completedCVs}</span>
                </div>

                {/* Progress bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Processing Progress</span>
                    <span>{Math.round((project.completedCVs / project.totalCVs) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.completedCVs / project.totalCVs) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};