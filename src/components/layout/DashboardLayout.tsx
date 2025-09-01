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
  Briefcase
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const userName = "John Smith";
  const profileImage = "";
  const userRoles = ["Admin", "HR Manager", "Interview Coordinator"];

  const navigation = [
    { id: "dashboard", name: "Overview", icon: LayoutDashboard },
    { id: "interviews", name: "Interviews", icon: Calendar },
    { id: "talent-extract", name: "Projects", icon: Briefcase },
    { id: "projects", name: "Users", icon: Users },
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl shrink-0">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Enterprise Dashboard
            </div>
            
            {/* Profile Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-muted/50 rounded-lg px-3 py-2 h-auto"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-7 w-7 rounded-full object-cover border border-border"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center border border-border text-xs font-semibold text-primary">
                      {getInitials(userName)}
                    </div>
                  )}
                  <span className="text-sm font-medium">{userName}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-popover border border-border shadow-lg backdrop-blur-xl z-50">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-border text-sm font-semibold text-primary">
                        {getInitials(userName)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">{userName}</h3>
                      <p className="text-xs text-muted-foreground">System Administrator</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-2">
                    <h4 className="text-xs font-medium text-foreground mb-2">Switch Role</h4>
                    <div className="space-y-1">
                      {userRoles.map((role) => (
                        <Button
                          key={role}
                          variant="ghost"
                          className="w-full justify-start text-left h-auto py-2 px-2 hover:bg-muted/60 text-xs"
                          onClick={() => {
                            console.log(`Switching to role: ${role}`);
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{role}</span>
                            {role === "Admin" && (
                              <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">Current</span>
                            )}
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start hover:bg-muted/60 text-xs py-2 px-2"
                      onClick={() => console.log("Opening settings...")}
                    >
                      <Settings className="h-3 w-3 mr-2" />
                      Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-destructive hover:bg-destructive/10 text-xs py-2 px-2"
                      onClick={() => console.log("Signing out...")}
                    >
                      <LogOut className="h-3 w-3 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="flex space-x-6 border-b border-border/30">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 py-2.5 px-1 border-b-2 transition-colors ${
                    activeTab === item.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-xs">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full px-6 py-4">
          {activeTab === "dashboard" && <div className="h-full">{children}</div>}
          {activeTab === "interviews" && <div className="h-full"><InterviewsPage /></div>}
          {activeTab === "talent-extract" && <div className="h-full"><TalentExtractPage /></div>}
          {activeTab === "projects" && <div className="h-full flex items-center justify-center"><div className="text-center text-muted-foreground">Users page coming soon...</div></div>}
        </div>
      </main>
    </div>
  );
};