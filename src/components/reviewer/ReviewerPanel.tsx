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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
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
  Search,
  Download,
  Calendar,
  Timer,
  ChevronDown,
  Pause,
  X,
  Volume2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface InterviewQuestion {
  id: string;
  question: string;
  videoUrl: string;
  duration: number; // in seconds
}

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
  questions: InterviewQuestion[];
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
    score: 85,
    questions: [
      { id: "Q1", question: "Tell us about your experience with React", videoUrl: "/mock-video-1.mp4", duration: 180 },
      { id: "Q2", question: "How do you handle state management?", videoUrl: "/mock-video-2.mp4", duration: 240 },
      { id: "Q3", question: "Explain your approach to testing React components", videoUrl: "/mock-video-3.mp4", duration: 200 }
    ]
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
    score: 92,
    questions: []
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
    hasResultSheet: false,
    questions: [
      { id: "Q1", question: "Database design principles", videoUrl: "/mock-video-1.mp4", duration: 150 },
      { id: "Q2", question: "API security best practices", videoUrl: "/mock-video-2.mp4", duration: 190 }
    ]
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
    hasResultSheet: false,
    questions: []
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
    hasResultSheet: false,
    questions: [
      { id: "Q1", question: "Docker containerization strategy", videoUrl: "/mock-video-1.mp4", duration: 220 },
      { id: "Q2", question: "CI/CD pipeline implementation", videoUrl: "/mock-video-2.mp4", duration: 280 },
      { id: "Q3", question: "Kubernetes orchestration", videoUrl: "/mock-video-3.mp4", duration: 260 },
      { id: "Q4", question: "Cloud security considerations", videoUrl: "/mock-video-4.mp4", duration: 300 }
    ]
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
    score: 78,
    questions: [
      { id: "Q1", question: "JavaScript ES6+ features", videoUrl: "/mock-video-1.mp4", duration: 160 },
      { id: "Q2", question: "Performance optimization techniques", videoUrl: "/mock-video-2.mp4", duration: 210 }
    ]
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
    score: 95,
    questions: [
      { id: "Q1", question: "Machine learning algorithms", videoUrl: "/mock-video-1.mp4", duration: 270 },
      { id: "Q2", question: "Data preprocessing techniques", videoUrl: "/mock-video-2.mp4", duration: 250 },
      { id: "Q3", question: "Statistical analysis methods", videoUrl: "/mock-video-3.mp4", duration: 230 }
    ]
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
    hasResultSheet: false,
    questions: []
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
    score: 87,
    questions: [
      { id: "Q1", question: "React Native vs Flutter", videoUrl: "/mock-video-1.mp4", duration: 180 },
      { id: "Q2", question: "Mobile app performance optimization", videoUrl: "/mock-video-2.mp4", duration: 220 },
      { id: "Q3", question: "Cross-platform development strategies", videoUrl: "/mock-video-3.mp4", duration: 190 }
    ]
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
    hasResultSheet: false,
    questions: [
      { id: "Q1", question: "Healthcare data security", videoUrl: "/mock-video-1.mp4", duration: 150 }
    ]
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
    score: 82,
    questions: [
      { id: "Q1", question: "Test automation strategies", videoUrl: "/mock-video-1.mp4", duration: 200 },
      { id: "Q2", question: "Bug tracking and reporting", videoUrl: "/mock-video-2.mp4", duration: 180 }
    ]
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
    score: 91,
    questions: [
      { id: "Q1", question: "Infrastructure as Code", videoUrl: "/mock-video-1.mp4", duration: 240 },
      { id: "Q2", question: "Monitoring and alerting", videoUrl: "/mock-video-2.mp4", duration: 200 },
      { id: "Q3", question: "Disaster recovery planning", videoUrl: "/mock-video-3.mp4", duration: 280 }
    ]
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
    hasResultSheet: false,
    questions: []
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
    score: 88,
    questions: [
      { id: "Q1", question: "Python data libraries", videoUrl: "/mock-video-1.mp4", duration: 190 },
      { id: "Q2", question: "Data visualization techniques", videoUrl: "/mock-video-2.mp4", duration: 170 }
    ]
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
    score: 79,
    questions: [
      { id: "Q1", question: "CSS Grid and Flexbox", videoUrl: "/mock-video-1.mp4", duration: 160 },
      { id: "Q2", question: "Responsive design principles", videoUrl: "/mock-video-2.mp4", duration: 180 }
    ]
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
    hasResultSheet: false,
    questions: [
      { id: "Q1", question: "iOS vs Android development", videoUrl: "/mock-video-1.mp4", duration: 210 },
      { id: "Q2", question: "Mobile UI/UX best practices", videoUrl: "/mock-video-2.mp4", duration: 195 }
    ]
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
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

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

  const formatDateTime = (dateString: string, timezone: string = "Asia/Colombo") => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: timezone
    };
    return `${date.toLocaleString('en-US', options)} (${timezone})`;
  };

  const handlePlayVideo = (interviewId: string, candidateName: string) => {
    const interview = mockInterviews.find(i => i.id === interviewId);
    if (interview && interview.questions.length > 0) {
      setSelectedInterview(interview);
      setCurrentQuestionIndex(0);
      setVideoModalOpen(true);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
    setSelectedInterview(null);
    setCurrentQuestionIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleQuestionChange = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handlePreviousQuestion = () => {
    if (selectedInterview && currentQuestionIndex > 0) {
      handleQuestionChange(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedInterview && currentQuestionIndex < selectedInterview.questions.length - 1) {
      handleQuestionChange(currentQuestionIndex + 1);
    }
  };

  const getCurrentQuestion = () => {
    if (selectedInterview && selectedInterview.questions[currentQuestionIndex]) {
      return selectedInterview.questions[currentQuestionIndex];
    }
    return null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleViewReport = (interviewId: string, candidateName: string) => {
    console.log(`Viewing report for interview ${interviewId} (${candidateName})`);
    // In real implementation, this would open report viewer
  };

  const handleDownload = (type: string, interviewId: string, candidateName: string) => {
    console.log(`Downloading ${type} for interview ${interviewId} (${candidateName})`);
    // In real implementation, this would trigger file download
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Reviewer Panel</h1>
      </div>

      {/* Interviews Table */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Interview Records</CardTitle>
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
            
            <div className="relative w-48">
              <Input
                placeholder="Search projects..."
                value={selectedProject === "all" ? "" : selectedProject}
                onChange={(e) => setSelectedProject(e.target.value || "all")}
                className="pr-8"
              />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
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
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Candidate</TableHead>
                  <TableHead className="w-[250px]">Project</TableHead>
                  <TableHead className="w-[300px]">Interview Timeline</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[100px]">Score</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
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
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{interview.candidateName}</div>
                          <div className="text-xs text-muted-foreground truncate">{interview.candidateEmail}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{interview.project}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="bg-muted/50 rounded-lg p-2 space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="font-medium">Interview Window</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Start: {formatDateTime(interview.interviewStartTime)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            End: {formatDateTime(interview.interviewEndTime)}
                          </div>
                        </div>
                        {interview.attemptedAt && (
                          <div className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-950/30 p-1.5 rounded">
                            <Timer className="h-3 w-3 text-blue-500" />
                            <span className="text-blue-700 dark:text-blue-300">
                              Attempted: {formatDateTime(interview.attemptedAt)}
                            </span>
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
                          <Progress value={interview.score} className="w-12 h-2" />
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
                            onClick={() => handlePlayVideo(interview.id, interview.candidateName)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {interview.hasResultSheet && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewReport(interview.id, interview.candidateName)}
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
            </Table>
          </div>
        </CardContent>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-3 border-t flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredInterviews.length)} of {filteredInterviews.length} results
                </div>
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

        {/* Video Modal */}
        <Dialog open={videoModalOpen} onOpenChange={handleCloseVideo}>
          <DialogContent className="max-w-4xl w-full">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedInterview?.project} - {selectedInterview?.candidateName}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleCloseVideo}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Question Selector */}
              {selectedInterview && selectedInterview.questions.length > 0 && (
                <div className="space-y-3">
                  {/* Question Display */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">Q{currentQuestionIndex + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground mb-1">Question {currentQuestionIndex + 1}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {getCurrentQuestion()?.question}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Question:</span>
                        <Select value={currentQuestionIndex.toString()} onValueChange={(value) => handleQuestionChange(parseInt(value))}>
                          <SelectTrigger className="w-16">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedInterview.questions.map((_, index) => (
                              <SelectItem key={index} value={index.toString()}>
                                {index + 1}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">
                          of {selectedInterview.questions.length}
                        </span>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === selectedInterview.questions.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Duration: {formatTime(getCurrentQuestion()?.duration || 0)}
                    </div>
                  </div>
                </div>
              )}

              {/* Mock Video Player */}
              <div className="relative bg-black rounded-lg aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-lg text-center space-y-2">
                    <div>Mock Video Player - Interview {selectedInterview?.id}</div>
                    {getCurrentQuestion() && (
                      <div className="text-sm opacity-75">
                        Question {currentQuestionIndex + 1}: {getCurrentQuestion()?.question}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-3">
                    {/* Timeline Slider */}
                    <div className="flex items-center gap-3 text-white text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <div className="flex-1">
                        <Slider
                          value={[currentTime]}
                          onValueChange={handleTimeChange}
                          max={getCurrentQuestion()?.duration || 100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <span>{formatTime(getCurrentQuestion()?.duration || 100)}</span>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="h-8 w-8 p-0 text-white hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        <Volume2 className="h-4 w-4 text-white" />
                        <Slider
                          defaultValue={[50]}
                          max={100}
                          min={0}
                          step={1}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };