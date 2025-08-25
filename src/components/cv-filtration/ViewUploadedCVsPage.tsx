import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, PlayCircle, Eye, Download, Filter, Upload, FileText, AlertCircle, ArrowLeft } from "lucide-react";
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

interface ViewUploadedCVsPageProps {
  selectedProjectId?: string;
  onBackToProjects: () => void;
}

export const ViewUploadedCVsPage = ({ selectedProjectId, onBackToProjects }: ViewUploadedCVsPageProps) => {
  const [selectedCVs, setSelectedCVs] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

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

  const filteredCVs = selectedProjectId 
    ? cvData.filter(cv => cv.projectId === selectedProjectId)
    : cvData;

  const handleSelectCV = (cvId: string) => {
    setSelectedCVs(prev => 
      prev.includes(cvId) 
        ? prev.filter(id => id !== cvId)
        : [...prev, cvId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCVs.length === filteredCVs.length) {
      setSelectedCVs([]);
    } else {
      setSelectedCVs(filteredCVs.map(cv => cv.id));
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf" || 
              file.type === "application/msword" || 
              file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx')
    );

    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} CV(s) added for upload`);
    } else {
      toast.error("Please upload only PDF, DOC, or DOCX files");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === "application/pdf" || 
              file.type === "application/msword" || 
              file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx')
    );

    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} CV(s) added for upload`);
    } else {
      toast.error("Please upload only PDF, DOC, or DOCX files");
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  const handleUpload = () => {
    if (!selectedProjectId) {
      toast.error("No project selected");
      return;
    }

    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one CV");
      return;
    }

    // Mock upload process - automatically process CVs
    const newCVs = uploadedFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      fileName: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      status: "processing" as const,
      projectId: selectedProjectId!,
      projectName: selectedProject?.name || "Unknown Project"
    }));

    setCvData(prev => [...prev, ...newCVs]);
    toast.success(`${uploadedFiles.length} CV(s) uploaded and processing started`);
    setUploadedFiles([]);

    // Simulate processing completion
    setTimeout(() => {
      setCvData(prev => prev.map(cv => 
        newCVs.find(newCv => newCv.id === cv.id) ? { 
          ...cv, 
          status: "completed" as const,
          firstName: "Sample",
          lastName: "Candidate",
          email: "candidate@email.com",
          contactNumber: "+1-555-0000",
          matchPercentage: Math.floor(Math.random() * 30) + 70
        } : cv
      ));
      toast.success("CV processing completed");
    }, 3000);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onBackToProjects}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Button>
        </div>
        
        {/* Upload Section - Moved to top right */}
        <Card className="w-80">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Upload CVs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`
                border-2 border-dashed rounded-lg p-4 text-center transition-colors
                ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Drop files or browse</p>
                <div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Files ({uploadedFiles.length})
                </p>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs"
                    >
                      <div className="flex items-center space-x-2 min-w-0">
                        <FileText className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{file.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-3 space-y-2">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• PDF, DOC, DOCX files supported</p>
                  <p>• Max 10MB per file</p>
                  <p>• Files processed automatically on upload</p>
                </div>
              </div>
              <Button
                onClick={handleUpload}
                disabled={!selectedProjectId || uploadedFiles.length === 0}
                className="w-full"
                size="sm"
              >
                Upload & Process CVs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {selectedProject ? selectedProject.name : "Project CVs"}
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage and review uploaded CVs for this project
        </p>
      </div>

      {/* CV Management Table - Now the main focus */}
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>CV Management</CardTitle>
              <CardDescription>
                Review and manage uploaded candidate CVs
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => toast.info("Schedule interviews functionality coming soon")}
                disabled={selectedCVs.length === 0}
                className="flex items-center space-x-2"
              >
                <PlayCircle className="h-4 w-4" />
                <span>Schedule Interviews ({selectedCVs.length})</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-12 pl-6">
                    <Checkbox
                      checked={selectedCVs.length === filteredCVs.length && filteredCVs.length > 0}
                      onCheckedChange={handleSelectAll}
                      className="rounded-sm"
                    />
                  </TableHead>
                  <TableHead className="font-semibold">File Name</TableHead>
                  <TableHead className="font-semibold">Upload Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Candidate Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">JD Match</TableHead>
                  <TableHead className="font-semibold w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCVs.map((cv) => (
                  <TableRow key={cv.id} className="hover:bg-muted/50">
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={selectedCVs.includes(cv.id)}
                        onCheckedChange={() => handleSelectCV(cv.id)}
                        className="rounded-sm"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>{cv.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cv.uploadDate}</TableCell>
                    <TableCell>{getStatusBadge(cv.status)}</TableCell>
                    <TableCell className="font-medium">
                      {cv.firstName && cv.lastName ? `${cv.firstName} ${cv.lastName}` : (
                        <span className="text-muted-foreground">Processing...</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cv.email || "Processing..."}</TableCell>
                    <TableCell className="text-muted-foreground">{cv.contactNumber || "Processing..."}</TableCell>
                    <TableCell>
                      {cv.matchPercentage ? (
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${getMatchPercentageColor(cv.matchPercentage)}`}>
                            {cv.matchPercentage}%
                          </span>
                          <Progress value={cv.matchPercentage} className="w-20 h-2" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Processing...</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredCVs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No CVs uploaded yet</p>
              <p className="text-sm text-muted-foreground">Upload CVs using the box above to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};