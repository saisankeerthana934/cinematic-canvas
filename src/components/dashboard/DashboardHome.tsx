import { motion } from "framer-motion";
import { Upload, Sparkles, Film, ArrowRight } from "lucide-react";

interface DashboardHomeProps {
  onNavigate: (view: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const actionCards = [
    {
      id: "upload",
      icon: Upload,
      title: "Upload Script",
      description: "Import your screenplay and let AI analyze scenes, characters, and production needs",
      gradient: "from-primary/20 to-accent/10",
    },
    {
      id: "generate",
      icon: Sparkles,
      title: "Story Generate",
      description: "Create compelling stories with AI guidance - perfect for beginners and professionals",
      gradient: "from-cinema-info/20 to-primary/10",
    },
    {
      id: "scenes",
      icon: Film,
      title: "Scene Analysis",
      description: "Sketch → Pre-visual → AI Video. Full analysis with audience beats and direction recommendations",
      gradient: "from-cinema-success/20 to-cinema-info/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-cinema-surface p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="relative z-10">
          <h1 className="font-display text-4xl tracking-wide text-foreground md:text-5xl">
            Welcome to <span className="gold-text">CineIntent</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Your AI-powered film production dashboard. From script to AI shortfilm, 
            with scene sketches, pre-visuals, character integration, and intelligent 
            direction recommendations.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => onNavigate("upload")}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-all hover:bg-primary/90 cinema-glow"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate("generate")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-5 py-2.5 font-medium text-secondary-foreground transition-all hover:bg-cinema-hover"
            >
              Generate Story
            </button>
          </div>
        </div>
      </motion.div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {actionCards.map((card, index) => (
          <motion.button
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onNavigate(card.id)}
            className="cinema-card group p-6 text-left transition-all hover:scale-[1.02]"
          >
            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient}`}>
              <card.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-display text-xl tracking-wide text-foreground">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {card.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open
              <ArrowRight className="h-4 w-4" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 md:grid-cols-4"
      >
        {[
          { label: "Active Projects", value: "3", change: "+1 this week" },
          { label: "Scenes Analyzed", value: "127", change: "AI processed" },
          { label: "Team Members", value: "12", change: "Across projects" },
          { label: "Budget Tracked", value: "$2.4M", change: "Total allocated" },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card/50 p-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 font-display text-2xl text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
