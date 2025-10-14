import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "@/lib/auth";
import { Button } from "./ui/button";
import { 
  GraduationCap, 
  LogOut, 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  ClipboardList 
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    ...(user?.role === "admin" || user?.role === "hod" 
      ? [{ label: "Lecturers", icon: Users, path: "/lecturers" }] 
      : []),
    ...(user?.role === "admin" || user?.role === "dean" || user?.role === "hod"
      ? [{ label: "Analytics", icon: BarChart3, path: "/analytics" }]
      : []),
    ...(user?.role === "student"
      ? [{ label: "Evaluate", icon: ClipboardList, path: "/evaluate" }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">LRMIS</h1>
              <p className="text-xs text-muted-foreground">Lecturer Rating System</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button variant="ghost" className="gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b border-border bg-card px-4 py-2 flex gap-2 overflow-x-auto">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button variant="ghost" size="sm" className="gap-2 whitespace-nowrap">
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
