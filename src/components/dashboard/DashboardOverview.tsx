import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FolderOpen, 
  Calendar, 
  Clock,
  Plus,
  TrendingUp
} from "lucide-react";

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Active Projects",
      value: "8",
      icon: FolderOpen,
      trend: "+2 this month"
    },
    {
      title: "Scheduled Interviews",
      value: "24",
      icon: Calendar,
      trend: "+6 this week"
    },
    {
      title: "Enterprise Users",
      value: "12",
      icon: Users,
      trend: "+3 this month"
    },
    {
      title: "Avg Interview Duration",
      value: "45m",
      icon: Clock,
      trend: "Standard"
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      candidates: 8,
      status: "Active",
      endDate: "2024-02-15"
    },
    {
      id: 2,
      name: "Product Manager",
      company: "StartupXYZ",
      candidates: 5,
      status: "Active", 
      endDate: "2024-02-20"
    },
    {
      id: 3,
      name: "Data Scientist",
      company: "DataFlow Ltd",
      candidates: 12,
      status: "Draft",
      endDate: "2024-02-25"
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "John Smith",
      position: "Senior Frontend Developer",
      time: "Today, 2:00 PM",
      status: "Confirmed"
    },
    {
      id: 2,
      candidate: "Sarah Johnson",
      position: "Product Manager", 
      time: "Tomorrow, 10:00 AM",
      status: "Pending"
    },
    {
      id: 3,
      candidate: "Mike Chen",
      position: "Data Scientist",
      time: "Feb 2, 3:00 PM",
      status: "Confirmed"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your interview management hub</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.company}</p>
                    <p className="text-xs text-muted-foreground">{project.candidates} candidates</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">Ends: {project.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium">{interview.candidate}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <p className="text-xs text-muted-foreground">{interview.time}</p>
                  </div>
                  <Badge variant={interview.status === "Confirmed" ? "default" : "secondary"}>
                    {interview.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};