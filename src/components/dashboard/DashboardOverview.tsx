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
    <div className="space-y-8 animate-fade-in min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mt-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome to <span className="font-bold bg-gradient-primary bg-clip-text text-transparent">Skill</span>
            <span className="font-bold text-black">Hunt</span> Automated Interview Platform Management Hub
          </p>
        </div>
        <Button className="gap-2 bg-gradient-primary hover:shadow-hover transition-all duration-300 hover:scale-105">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105 border-border/70" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card className="bg-white shadow-card border-border/50 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-gradient-secondary/90 hover:bg-gradient-secondary/50 transition-all duration-300 hover:scale-[1.02] animate-scale-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="space-y-2">
                    <p className="font-semibold">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.company}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {project.candidates} candidates
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge variant={project.status === "Active" ? "default" : "secondary"} className={project.status === "Active" ? "bg-gradient-primary shadow-elegant" : ""}>
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
        <Card className="bg-white shadow-card border-border/50 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={interview.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-gradient-secondary/90 hover:bg-gradient-secondary/50 transition-all duration-300 hover:scale-[1.02] animate-scale-in" style={{ animationDelay: `${index * 150 + 300}ms` }}>
                  <div className="space-y-2">
                    <p className="font-semibold">{interview.candidate}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {interview.time}
                    </p>
                  </div>
                  <Badge variant={interview.status === "Confirmed" ? "default" : "secondary"} className={interview.status === "Confirmed" ? "bg-gradient-primary shadow-elegant" : ""}>
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