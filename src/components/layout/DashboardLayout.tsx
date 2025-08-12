import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InterviewsPage } from "@/components/interviews/InterviewsPage";
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
  X,
  User,
  ChevronRight,
  LayoutDashboard
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const userName = "John Doe";
  const profileImage = "";
  const userRoles = ["Admin", "HR Manager", "Interview Coordinator"];

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "projects", name: "Projects", icon: FolderOpen },
    { id: "interviews", name: "Interviews", icon: Calendar },
    { id: "users", name: "Enterprise Users", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all duration-400"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 
        ${sidebarHovered ? "w-64" : "w-16"} 
        bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-elegant transform transition-[width,transform] duration-500 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:inset-0`}

        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <div className={`mt-10 h-16 ${sidebarHovered ? "px-6 flex items-center" : "px-2"} duration-500 gap-4`}>
          {/* Logo Icon */}
          <div
            className={`flex items-center justify-center transition-all duration-500 ${sidebarHovered ? "h-14 w-14" : "h-14"}`}
          >
            <img
              src="/images/logo_icon.png"
              alt="Logo Icon"
              className="object-contain h-full w-full"
            />
          </div>

          {/* Logo Text */}
          <h1
            className={`
              flex items-center bg-gradient-primary bg-clip-text text-transparent ease-in-out
              ${sidebarHovered ? "opacity-100" : "opacity-0"} h-8
            `}
          >
            <img
              src="/images/logo_text.png"
              alt="Logo Text"
              className="h-16 object-contain"
            />
          </h1>

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>


        <nav className={`${sidebarHovered ? "p-4" : "p-3"} mt-5 space-y-1 transition-[padding] duration-500 ease-in-out`}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`
                  w-full justify-start px-2 transition-all duration-500 ease-in-out
                  ${sidebarHovered ? "pl-6" : "pl-3"} ${activeTab === item.id
                    ? "bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-hover"
                    : "hover:bg-muted/60 hover:translate-x-1"
                  }
                `}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {sidebarHovered && (
                  <span className={`
                    ml-3 text-sm font-medium ease-in-out duration-300 ${sidebarHovered ? "opacity-100" : "opacity-0"}
                  `}
                    style={{ width: sidebarHovered ? "auto" : 0, overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    {item.name}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>

        <div className={`absolute bottom-4 transition-all duration-500 ease-in-out ${sidebarHovered ? "left-4 right-4" : "left-2 right-2"}`}>
          {/* Profile Button */}
          <div className={`mb-2 ${sidebarHovered ? "" : "mx-1"}`}>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className={`w-full justify-start ${sidebarHovered ? "" : "p-3"}`}>
                  <User className={`h-4 w-4`} />
                  <span className={`ml-3 transition-opacity duration-200 ease-in-out ${sidebarHovered ? "opacity-100" : "opacity-0"}`}>
                    Profile
                  </span>
                  {sidebarHovered && <ChevronRight className="ml-auto h-4 w-4" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-80 bg-popover border border-border shadow-lg backdrop-blur-xl">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-12 w-12 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center border border-border text-lg font-semibold text-primary">
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
                            // Role switching logic would go here
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
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Sign Out Button */}
          <div className={`${sidebarHovered ? "" : "mx-1"}`}>
            <Button variant="outline" className={`w-full justify-start ${sidebarHovered ? "" : "p-3"}`}>
              <LogOut className={`h-4 w-4`} />
              <span className={`ml-3 transition-opacity duration-200 ease-in-out ${sidebarHovered ? "opacity-100" : "opacity-0"}`}>
                Sign Out
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-[padding] duration-500 ease-in-out ${sidebarHovered ? "lg:pl-64" : "lg:pl-16"}`}>
        {/* Top bar */}
        {/* <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden hover:bg-muted/80 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-primary animate-glow"></div>
              <span className="text-sm font-medium">Welcome back, Admin</span>
            </div>
          </div>
        </div> */}

        {/* Page content */}
        <main className="px-6 py-3">
          {activeTab === "dashboard" && children}
          {activeTab === "interviews" && <InterviewsPage />}
          {activeTab === "projects" && <div>Projects page coming soon...</div>}
          {activeTab === "users" && <div>Enterprise Users page coming soon...</div>}
          {activeTab === "settings" && <div>Settings page coming soon...</div>}
        </main>
      </div>
    </div>
  );
};