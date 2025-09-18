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
  Video,
  Mic,
  Monitor,
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
  position: string;
  project: string;
  scheduledDate: string;
  duration: string;
  status: "completed" | "in-progress" | "terminated" | "forfeited";
  hasAudio: boolean;
  hasVideo: boolean;
  hasScreenCapture: boolean;
  hasResultSheet: boolean;
  score?: number;
}

const mockInterviews: Interview[] = [
  {
    id: "INT-001",
    candidateName: "Sarah Johnson",
    position: "Frontend Developer",
    project: "E-commerce Platform",
    scheduledDate: "2024-01-15 14:00",
    duration: "45 min",
    status: "completed",
    hasAudio: true,
    hasVideo: true,
    hasScreenCapture: true,
    hasResultSheet: true,
    score: 85
  },
  {
    id: "INT-002",
    candidateName: "Mike Chen",
    position: "Backend Developer", 
    project: "Banking System",
    scheduledDate: "2024-01-14 10:30",
    duration: "38 min",
    status: "completed",
    hasAudio: true,
    hasVideo: false,
    hasScreenCapture: true,
    hasResultSheet: true,
    score: 92
  },
  {
    id: "INT-003",
    candidateName: "Emma Wilson",
    position: "Full Stack Developer",
    project: "Healthcare App",
    scheduledDate: "2024-01-13 16:00",
    duration: "22 min",
    status: "terminated",
    hasAudio: true,
    hasVideo: true,
    hasScreenCapture: false,
    hasResultSheet: false
  },
  {
    id: "INT-004",
    candidateName: "John Davis",
    position: "UI/UX Designer",
    project: "Mobile App Redesign",
    scheduledDate: "2024-01-12 11:00",
    duration: "18 min",
    status: "forfeited",
    hasAudio: true,
    hasVideo: false,
    hasScreenCapture: true,
    hasResultSheet: false
  },
  {
    id: "INT-005",
    candidateName: "Lisa Rodriguez",
    position: "DevOps Engineer",
    project: "Cloud Migration",
    scheduledDate: "2024-01-11 09:15",
    duration: "Ongoing",
    status: "in-progress",
    hasAudio: true,
    hasVideo: true,
    hasScreenCapture: true,
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

  // Get unique projects for the dropdown
  const uniqueProjects = Array.from(new Set(mockInterviews.map(i => i.project)));

  const filteredInterviews = mockInterviews.filter(interview => {
    const matchesStatus = selectedStatus === "all" || interview.status === selectedStatus;
    const matchesProject = selectedProject === "all" || interview.project === selectedProject;
    const matchesSearch = searchTerm === "" || 
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesProject && matchesSearch;
  });

  const handleDownload = (type: string, interviewId: string, candidateName: string) => {
    // Mock download functionality
    console.log(`Downloading ${type} for interview ${interviewId} (${candidateName})`);
    // In real implementation, this would trigger file download
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
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Date & Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Downloads</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{interview.candidateName}</div>
                          <div className="text-xs text-muted-foreground">{interview.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{interview.position}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{interview.project}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(interview.scheduledDate).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {interview.duration}
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
                        <span className="text-xs text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {interview.hasAudio && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownload("audio", interview.id, interview.candidateName)}
                          >
                            <Mic className="h-4 w-4" />
                          </Button>
                        )}
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
                        {interview.hasScreenCapture && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleDownload("screencapture", interview.id, interview.candidateName)}
                          >
                            <Monitor className="h-4 w-4" />
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
                        {!interview.hasAudio && !interview.hasVideo && !interview.hasScreenCapture && !interview.hasResultSheet && (
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
      </Card>
    </div>
  );
};