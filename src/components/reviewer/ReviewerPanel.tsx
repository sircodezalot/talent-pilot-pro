import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Video,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  User,
  Search
} from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  project: string;
  interviewStartTime: string;
  interviewEndTime: string;
  attemptedAt?: string;
  status: "completed" | "in-progress" | "terminated" | "forfeited";
  hasVideo: boolean;
  hasResultSheet: boolean;
  score?: number;
}

const mockInterviews: Interview[] = [
  {
    id: "INT-001",
    candidateName: "Sarah Johnson",
    candidateEmail: "sarah.johnson@email.com",
    project: "Frontend Developer - E-commerce Platform",
    interviewStartTime: "2024-01-15 14:00",
    interviewEndTime: "2024-01-15 15:00",
    attemptedAt: "2024-01-15 14:05",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 85
  },
  {
    id: "INT-002",
    candidateName: "Mike Chen",
    candidateEmail: "mike.chen@email.com",
    project: "Backend Developer - Banking System",
    interviewStartTime: "2024-01-14 10:30",
    interviewEndTime: "2024-01-14 11:30",
    attemptedAt: "2024-01-14 10:32",
    status: "completed",
    hasVideo: false,
    hasResultSheet: true,
    score: 92
  },
  {
    id: "INT-003",
    candidateName: "Emma Wilson",
    candidateEmail: "emma.wilson@email.com",
    project: "Full Stack Developer - Healthcare App",
    interviewStartTime: "2024-01-13 16:00",
    interviewEndTime: "2024-01-13 17:00",
    attemptedAt: "2024-01-13 16:15",
    status: "terminated",
    hasVideo: true,
    hasResultSheet: false
  },
  {
    id: "INT-004",
    candidateName: "John Davis",
    candidateEmail: "john.davis@email.com",
    project: "UI/UX Designer - Mobile App Redesign",
    interviewStartTime: "2024-01-12 11:00",
    interviewEndTime: "2024-01-12 12:00",
    attemptedAt: "2024-01-12 11:20",
    status: "forfeited",
    hasVideo: false,
    hasResultSheet: false
  },
  {
    id: "INT-005",
    candidateName: "Lisa Rodriguez",
    candidateEmail: "lisa.rodriguez@email.com",
    project: "DevOps Engineer - Cloud Migration",
    interviewStartTime: "2024-01-11 09:15",
    interviewEndTime: "2024-01-11 10:15",
    status: "in-progress",
    hasVideo: true,
    hasResultSheet: false
  },
  {
    id: "INT-006",
    candidateName: "Alex Thompson",
    candidateEmail: "alex.thompson@email.com",
    project: "Frontend Developer - E-commerce Platform",
    interviewStartTime: "2024-01-10 15:00",
    interviewEndTime: "2024-01-10 16:00",
    attemptedAt: "2024-01-10 15:03",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 78
  },
  {
    id: "INT-007",
    candidateName: "Maria Garcia",
    candidateEmail: "maria.garcia@email.com",
    project: "Data Scientist - Analytics Platform",
    interviewStartTime: "2024-01-09 13:30",
    interviewEndTime: "2024-01-09 14:30",
    attemptedAt: "2024-01-09 13:35",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 95
  },
  {
    id: "INT-008",
    candidateName: "David Kim",
    candidateEmail: "david.kim@email.com",
    project: "Backend Developer - Banking System",
    interviewStartTime: "2024-01-08 10:00",
    interviewEndTime: "2024-01-08 11:00",
    attemptedAt: "2024-01-08 10:45",
    status: "terminated",
    hasVideo: false,
    hasResultSheet: false
  },
  {
    id: "INT-009",
    candidateName: "Sophie Lee",
    candidateEmail: "sophie.lee@email.com",
    project: "Mobile Developer - Social Media App",
    interviewStartTime: "2024-01-07 14:00",
    interviewEndTime: "2024-01-07 15:00",
    attemptedAt: "2024-01-07 14:10",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 87
  },
  {
    id: "INT-010",
    candidateName: "Ryan Wilson",
    candidateEmail: "ryan.wilson@email.com",
    project: "Full Stack Developer - Healthcare App",
    interviewStartTime: "2024-01-06 11:30",
    interviewEndTime: "2024-01-06 12:30",
    status: "forfeited",
    hasVideo: true,
    hasResultSheet: false
  },
  {
    id: "INT-011",
    candidateName: "Jennifer Brown",
    candidateEmail: "jennifer.brown@email.com",
    project: "QA Engineer - Testing Framework",
    interviewStartTime: "2024-01-05 16:00",
    interviewEndTime: "2024-01-05 17:00",
    attemptedAt: "2024-01-05 16:05",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 82
  },
  {
    id: "INT-012",
    candidateName: "Carlos Martinez",
    candidateEmail: "carlos.martinez@email.com",
    project: "DevOps Engineer - Cloud Migration",
    interviewStartTime: "2024-01-04 09:00",
    interviewEndTime: "2024-01-04 10:00",
    attemptedAt: "2024-01-04 09:12",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 91
  },
  {
    id: "INT-013",
    candidateName: "Anna Taylor",
    candidateEmail: "anna.taylor@email.com",
    project: "UI/UX Designer - Mobile App Redesign",
    interviewStartTime: "2024-01-03 14:30",
    interviewEndTime: "2024-01-03 15:30",
    attemptedAt: "2024-01-03 14:40",
    status: "terminated",
    hasVideo: false,
    hasResultSheet: false
  },
  {
    id: "INT-014",
    candidateName: "Michael Johnson",
    candidateEmail: "michael.johnson@email.com",
    project: "Data Scientist - Analytics Platform",
    interviewStartTime: "2024-01-02 10:15",
    interviewEndTime: "2024-01-02 11:15",
    attemptedAt: "2024-01-02 10:20",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 88
  },
  {
    id: "INT-015",
    candidateName: "Rachel Green",
    candidateEmail: "rachel.green@email.com",
    project: "Frontend Developer - E-commerce Platform",
    interviewStartTime: "2024-01-01 13:00",
    interviewEndTime: "2024-01-01 14:00",
    attemptedAt: "2024-01-01 13:08",
    status: "completed",
    hasVideo: true,
    hasResultSheet: true,
    score: 79
  },
  {
    id: "INT-016",
    candidateName: "Thomas Anderson",
    candidateEmail: "thomas.anderson@email.com",
    project: "Mobile Developer - Social Media App",
    interviewStartTime: "2023-12-30 15:30",
    interviewEndTime: "2023-12-30 16:30",
    status: "in-progress",
    hasVideo: true,
    hasResultSheet: false
  }
];

const getStatusIcon = (status: Interview["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <Play className="h-4 w-4 text-blue-500" />;
    case "terminated":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "forfeited":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

const getStatusBadge = (status: Interview["status"]) => {
  const variants = {
    completed: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
    "in-progress": "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20", 
    terminated: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
    forfeited: "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20"
  };

  return (
    <Badge variant="secondary" className={variants[status]}>
      {getStatusIcon(status)}
      <span className="ml-1 capitalize">{status.replace("-", " ")}</span>
    </Badge>
  );
};

export const ReviewerPanel = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  // Get unique projects for the dropdown
  const uniqueProjects = Array.from(new Set(mockInterviews.map(i => i.project)));

  const filteredInterviews = mockInterviews.filter(interview => {
    const matchesStatus = selectedStatus === "all" || interview.status === selectedStatus;
    const matchesProject = selectedProject === "all" || interview.project === selectedProject;
    const matchesSearch = searchTerm === "" || 
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesProject && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInterviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInterviews = filteredInterviews.slice(startIndex, endIndex);

  const handleDownload = (type: string, interviewId: string, candidateName: string) => {
    // Mock download functionality
    console.log(`Downloading ${type} for interview ${interviewId} (${candidateName})`);
    // In real implementation, this would trigger file download
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Reviewer Panel</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Download interview recordings, screencaptures, and result sheets
        </p>
      </div>

      {/* Interviews Table */}
      <Card className="flex-1 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Interview Records</CardTitle>
              <CardDescription>
                Showing {filteredInterviews.length} of {mockInterviews.length} interviews
              </CardDescription>
            </div>
          </div>
          
            {/* Search and Filters */}
            <div className="flex items-center gap-4 mt-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by candidate name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {uniqueProjects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                  <SelectItem value="forfeited">Forfeited</SelectItem>
                </SelectContent>
              </Select>

              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(parseInt(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[400px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Interview Timeline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Downloads</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInterviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{interview.candidateName}</div>
                          <div className="text-xs text-muted-foreground">{interview.candidateEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{interview.project}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>Start: {new Date(interview.interviewStartTime).toLocaleString()}</div>
                        <div>End: {new Date(interview.interviewEndTime).toLocaleString()}</div>
                        {interview.attemptedAt && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Attempted: {new Date(interview.attemptedAt).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(interview.status)}
                    </TableCell>
                    <TableCell>
                      {interview.score ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{interview.score}%</span>
                          <Progress value={interview.score} className="w-16 h-2" />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {interview.hasVideo && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownload("video", interview.id, interview.candidateName)}
                          >
                            <Video className="h-4 w-4" />
                          </Button>
                        )}
                        {interview.hasResultSheet && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownload("result-sheet", interview.id, interview.candidateName)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                        {!interview.hasVideo && !interview.hasResultSheet && (
                          <span className="text-xs text-muted-foreground">No files</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </div>
          </CardContent>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredInterviews.length)} of {filteredInterviews.length} results
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </Card>
      </div>
    );
  };