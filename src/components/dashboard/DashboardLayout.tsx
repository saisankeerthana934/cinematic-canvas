import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHome } from "./DashboardHome";
import { UploadScript } from "./UploadScript";
import { StoryGenerate } from "./StoryGenerate";
import { DirectorAssets } from "./DirectorAssets";


// 👇 CHANGED: Removed SceneAnalysis, Added SceneBreakdown
import { SceneBreakdown } from "./SceneBreakdown"; 
import { AIAnalysis } from "./AIAnalysis";
import { ProductionHub } from "./ProductionHub";
import { BudgetPlanning } from "./BudgetPlanning";
import { AIScheduling } from "./AIScheduling";
import { PitchDeck } from "./PitchDeck";
import { AdminDashboard } from "./AdminDashboard";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function DashboardLayout() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const [activeView, setActiveView] = useState(() => {
    return isAdmin ? "admin-dashboard" : "dashboard";
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Reset view when role changes
    setActiveView(isAdmin ? "admin-dashboard" : "dashboard");
  }, [isAdmin]);

  const renderContent = () => {
    // Admin views
    if (isAdmin) {
      switch (activeView) {
        case "admin-dashboard":
        case "admin-directors":
        case "admin-projects":
          return <AdminDashboard />;
        default:
          return <ComingSoon title={activeView} />;
      }
    }

    // Director views
    switch (activeView) {
      case "dashboard":
        return <DashboardHome onNavigate={setActiveView} />;
      case "upload":
        return <UploadScript onNavigate={setActiveView} />;
      case "generate":
        return <StoryGenerate />;
        case "analysis":
           return <AIAnalysis />;
        case "assets":
           return <DirectorAssets />;

           case "visual":
            return <SceneBreakdown />;
          

      // 👇 THIS WAS THE FIX: Points to your new Mahabharata page
      case "scenes":
        return <SceneBreakdown />; 
        
      case "production":
        return <ProductionHub />;
      case "budget":
        return <BudgetPlanning />;
      case "schedule":
        return <AIScheduling />;
      case "pitch":
        return <PitchDeck />;
      default:
        return <ComingSoon title={activeView} />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="flex-1 pl-16 lg:pl-64 transition-all duration-300">
        <div className="mx-auto max-w-7xl p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[60vh] flex-col items-center justify-center text-center"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Construction className="h-10 w-10 text-primary" />
      </div>
      <h2 className="mt-6 font-display text-2xl capitalize tracking-wide text-foreground">
        {title.replace("-", " ")}
      </h2>
      <p className="mt-2 text-muted-foreground">
        This section is coming soon. Stay tuned for updates!
      </p>
    </motion.div>
  );
}
