import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Play, PlayCircle, Eye, Download, Filter, Upload, FileText, AlertCircle, ArrowLeft, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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

interface ViewUploadedTalentPageProps {
  selectedProjectId?: string;
  onBackToProjects: () => void;
}

export const ViewUploadedTalentPage = ({ selectedProjectId, onBackToProjects }: ViewUploadedTalentPageProps) => {
  const [selectedCVs, setSelectedCVs] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      fileName: "jane_smith_cv.pdf",
      uploadDate: "2024-01-15",
      status: "completed",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      contactNumber: "+1-555-0123",
      matchPercentage: 95,
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "2",
      fileName: "sarah_wilson_cv.pdf",
      uploadDate: "2024-01-14",
      status: "completed",
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@email.com",
      contactNumber: "+1-555-0456",
      matchPercentage: 92,
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "3",
      fileName: "michael_johnson_resume.pdf",
      uploadDate: "2024-01-13",
      status: "completed",
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.johnson@email.com",
      contactNumber: "+1-555-0789",
      matchPercentage: 88,
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "4",
      fileName: "emily_davis_cv.pdf",
      uploadDate: "2024-01-12",
      status: "completed",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@email.com",
      contactNumber: "+1-555-0321",
      matchPercentage: 91,
      projectId: "2",
      projectName: "Backend Engineer Recruitment"
    },
    {
      id: "5",
      fileName: "alex_martinez_resume.pdf",
      uploadDate: "2024-01-11",
      status: "completed",
      firstName: "Alex",
      lastName: "Martinez",
      email: "alex.martinez@email.com",
      contactNumber: "+1-555-0654",
      matchPercentage: 85,
      projectId: "2",
      projectName: "Backend Engineer Recruitment"
    },
    {
      id: "6",
      fileName: "lisa_chen_cv.pdf",
      uploadDate: "2024-01-10",
      status: "completed",
      firstName: "Lisa",
      lastName: "Chen",
      email: "lisa.chen@email.com",
      contactNumber: "+1-555-0987",
      matchPercentage: 93,
      projectId: "3",
      projectName: "Full Stack Developer Search"
    },
    {
      id: "7",
      fileName: "james_taylor_resume.pdf",
      uploadDate: "2024-01-09",
      status: "completed",
      firstName: "James",
      lastName: "Taylor",
      email: "james.taylor@email.com",
      contactNumber: "+1-555-0147",
      matchPercentage: 89,
      projectId: "3",
      projectName: "Full Stack Developer Search"
    },
    {
      id: "8",
      fileName: "amanda_white_cv.pdf",
      uploadDate: "2024-01-08",
      status: "completed",
      firstName: "Amanda",
      lastName: "White",
      email: "amanda.white@email.com",
      contactNumber: "+1-555-0258",
      matchPercentage: 87,
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "9",
      fileName: "kevin_brown_resume.pdf",
      uploadDate: "2024-01-07",
      status: "completed",
      firstName: "Kevin",
      lastName: "Brown",
      email: "kevin.brown@email.com",
      contactNumber: "+1-555-0369",
      matchPercentage: 84,
      projectId: "2",
      projectName: "Backend Engineer Recruitment"
    },
    {
      id: "10",
      fileName: "rachel_green_cv.pdf",
      uploadDate: "2024-01-06",
      status: "completed",
      firstName: "Rachel",
      lastName: "Green",
      email: "rachel.green@email.com",
      contactNumber: "+1-555-0471",
      matchPercentage: 90,
      projectId: "4",
      projectName: "DevOps Engineer Hiring"
    },
    {
      id: "11",
      fileName: "daniel_garcia_resume.pdf",
      uploadDate: "2024-01-05",
      status: "completed",
      firstName: "Daniel",
      lastName: "Garcia",
      email: "daniel.garcia@email.com",
      contactNumber: "+1-555-0582",
      matchPercentage: 86,
      projectId: "4",
      projectName: "DevOps Engineer Hiring"
    },
    {
      id: "12",
      fileName: "sophia_lee_cv.pdf",
      uploadDate: "2024-01-04",
      status: "completed",
      firstName: "Sophia",
      lastName: "Lee",
      email: "sophia.lee@email.com",
      contactNumber: "+1-555-0693",
      matchPercentage: 94,
      projectId: "1",
      projectName: "Frontend Developer Hiring"
    },
    {
      id: "13",
      fileName: "robert_clark_resume.pdf",
      uploadDate: "2024-01-03",
      status: "completed",
      firstName: "Robert",
      lastName: "Clark",
      email: "robert.clark@email.com",
      contactNumber: "+1-555-0704",
      matchPercentage: 82,
      projectId: "3",
      projectName: "Full Stack Developer Search"
    },
    {
      id: "14",
      fileName: "maria_rodriguez_cv.pdf",
      uploadDate: "2024-01-02",
      status: "completed",
      firstName: "Maria",
      lastName: "Rodriguez",
      email: "maria.rodriguez@email.com",
      contactNumber: "+1-555-0815",
      matchPercentage: 91,
      projectId: "2",
      projectName: "Backend Engineer Recruitment"
    },
    {
      id: "15",
      fileName: "thomas_anderson_resume.pdf",
      uploadDate: "2024-01-01",
      status: "completed",
      firstName: "Thomas",
      lastName: "Anderson",
      email: "thomas.anderson@email.com",
      contactNumber: "+1-555-0926",
      matchPercentage: 88,
      projectId: "4",
      projectName: "DevOps Engineer Hiring"
    }
  ]);

  // Only show completed CVs and apply filtering
  const getFilteredCVs = () => {
    let filtered = selectedProjectId 
      ? cvData.filter(cv => cv.projectId === selectedProjectId && cv.status === "completed")
      : cvData.filter(cv => cv.status === "completed");

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cv => 
        cv.fileName.toLowerCase().includes(query) ||
        cv.email?.toLowerCase().includes(query) ||
        `${cv.firstName} ${cv.lastName}`.toLowerCase().includes(query)
      );
    }

    // Apply tag filter
    switch (filterTag) {
      case "top10":
        return filtered.filter(cv => cv.matchPercentage && cv.matchPercentage >= 90);
      case "top20":
        return filtered.filter(cv => cv.matchPercentage && cv.matchPercentage >= 80);
      case "scheduled":
        return filtered.filter(cv => cv.firstName?.includes("Scheduled")); // Mock condition
      default:
        return filtered;
    }
  };

  const filteredCVs = getFilteredCVs();
  const totalPages = Math.ceil(filteredCVs.length / itemsPerPage);
  const paginatedCVs = filteredCVs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSelectCV = (cvId: string) => {
    setSelectedCVs(prev => 
      prev.includes(cvId) 
        ? prev.filter(id => id !== cvId)
        : [...prev, cvId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCVs.length === paginatedCVs.length) {
      setSelectedCVs([]);
    } else {
      setSelectedCVs(paginatedCVs.map(cv => cv.id));
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
    <div className="h-screen flex flex-col p-6 space-y-4 overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-shrink-0">
        <Button
          variant="ghost"
          onClick={onBackToProjects}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Projects</span>
        </Button>
        
        <div className="text-right">
          <h1 className="text-2xl font-bold text-foreground">
            {selectedProject ? selectedProject.name : "Project Talent"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and review uploaded candidate profiles
          </p>
        </div>
      </div>

      {/* Upload Section - Full width but compact */}
      <Card className="w-full flex-shrink-0">
          <CardContent className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Upload CVs:</span>
              </div>
              
              <div
                className={`
                  flex-1 border-2 border-dashed rounded-lg p-3 text-center transition-colors cursor-pointer
                  ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex items-center justify-center space-x-3">
                  <p className="text-sm text-muted-foreground">Drop files here or</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer h-7" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>PDF, DOC, DOCX supported</span>
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedProjectId || uploadedFiles.length === 0}
                size="sm"
              >
                Extract ({uploadedFiles.length})
              </Button>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded text-xs"
                    >
                      <FileText className="h-3 w-3 text-blue-500" />
                      <span className="truncate max-w-32">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive h-4 w-4 p-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CV Management Table - Main focus with full height */}
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="pb-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Talent Database</CardTitle>
                <CardDescription>
                  {filteredCVs.length} candidates available
                </CardDescription>
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                
                {/* Filter Tags */}
                <Select value={filterTag} onValueChange={setFilterTag}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Candidates</SelectItem>
                    <SelectItem value="top10">Top 10% (90%+)</SelectItem>
                    <SelectItem value="top20">Top 20% (80%+)</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                
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

          <CardContent className="p-0 flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-auto border-b">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow className="border-b">
                    <TableHead className="w-12 pl-6">
                      <Checkbox
                        checked={selectedCVs.length === paginatedCVs.length && paginatedCVs.length > 0}
                        onCheckedChange={handleSelectAll}
                        className="rounded-sm"
                      />
                    </TableHead>
                    <TableHead className="font-semibold min-w-48">Candidate</TableHead>
                    <TableHead className="font-semibold min-w-40">Email</TableHead>
                    <TableHead className="font-semibold min-w-32">Contact</TableHead>
                    <TableHead className="font-semibold min-w-24">Match</TableHead>
                    <TableHead className="font-semibold min-w-28">Upload Date</TableHead>
                    <TableHead className="font-semibold w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {paginatedCVs.map((cv) => (
                  <TableRow key={cv.id} className="hover:bg-muted/50">
                    <TableCell className="pl-6">
                      <Checkbox
                        checked={selectedCVs.includes(cv.id)}
                        onCheckedChange={() => handleSelectCV(cv.id)}
                        className="rounded-sm"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-500 flex-shrink-0" />
                          <span>{cv.firstName && cv.lastName ? `${cv.firstName} ${cv.lastName}` : "Processing..."}</span>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {cv.fileName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cv.email || "Processing..."}</TableCell>
                    <TableCell className="text-muted-foreground">{cv.contactNumber || "Processing..."}</TableCell>
                    <TableCell>
                      {cv.matchPercentage ? (
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-sm ${getMatchPercentageColor(cv.matchPercentage)}`}>
                            {cv.matchPercentage}%
                          </span>
                          <Progress value={cv.matchPercentage} className="w-16 h-2" />
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">Processing...</span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{cv.uploadDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toast.info("Download functionality coming soon")}
                        className="h-8 w-8 p-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Footer */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/5">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCVs.length)} of {filteredCVs.length} candidates
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) setCurrentPage(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Empty State */}
            {filteredCVs.length === 0 && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">No candidates found</p>
                  <p className="text-sm text-muted-foreground">
                    {filterTag !== "all" ? "Try adjusting your filter settings" : "Upload CVs using the box above to get started"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
    </div>
  );
};