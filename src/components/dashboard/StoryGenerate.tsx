import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  TrendingUp,
  Film,
  Clapperboard,
  Instagram,
  Youtube,
  History,
  Search,
  Loader2, // Import Loader
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; // Import Toast for errors

const storyTypes = [
  { id: "crime", label: "Crime", icon: Search },
  { id: "vintage", label: "Vintage", icon: History },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "social", label: "Social Media", icon: Instagram },
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "short", label: "Short Film", icon: Clapperboard },
  { id: "feature", label: "Feature Film", icon: Film },
];

export function StoryGenerate() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedType, setSelectedType] = useState<string>("trending");
  const [idea, setIdea] = useState("");
  const [generatedStory, setGeneratedStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null); // Store ID for navigation

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setIsLoading(true);
    setGeneratedStory(null); // Clear previous

    try {
      // 1. Call your Backend API
      const response = await fetch("http://localhost:5000/api/projects/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          genre: selectedType, // Pass selected category as Genre
          idea: idea,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate story");

      const project = await response.json();
      setProjectId(project._id); // Save ID for the "Build Script" button

      // 2. Format the JSON response into a readable string for your UI
      const formattedStory = `**Title:** ${project.title}

**Genre:** ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}

**Synopsis / Scenes:**
${project.scenes.map((s: any, i: number) => `${i + 1}. ${s.title}\n   "${s.text}"`).join("\n\n")}

**Visual Style:** ${project.scenes[0]?.analysis?.mood || "Cinematic"}
**Estimated Scenes:** ${project.scenes.length}`;

      setGeneratedStory(formattedStory);
      toast({ title: "Story Generated!", description: "Your concept is ready." });

    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "AI could not generate the story. Try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuildScript = () => {
    if (projectId) {
      navigate(`/project/${projectId}`); // Redirect to Studio View
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl tracking-wide text-foreground">
          Story Generate
        </h1>
        <p className="mt-2 text-muted-foreground">
          Perfect for beginners — AI guidance to create compelling narratives
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Story Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="cinema-card p-6 lg:col-span-2"
        >
          <h3 className="font-display text-lg tracking-wide text-foreground">
            Story Type
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose the format and style of your story
          </p>

          <div className="mt-4 space-y-2">
            {storyTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-xl border p-3 transition-all",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-secondary hover:border-primary/30 hover:bg-cinema-hover"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                      isSelected ? "bg-primary/20" : "bg-muted"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isSelected
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors",
                      isSelected
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Idea Input & Generation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 lg:col-span-3"
        >
          {/* Idea Input */}
          <div className="cinema-card p-6">
            <h3 className="font-display text-lg tracking-wide text-foreground">
              Your Idea
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Describe your story concept, theme, or any starting point
            </p>

            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="E.g., A detective in a small town discovers that the local legend about disappearing children is more than just a myth..."
              className="mt-4 min-h-[140px] resize-none border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            />

            <button
              onClick={handleGenerate}
              disabled={!idea.trim() || isLoading}
              className={cn(
                "mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-medium transition-all",
                idea.trim() && !isLoading
                  ? "bg-primary text-primary-foreground cinema-glow hover:bg-primary/90"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Generate Story
                </>
              )}
            </button>
          </div>

          {/* Generated Story */}
          {generatedStory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="cinema-card p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg tracking-wide text-foreground">
                  Generated Story
                </h3>
                <div className="flex gap-2">
                  <button className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-cinema-hover">
                    Edit
                  </button>
                  <button 
                    onClick={handleBuildScript}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Build Script
                  </button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap rounded-xl bg-cinema-dark p-4 text-sm text-foreground">
                  {generatedStory}
                </pre>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}