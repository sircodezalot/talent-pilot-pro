import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, PlayCircle, Eye, Download, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface CVData {
  id: string;
  fileName: string;
  uploadDate: string;
  status: "pending" | "processing" | "completed";
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  matchPercentage?: number;
  projectId: string;
  projectName: string;
}

interface Project {
  id: string;
  name: string;
}

export const ViewUploadedCVsPage = () => {
  const [selectedCVs, setSelectedCVs] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("all");

  // Mock data
  const projects: Project[] = [
    { id: "1", name: "Frontend Developer Hiring" },
    { id: "2", name: "Backend Engineer Recruitment" },
    { id: "3", name: "Full Stack Developer Search" },
    { id: "4", name: "DevOps Engineer Hiring" },
  ];

  const [cvData, setCvData] = useState<CVData[]>([
    {
      id: "1",
      fileName: "john_doe_resume.pdf",
      uploadDate: "2024-01-15",
      status: "pending",
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "2",
      fileName: "jane_smith_cv.pdf",
      uploadDate: "2024-01-15",
      status: "completed",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      contactNumber: "+1-555-0123",
      matchPercentage: 87,
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "3",
      fileName: "mike_johnson_resume.pdf",
      uploadDate: "2024-01-14",
      status: "processing",
      projectId: "2",
      projectName: "Backend Engineer Recruitment"
    },
    {
      id: "4",
      fileName: "sarah_wilson_cv.pdf",
      uploadDate: "2024-01-14",
      status: "completed",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@email.com",
      contactNumber: "+1-555-0456",
      matchPercentage: 92,
      projectId: "2",
      projectName: "Backend Engineer Recruitment"
    },
    {
      id: "5",
      fileName: "david_brown_resume.pdf",
      uploadDate: "2024-01-13",
      status: "pending",
      projectId: "3",
      projectName: "Full Stack Developer Search"
    },
  ]);

  const filteredCVs = selectedProject === "all" 
    ? cvData 
    : cvData.filter(cv => cv.projectId === selectedProject);

  const handleSelectCV = (cvId: string) => {
    setSelectedCVs(prev => 
      prev.includes(cvId) 
        ? prev.filter(id => id !== cvId)
        : [...prev, cvId]
    );
  };

  const handleSelectAll = () => {
    const pendingCVs = filteredCVs.filter(cv => cv.status === "pending").map(cv => cv.id);
    if (selectedCVs.length === pendingCVs.length) {
      setSelectedCVs([]);
    } else {
      setSelectedCVs(pendingCVs);
    }
  };

  const handleProcessCV = (cvId: string) => {
    setCvData(prev => prev.map(cv => 
      cv.id === cvId ? { ...cv, status: "processing" as const } : cv
    ));
    
    toast.success("CV processing started");

    // Simulate processing completion after 3 seconds
    setTimeout(() => {
      setCvData(prev => prev.map(cv => 
        cv.id === cvId ? { 
          ...cv, 
          status: "completed" as const,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@email.com",
          contactNumber: "+1-555-0789",
          matchPercentage: Math.floor(Math.random() * 30) + 70 // Random between 70-100
        } : cv
      ));
      toast.success("CV processing completed");
    }, 3000);
  };

  const handleBulkProcess = () => {
    if (selectedCVs.length === 0) {
      toast.error("Please select CVs to process");
      return;
    }

    setCvData(prev => prev.map(cv => 
      selectedCVs.includes(cv.id) ? { ...cv, status: "processing" as const } : cv
    ));

    toast.success(`Processing ${selectedCVs.length} CV(s)`);
    setSelectedCVs([]);

    // Simulate bulk processing completion
    setTimeout(() => {
      setCvData(prev => prev.map(cv => 
        selectedCVs.includes(cv.id) ? { 
          ...cv, 
          status: "completed" as const,
          firstName: "Sample",
          lastName: "Name",
          email: "sample@email.com",
          contactNumber: "+1-555-0000",
          matchPercentage: Math.floor(Math.random() * 30) + 70
        } : cv
      ));
      toast.success("Bulk processing completed");
    }, 5000);
  };

  const getStatusBadge = (status: CVData["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-300">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="text-blue-600 border-blue-300">Processing</Badge>;
      case "completed":
        return <Badge variant="outline" className="text-green-600 border-green-300">Completed</Badge>;
    }
  };

  const getMatchPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Uploaded CVs</h1>
        <p className="text-muted-foreground mt-2">
          View and process uploaded CVs for analysis
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>CV Management</CardTitle>
              <CardDescription>
                Process uploaded CVs and view extracted information
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleBulkProcess}
                disabled={selectedCVs.length === 0}
                className="flex items-center space-x-2"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Process Selected ({selectedCVs.length})</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCVs.length === filteredCVs.filter(cv => cv.status === "pending").length && filteredCVs.filter(cv => cv.status === "pending").length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Match %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCVs.map((cv) => (
                  <TableRow key={cv.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCVs.includes(cv.id)}
                        onCheckedChange={() => handleSelectCV(cv.id)}
                        disabled={cv.status !== "pending"}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{cv.fileName}</TableCell>
                    <TableCell>{cv.projectName}</TableCell>
                    <TableCell>{cv.uploadDate}</TableCell>
                    <TableCell>{getStatusBadge(cv.status)}</TableCell>
                    <TableCell>
                      {cv.firstName && cv.lastName ? `${cv.firstName} ${cv.lastName}` : "-"}
                    </TableCell>
                    <TableCell>{cv.email || "-"}</TableCell>
                    <TableCell>{cv.contactNumber || "-"}</TableCell>
                    <TableCell>
                      {cv.matchPercentage ? (
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${getMatchPercentageColor(cv.matchPercentage)}`}>
                            {cv.matchPercentage}%
                          </span>
                          <Progress value={cv.matchPercentage} className="w-16 h-2" />
                        </div>
                      ) : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {cv.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProcessCV(cv.id)}
                            className="flex items-center space-x-1"
                          >
                            <Play className="h-3 w-3" />
                            <span>Process</span>
                          </Button>
                        )}
                        {cv.status === "processing" && (
                          <Badge variant="outline" className="text-blue-600 border-blue-300">
                            Processing...
                          </Badge>
                        )}
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCVs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No CVs found for the selected project</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};