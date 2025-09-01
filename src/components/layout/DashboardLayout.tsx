import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InterviewsPage } from "@/components/interviews/InterviewsPage";
import { TalentExtractPage } from "@/components/talent-extract/TalentExtractPage";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Users,
  FolderOpen,
  Calendar,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  FileSearch
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const userName = "John Smith";
  const profileImage = "";
  const userRoles = ["Admin", "HR Manager", "Interview Coordinator"];
  const profileCompleteness = 85;

  const navigation = [
    { id: "dashboard", name: "Overview", icon: LayoutDashboard },
    { id: "interviews", name: "Upcoming Interviews", icon: Calendar },
    { id: "talent-extract", name: "Interview History", icon: FileSearch },
    { id: "projects", name: "Trial Interviews", icon: FolderOpen },
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName}</h1>
              <p className="text-muted-foreground mt-1">Manage your interviews and track your progress</p>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Profile Completeness */}
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Profile Completeness</p>
                <div className="flex items-center space-x-3">
                  <Progress value={profileCompleteness} className="w-24 h-2" />
                  <span className="text-sm font-semibold text-primary">{profileCompleteness}%</span>
                </div>
              </div>

              {/* Profile Menu */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-muted/60">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-border text-sm font-semibold text-primary">
                        {getInitials(userName)}
                      </div>
                    )}
                    <span className="text-sm font-medium">{userName}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 bg-popover border border-border shadow-lg backdrop-blur-xl">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-border text-lg font-semibold text-primary">
                          {getInitials(userName)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground">{userName}</h3>
                        <p className="text-sm text-muted-foreground">Administrator</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-3">
                      <h4 className="text-sm font-medium text-foreground mb-2">Switch Role</h4>
                      <div className="space-y-1">
                        {userRoles.map((role) => (
                          <Button
                            key={role}
                            variant="ghost"
                            className="w-full justify-start text-left h-auto py-2 px-3 hover:bg-muted/60"
                            onClick={() => {
                              console.log(`Switching to role: ${role}`);
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm">{role}</span>
                              {role === "Admin" && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Current</span>
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-3">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-destructive hover:bg-destructive/10"
                        onClick={() => console.log("Signing out...")}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-8 border-b border-border/30">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${
                    activeTab === item.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="px-6 py-6">
          {activeTab === "dashboard" && children}
          {activeTab === "interviews" && <InterviewsPage />}
          {activeTab === "talent-extract" && <TalentExtractPage />}
          {activeTab === "projects" && <div className="text-center py-12 text-muted-foreground">Trial Interviews page coming soon...</div>}
        </div>
      </main>
    </div>
  );
};