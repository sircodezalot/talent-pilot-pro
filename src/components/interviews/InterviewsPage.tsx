import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  ArrowUpDown,
  RotateCcw
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type InterviewStatus = 
  | "Pending" 
  | "No Show" 
  | "Forfeited" 
  | "Terminated" 
  | "Passed" 
  | "Failed" 
  | "Technical Failure" 
  | "In Progress";

interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  phone: string;
  project: string;
  position: string;
  scheduledDate: Date;
  status: InterviewStatus;
  score?: number;
  passmark: number;
  duration: number;
}

// Mock data
const mockInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "John Doe",
    candidateEmail: "john@example.com",
    phone: "+1234567890",
    project: "Frontend Developer Hiring Q1",
    position: "Senior Frontend Developer",
    scheduledDate: new Date("2024-02-15T10:00:00"),
    status: "Passed",
    score: 85,
    passmark: 70,
    duration: 60
  },
  {
    id: "2",
    candidateName: "Jane Smith",
    candidateEmail: "jane@example.com",
    phone: "+1234567891",
    project: "Backend Developer Hiring Q1",
    position: "Backend Developer",
    scheduledDate: new Date("2024-02-16T14:00:00"),
    status: "Failed",
    score: 45,
    passmark: 70,
    duration: 45
  },
  {
    id: "3",
    candidateName: "Mike Johnson",
    candidateEmail: "mike@example.com",
    phone: "+1234567892",
    project: "Full Stack Developer Hiring",
    position: "Full Stack Developer",
    scheduledDate: new Date("2024-02-17T09:00:00"),
    status: "Pending",
    passmark: 75,
    duration: 90
  },
  {
    id: "4",
    candidateName: "Sarah Wilson",
    candidateEmail: "sarah@example.com",
    phone: "+1234567893",
    project: "Frontend Developer Hiring Q1",
    position: "Junior Frontend Developer",
    scheduledDate: new Date("2024-02-18T11:00:00"),
    status: "Technical Failure",
    passmark: 60,
    duration: 60
  },
  {
    id: "5",
    candidateName: "Alex Brown",
    candidateEmail: "alex@example.com",
    phone: "+1234567894",
    project: "DevOps Engineer Hiring",
    position: "DevOps Engineer",
    scheduledDate: new Date("2024-02-19T15:00:00"),
    status: "In Progress",
    passmark: 80,
    duration: 75
  }
];

const getStatusBadgeVariant = (status: InterviewStatus) => {
  switch (status) {
    case "Passed":
      return "default";
    case "Failed":
      return "destructive";
    case "Pending":
      return "secondary";
    case "In Progress":
      return "default";
    case "Technical Failure":
      return "destructive";
    case "No Show":
    case "Forfeited":
    case "Terminated":
      return "outline";
    default:
      return "secondary";
  }
};

const canReschedule = (status: InterviewStatus) => {
  return ["Passed", "Failed", "Technical Failure", "Forfeited", "Terminated"].includes(status);
};

export const InterviewsPage = () => {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [rescheduleDate, setRescheduleDate] = useState<Date>();
  const [rescheduleInterview, setRescheduleInterview] = useState<Interview | null>(null);

  // Get unique projects for filter
  const projects = Array.from(new Set(interviews.map(i => i.project)));

  // Filter and sort interviews
  const filteredInterviews = interviews
    .filter(interview => {
      const matchesSearch = 
        interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesProject = selectedProject === "all" || interview.project === selectedProject;
      
      return matchesSearch && matchesProject;
    })
    .sort((a, b) => {
      if (sortBy === "score") {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        return sortOrder === "desc" ? scoreB - scoreA : scoreA - scoreB;
      } else {
        const dateA = a.scheduledDate.getTime();
        const dateB = b.scheduledDate.getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      }
    });

  const handleReschedule = (interview: Interview) => {
    setRescheduleInterview(interview);
    setRescheduleDate(undefined);
  };

  const confirmReschedule = () => {
    if (rescheduleInterview && rescheduleDate) {
      setInterviews(interviews.map(interview => 
        interview.id === rescheduleInterview.id 
          ? { ...interview, scheduledDate: rescheduleDate, status: "Pending" as InterviewStatus }
          : interview
      ));
      setRescheduleInterview(null);
      setRescheduleDate(undefined);
    }
  };

  const toggleSort = (newSortBy: "date" | "score") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Interviews
        </h1>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates, emails, or positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full md:w-64">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => toggleSort("date")}
                className="flex items-center gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                Date
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => toggleSort("score")}
                className="flex items-center gap-2"
              >
                Score
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interviews Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            All Interviews ({filteredInterviews.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Pass Mark</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map((interview) => (
                  <TableRow key={interview.id} className="border-border/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{interview.candidateName}</p>
                        <p className="text-sm text-muted-foreground">{interview.candidateEmail}</p>
                        <p className="text-xs text-muted-foreground">{interview.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{interview.project}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{interview.position}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {format(interview.scheduledDate, "MMM dd, yyyy")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(interview.scheduledDate, "hh:mm a")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {interview.duration} mins
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(interview.status)}>
                        {interview.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {interview.score !== undefined ? (
                        <span className={cn(
                          "font-medium",
                          interview.score >= interview.passmark 
                            ? "text-emerald-600" 
                            : "text-red-600"
                        )}>
                          {interview.score}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {interview.passmark}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {canReschedule(interview.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReschedule(interview)}
                          className="flex items-center gap-1"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Reschedule
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reschedule Dialog */}
      <Dialog 
        open={!!rescheduleInterview} 
        onOpenChange={() => setRescheduleInterview(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Reschedule interview for {rescheduleInterview?.candidateName}
            </p>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !rescheduleDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {rescheduleDate ? format(rescheduleDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={rescheduleDate}
                  onSelect={setRescheduleDate}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setRescheduleInterview(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={confirmReschedule}
                disabled={!rescheduleDate}
              >
                Confirm Reschedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};