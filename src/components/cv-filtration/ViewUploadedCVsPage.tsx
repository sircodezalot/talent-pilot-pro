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
      file => file.type === "application/pdf" || file.name.endsWith('.pdf')
    );

    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} CV(s) added for upload`);
    } else {
      toast.error("Please upload only PDF files");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === "application/pdf" || file.name.endsWith('.pdf')
    );

    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
      toast.success(`${files.length} CV(s) added for upload`);
    } else {
      toast.error("Please upload only PDF files");
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

    // Mock upload process
    toast.success(`${uploadedFiles.length} CV(s) uploaded successfully for processing`);
    setUploadedFiles([]);
  };

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="space-y-6">
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
      
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {selectedProject ? selectedProject.name : "Project CVs"}
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload and process CVs for this project
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload CVs</CardTitle>
          <CardDescription>
            Drag and drop PDF files or click to browse. Only PDF files are supported.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
              ${uploadedFiles.length > 0 ? "mb-6" : ""}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drop your CV files here</p>
              <p className="text-sm text-muted-foreground">or</p>
              <div>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">PDF files only, up to 10MB each</p>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">
                Selected Files ({uploadedFiles.length})
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button
              onClick={handleUpload}
              disabled={!selectedProjectId || uploadedFiles.length === 0}
              className="min-w-32"
            >
              Upload CVs
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/10">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Important Notes
              </p>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                <li>Only PDF files are supported for CV uploads</li>
                <li>Maximum file size is 10MB per CV</li>
                <li>Processing will extract name, email, contact number, and calculate JD match percentage</li>
                <li>Click "Process" on individual CVs or select multiple for bulk processing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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
              <p className="text-muted-foreground">No CVs found for this project</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};