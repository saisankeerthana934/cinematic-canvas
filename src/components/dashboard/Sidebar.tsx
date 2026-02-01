import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // ✅ FIXED: Added missing import
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, Upload, Sparkles, Video, Presentation, 
  Settings, LogOut, Users, Briefcase, Shield, 
  Calendar, PieChart, Clapperboard, BarChart3, Database,
  Sun, Moon
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { logout, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  // Helper for buttons
  const NavButton = ({ id, label, icon: Icon }: any) => (
    <Button
      variant="ghost"
      onClick={() => onViewChange(id)}
      className={cn(
        "w-full justify-start gap-3 px-4 py-2 h-10 rounded-lg transition-all duration-200 group mb-1",
        activeView === id 
          ? "bg-zinc-900 text-white shadow-inner border border-zinc-800" 
          : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
      )}
    >
      <Icon className={cn(
        "w-4 h-4 transition-colors",
        activeView === id ? "text-yellow-500" : "text-zinc-500 group-hover:text-zinc-300"
      )} />
      <span className="font-medium text-sm">{label}</span>
    </Button>
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col z-50">
      
      {/* LOGO AREA */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
          <Clapperboard className="w-5 h-5 text-black fill-current" />
        </div>
        <span className="text-xl font-display font-bold text-white tracking-wide">
          CINE<span className="text-yellow-500">INTENT</span>
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-2">
        
        {/* --- ADMIN VIEW --- */}
        {isAdmin ? (
          <>
            <div className="px-4 py-2 mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Admin Controls
            </div>
            <NavButton id="admin-dashboard" label="Overview" icon={LayoutDashboard} />
            <NavButton id="admin-directors" label="Directors" icon={Users} />
            <NavButton id="admin-projects" label="All Projects" icon={Briefcase} />
            
            <Separator className="my-3 bg-zinc-800" />
            
            <div className="px-4 py-2 mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Configuration
            </div>
            <NavButton id="admin-settings" label="System Settings" icon={Settings} />
            <NavButton id="admin-logs" label="Audit Logs" icon={Shield} />
          </>
        ) : (
          /* --- DIRECTOR VIEW --- */
          <>
            <div className="px-4 py-2 mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Studio
            </div>
            <NavButton id="dashboard" label="Dashboard" icon={LayoutDashboard} />
            <NavButton id="upload" label="Upload Script" icon={Upload} />
            <NavButton id="generate" label="Story Generate" icon={Sparkles} />
            <NavButton id="visual" label="Visual Director" icon={Video} />
            
            <Separator className="my-3 bg-zinc-800" />
            
            <div className="px-4 py-2 mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Production
            </div>
            <NavButton id="production" label="Production Hub" icon={Clapperboard} />
            <NavButton id="schedule" label="AI Scheduling" icon={Calendar} />
            <NavButton id="budget" label="Budget" icon={PieChart} />
            <NavButton id="assets" label="Assets" icon={Database} />
            <NavButton id="analysis" label="AI Analysis" icon={BarChart3} />
          </>
        )}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-zinc-900 bg-zinc-950/50 backdrop-blur">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 ${isAdmin ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-yellow-500/10 border-yellow-500 text-yellow-500'}`}>
            {user?.name?.[0] || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.name || "User"}</p>
            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 border-zinc-700 text-zinc-500">
              {isAdmin ? "ADMIN" : "PRO"}
            </Badge>
          </div>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-zinc-800"
            onClick={toggleTheme}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-zinc-800 hover:bg-red-950/30 hover:border-red-900 hover:text-red-500 transition-colors h-9"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" /> Log out
        </Button>
      </div>
    </aside>
  );
}
