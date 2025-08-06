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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  ArrowUpDown,
  RotateCcw
} from "lucide-react";
import { ScheduleInterviewForm } from "./ScheduleInterviewForm";
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
  timelineDate: Date;
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
    project: "Senior Frontend Developer Hiring Q1",
    timelineDate: new Date("2024-02-15T10:00:00"),
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
    timelineDate: new Date("2024-02-16T14:00:00"),
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
    timelineDate: new Date("2024-02-17T09:00:00"),
    status: "Pending",
    passmark: 75,
    duration: 90
  },
  {
    id: "4",
    candidateName: "Sarah Wilson",
    candidateEmail: "sarah@example.com",
    phone: "+1234567893",
    project: "Junior Frontend Developer Hiring Q1",
    timelineDate: new Date("2024-02-18T11:00:00"),
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
    timelineDate: new Date("2024-02-19T15:00:00"),
    status: "In Progress",
    passmark: 80,
    duration: 75
  },
  {
    id: "6",
    candidateName: "Emily Davis",
    candidateEmail: "emily@example.com",
    phone: "+1234567895",
    project: "Senior Backend Developer Hiring Q1",
    timelineDate: new Date("2024-02-20T13:00:00"),
    status: "Passed",
    score: 92,
    passmark: 75,
    duration: 80
  },
  {
    id: "7",
    candidateName: "Robert Chen",
    candidateEmail: "robert@example.com",
    phone: "+1234567896",
    project: "Mobile Developer Hiring",
    timelineDate: new Date("2024-02-21T16:00:00"),
    status: "Failed",
    score: 58,
    passmark: 70,
    duration: 55
  },
  {
    id: "8",
    candidateName: "Lisa Rodriguez",
    candidateEmail: "lisa@example.com",
    phone: "+1234567897",
    project: "UI/UX Designer Hiring",
    timelineDate: new Date("2024-02-22T10:30:00"),
    status: "Pending",
    passmark: 65,
    duration: 70
  },
  {
    id: "9",
    candidateName: "David Park",
    candidateEmail: "david@example.com",
    phone: "+1234567898",
    project: "Data Scientist Hiring",
    timelineDate: new Date("2024-02-23T14:30:00"),
    status: "No Show",
    passmark: 80,
    duration: 90
  },
  {
    id: "10",
    candidateName: "Maria Garcia",
    candidateEmail: "maria@example.com",
    phone: "+1234567899",
    project: "Product Manager Hiring",
    timelineDate: new Date("2024-02-24T11:15:00"),
    status: "Passed",
    score: 78,
    passmark: 70,
    duration: 85
  },
  {
    id: "11",
    candidateName: "Kevin Wong",
    candidateEmail: "kevin@example.com",
    phone: "+1234567800",
    project: "Senior Frontend Developer Hiring Q1",
    timelineDate: new Date("2024-02-25T09:45:00"),
    status: "Forfeited",
    passmark: 70,
    duration: 30
  },
  {
    id: "12",
    candidateName: "Amanda Taylor",
    candidateEmail: "amanda@example.com",
    phone: "+1234567801",
    project: "QA Engineer Hiring",
    timelineDate: new Date("2024-02-26T15:20:00"),
    status: "Passed",
    score: 88,
    passmark: 75,
    duration: 65
  },
  {
    id: "13",
    candidateName: "James Miller",
    candidateEmail: "james@example.com",
    phone: "+1234567802",
    project: "Cloud Engineer Hiring",
    timelineDate: new Date("2024-02-27T12:00:00"),
    status: "Terminated",
    passmark: 80,
    duration: 20
  },
  {
    id: "14",
    candidateName: "Sophie Anderson",
    candidateEmail: "sophie@example.com",
    phone: "+1234567803",
    project: "Security Engineer Hiring",
    timelineDate: new Date("2024-02-28T10:15:00"),
    status: "In Progress",
    passmark: 85,
    duration: 120
  },
  {
    id: "15",
    candidateName: "Ryan Thompson",
    candidateEmail: "ryan@example.com",
    phone: "+1234567804",
    project: "Machine Learning Engineer Hiring",
    timelineDate: new Date("2024-03-01T13:45:00"),
    status: "Pending",
    passmark: 80,
    duration: 100
  },
  {
    id: "16",
    candidateName: "Jennifer Lee",
    candidateEmail: "jennifer@example.com",
    phone: "+1234567805",
    project: "Technical Writer Hiring",
    timelineDate: new Date("2024-03-02T14:20:00"),
    status: "Failed",
    score: 62,
    passmark: 70,
    duration: 50
  },
  {
    id: "17",
    candidateName: "Daniel Kim",
    candidateEmail: "daniel@example.com",
    phone: "+1234567806",
    project: "DevOps Engineer Hiring",
    timelineDate: new Date("2024-03-03T16:30:00"),
    status: "Passed",
    score: 91,
    passmark: 80,
    duration: 95
  },
  {
    id: "18",
    candidateName: "Rachel Green",
    candidateEmail: "rachel@example.com",
    phone: "+1234567807",
    project: "Frontend Developer Intern",
    timelineDate: new Date("2024-03-04T11:00:00"),
    status: "Technical Failure",
    passmark: 60,
    duration: 40
  },
  {
    id: "19",
    candidateName: "Michael Brown",
    candidateEmail: "michael.b@example.com",
    phone: "+1234567808",
    project: "Backend Developer Hiring Q1",
    timelineDate: new Date("2024-03-05T09:30:00"),
    status: "Passed",
    score: 82,
    passmark: 70,
    duration: 75
  },
  {
    id: "20",
    candidateName: "Olivia Martinez",
    candidateEmail: "olivia@example.com",
    phone: "+1234567809",
    project: "Product Designer Hiring",
    timelineDate: new Date("2024-03-06T15:00:00"),
    status: "Pending",
    passmark: 65,
    duration: 80
  },
  {
    id: "21",
    candidateName: "Thomas Wilson",
    candidateEmail: "thomas@example.com",
    phone: "+1234567810",
    project: "Senior Full Stack Developer",
    timelineDate: new Date("2024-03-07T10:45:00"),
    status: "Failed",
    score: 55,
    passmark: 75,
    duration: 60
  },
  {
    id: "22",
    candidateName: "Isabella Garcia",
    candidateEmail: "isabella@example.com",
    phone: "+1234567811",
    project: "Data Analyst Hiring",
    timelineDate: new Date("2024-03-08T14:15:00"),
    status: "Passed",
    score: 86,
    passmark: 70,
    duration: 70
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get unique projects for filter
  const projects = Array.from(new Set(interviews.map(i => i.project)));

  // Filter and sort interviews
  const filteredInterviews = interviews
    .filter(interview => {
      const matchesSearch =
        interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        interview.project.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProject = selectedProject === "all" || interview.project === selectedProject;

      return matchesSearch && matchesProject;
    })
    .sort((a, b) => {
      if (sortBy === "score") {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        return sortOrder === "desc" ? scoreB - scoreA : scoreA - scoreB;
      } else {
        const dateA = a.timelineDate.getTime();
        const dateB = b.timelineDate.getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      }
    });

  // Pagination logic
  const totalItems = filteredInterviews.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInterviews = filteredInterviews.slice(startIndex, endIndex);

  // Reset to first page when search/filter changes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    setCurrentPage(1);
  };

  const handleReschedule = (interview: Interview) => {
    setRescheduleInterview(interview);
    setRescheduleDate(undefined);
  };

  const confirmReschedule = () => {
    if (rescheduleInterview && rescheduleDate) {
      setInterviews(interviews.map(interview =>
        interview.id === rescheduleInterview.id
          ? { ...interview, timelineDate: rescheduleDate, status: "Pending" as InterviewStatus }
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
    <div className="space-y-3">
      <div className="flex items-center justify-between mt-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Interviews
        </h1>
        <ScheduleInterviewForm onSchedule={(data) => console.log('New interview scheduled:', data)} />
      </div>

      {/* Search and Filter Bar */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="!p-3">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates, emails, or projects..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedProject} onValueChange={handleProjectChange}>
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
      <Card className="border-border/20 bg-card/80 backdrop-blur-lg shadow-elegant">
        <CardHeader className="pb-4 pt-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-primary" />
            </div>
            All Interviews
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
              {filteredInterviews.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-2">
            <Table>
              <TableHeader>
                <TableRow className="border-border/30 bg-muted/30 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground/90 h-14">Candidate</TableHead>
                  <TableHead className="font-semibold text-foreground/90 px-8">Project</TableHead>
                  <TableHead className="font-semibold text-foreground/90 px-8">Timeline</TableHead>
                  <TableHead className="font-semibold text-foreground/90 ">Status</TableHead>
                  <TableHead className="font-semibold text-foreground/90 text-center">Score</TableHead>
                  <TableHead className="font-semibold text-foreground/90 text-center">Pass Mark</TableHead>
                  <TableHead className="font-semibold text-foreground/90 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
            </Table>
          </div>
          <div className="px-2 overflow-y-scroll h-[calc(100vh-360px)] lg:h-[calc(100vh-390px)]">
            <Table>
              <TableBody>
                {paginatedInterviews.map((interview) => (
                  <TableRow
                    key={interview.id}
                    className="border-border/20 hover:bg-muted/20 transition-all duration-200 group animate-fade-in"
                  >
                    <TableCell className="py-3">
                      <div className="space-y-0">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {interview.candidateName}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          {interview.candidateEmail}
                        </p>
                        <p className="text-xs text-muted-foreground/80 font-mono">
                          {interview.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="px-3 py-1.5 bg-accent/30 rounded-md border border-accent/20">
                        <p className="text-sm font-medium text-accent-foreground">
                          {interview.project}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="space-y-0">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                          <p className="text-sm font-semibold text-foreground">
                            {format(interview.timelineDate, "MMM dd, yyyy")}
                          </p>
                        </div>
                        <div className="ml-4 space-y-0">
                          <p className="text-xs text-muted-foreground font-medium">
                            Started: {format(interview.timelineDate, "hh:mm a")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration: {interview.duration} mins
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="flex items-center">
                        <Badge
                          variant={getStatusBadgeVariant(interview.status)}
                          className="font-medium px-3 py-1.5 shadow-sm"
                        >
                          {interview.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      {interview.score !== undefined ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className={cn(
                            "text-lg font-semibold px-3 py-1 rounded-lg",
                            interview.score >= interview.passmark
                              ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30"
                              : "text-red-600 bg-red-50 dark:bg-red-950/30"
                          )}>
                            {interview.score}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-lg font-medium">-</span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="px-1 py-1 bg-muted/50 rounded-md border">
                        <span className="text-sm font-medium text-muted-foreground">
                          {interview.passmark}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-center">
                      <div className="flex justify-center items-center">
                        {canReschedule(interview.status) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReschedule(interview)}
                            className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 hover-scale"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Reschedule
                          </Button>
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

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <Card className="border-none bg-card/30 backdrop-blur-sm">
          <CardContent className="py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Results info */}
              <div className="w-1/2 text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{" "}
                <span className="font-medium text-foreground">{Math.min(endIndex, totalItems)}</span> of{" "}
                <span className="font-medium text-foreground">{totalItems}</span> results
              </div>

              {/* Pagination controls */}
              <Pagination className="!w-1/2 flex items-center justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={cn(
                        "cursor-pointer",
                        currentPage === 1 && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage > totalPages - 3) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }

                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          onClick={() => setCurrentPage(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(totalPages)}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={cn(
                        "cursor-pointer",
                        currentPage === totalPages && "pointer-events-none opacity-50"
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      )}

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