import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InterviewsPage } from "@/components/interviews/InterviewsPage";
import {
  Users,
  FolderOpen,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
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

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: FolderOpen },
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
        {/* <div className={`flex items-center justify-between h-16 ${sidebarHovered ? "px-6" : "px-2"} border-b border-border/50 bg-gradient-card transition-[padding] duration-500 ease-in-out gap-4`}>
          <div className={`${sidebarHovered ? "h-16" : "h-5"} flex items-center justify-center`}>
            <img src="public\images\logo_icon.png" alt="" />
          </div>
          <h1 className={`
            text-xl font-bold bg-gradient-primary bg-clip-text text-transparent transition-opacity duration-200 ease-in-out
            ${sidebarHovered ? "opacity-100" : "opacity-0"}
          `}>
            <img src="public\images\logo_text.png" alt="" />
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div> */}

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
          {/* Profile section */}
          <div
            className={`
              items-center mb-2 transition-all duration-500 ease-in-out ${sidebarHovered ? "flex justify-start" : "justify-center pl-2"}
            `}
            style={{ minHeight: "40px" }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border border-border"
                onError={(e) => ((e.currentTarget as HTMLImageElement).src = "")}
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center border border-border text-base font-semibold text-primary">
                {getInitials(userName)}
              </div>
            )}

            {sidebarHovered && (
              <span
                className={`
                ml-3 text-sm font-medium ease-in-out
                ${sidebarHovered ? "opacity-100" : "opacity-0"}
              `}
                style={{ width: sidebarHovered ? "auto" : 0, overflow: "hidden", whiteSpace: "nowrap" }}
              >
                {userName}
              </span>
            )}
          </div>

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