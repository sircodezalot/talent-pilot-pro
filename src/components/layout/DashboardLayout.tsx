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

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: FolderOpen },
    { id: "projects", name: "Projects", icon: FolderOpen },
    { id: "interviews", name: "Interviews", icon: Calendar },
    { id: "users", name: "Enterprise Users", icon: Users },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-xl border-r border-border/50 shadow-elegant transform transition-all duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-border/50 bg-gradient-card">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">Interview Hub</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start transition-all duration-200 ${
                  activeTab === item.id 
                    ? "bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-hover" 
                    : "hover:bg-muted/60 hover:translate-x-1"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 px-6 bg-card/80 backdrop-blur-xl border-b border-border/50 lg:px-8">
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
        </div>

        {/* Page content */}
        <main className="p-6 lg:p-8">
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