import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Edit,
  Sparkles,
  Users,
  Camera,
  Sun,
  Lightbulb,
  BarChart3,
  ChevronRight,
  Pencil,
  Image,
  Video,
  Volume2,
  Heart,
  TrendingUp,
  Upload,
  Check,
  Wand2,
  Clapperboard,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Scene {
  id: string;
  number: number;
  title: string;
  description: string;
  actors: string[];
  location: string;
  timeOfDay: "day" | "night" | "dusk" | "dawn";
  duration: string;
  status: "draft" | "sketch" | "previsual" | "video" | "approved";
  aiScore: number;
  audienceBeats: number;
  storyBeats: number;
  sketchUrl?: string;
  previsualUrl?: string;
  videoUrl?: string;
}

interface Character {
  id: string;
  name: string;
  actor: string;
  photoUrl?: string;
}

const mockScenes: Scene[] = [
  {
    id: "1",
    number: 1,
    title: "Marcus Receives the Letter",
    description: "INT. MARCUS'S APARTMENT - NIGHT. The retired detective sits alone, surrounded by old case files. A mysterious envelope arrives.",
    actors: ["Marcus Chen", "Delivery Person"],
    location: "Marcus's Apartment",
    timeOfDay: "night",
    duration: "3:45",
    status: "approved",
    aiScore: 92,
    audienceBeats: 85,
    storyBeats: 88,
  },
  {
    id: "2",
    number: 2,
    title: "Flashback - The Original Crime",
    description: "EXT. ABANDONED WAREHOUSE - NIGHT (20 YEARS AGO). Young Marcus discovers the body that would haunt his career.",
    actors: ["Young Marcus", "Partner", "Forensics Team"],
    location: "Abandoned Warehouse",
    timeOfDay: "night",
    duration: "5:20",
    status: "previsual",
    aiScore: 85,
    audienceBeats: 78,
    storyBeats: 92,
  },
  {
    id: "3",
    number: 3,
    title: "Meeting the Witness",
    description: "EXT. COFFEE SHOP - DAY. Marcus meets Sarah, the anonymous sender of the letter, who reveals shocking information.",
    actors: ["Marcus Chen", "Sarah Miller"],
    location: "Downtown Coffee Shop",
    timeOfDay: "day",
    duration: "4:15",
    status: "sketch",
    aiScore: 78,
    audienceBeats: 82,
    storyBeats: 75,
  },
  {
    id: "4",
    number: 4,
    title: "The Investigation Begins",
    description: "INT. POLICE STATION - DAY. Marcus returns to his old workplace, seeking answers from former colleagues.",
    actors: ["Marcus Chen", "Captain Rivera"],
    location: "Police Station",
    timeOfDay: "day",
    duration: "6:00",
    status: "draft",
    aiScore: 70,
    audienceBeats: 65,
    storyBeats: 80,
  },
];

const mockCharacters: Character[] = [
  { id: "1", name: "Marcus Chen", actor: "Lead Actor" },
  { id: "2", name: "Sarah Miller", actor: "Supporting" },
  { id: "3", name: "Captain Rivera", actor: "Supporting" },
  { id: "4", name: "Young Marcus", actor: "Flashback" },
];

const actionTypes = [
  { id: "dramatic", label: "Dramatic" },
  { id: "action", label: "Action" },
  { id: "dialogue", label: "Dialogue" },
  { id: "suspense", label: "Suspense" },
  { id: "emotional", label: "Emotional" },
];

const statusColors = {
  draft: "text-muted-foreground",
  sketch: "text-cinema-warning",
  previsual: "text-cinema-info",
  video: "text-primary",
  approved: "text-cinema-success",
};

const statusLabels = {
  draft: "Draft",
  sketch: "Sketch",
  previsual: "Pre-Visual",
  video: "Video Ready",
  approved: "Approved",
};

export function SceneAnalysis() {
  const [selectedScene, setSelectedScene] = useState<Scene | null>(mockScenes[0]);
  const [activeTab, setActiveTab] = useState<"breakdown" | "characters" | "analysis">("breakdown");
  const [characters, setCharacters] = useState<Character[]>(mockCharacters);
  const [selectedAction, setSelectedAction] = useState("dramatic");
  const [includeAudio, setIncludeAudio] = useState(true);

  const beatsData = selectedScene ? [
    { name: "Audience", value: selectedScene.audienceBeats, fill: "hsl(var(--primary))" },
    { name: "Story", value: selectedScene.storyBeats, fill: "hsl(var(--cinema-info))" },
  ] : [];

  const sceneImpactData = mockScenes.map((s) => ({
    name: `S${s.number}`,
    audience: s.audienceBeats,
    story: s.storyBeats,
  }));

  const handleCharacterPhotoUpload = (characterId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCharacters((prev) =>
        prev.map((c) => (c.id === characterId ? { ...c, photoUrl: url } : c))
      );
    }
  };

  const handleGenerateSketch = (sceneId: string) => {
    // Mock sketch generation
    console.log("Generating sketch for scene:", sceneId);
  };

  const handleGeneratePrevisual = (sceneId: string) => {
    // Mock pre-visual generation
    console.log("Generating pre-visual for scene:", sceneId);
  };

  const handleGenerateVideo = () => {
    // Mock video generation
    console.log("Generating full video with settings:", { action: selectedAction, audio: includeAudio });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl tracking-wide text-foreground">
            Scene Analysis
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sketch → Pre-Visual → AI Video with direction effects
          </p>
        </div>
        <button
          onClick={handleGenerateVideo}
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-all cinema-glow hover:bg-primary/90"
        >
          <Video className="h-5 w-5" />
          Generate AI Shortfilm
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 rounded-xl bg-secondary p-1">
        {[
          { id: "breakdown", label: "Scene Breakdown", icon: Clapperboard },
          { id: "characters", label: "Character Pre-visuals", icon: Users },
          { id: "analysis", label: "AI Analysis", icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "breakdown" && (
          <motion.div
            key="breakdown"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {/* Scene List */}
            <div className="cinema-card p-4 lg:col-span-1">
              <h3 className="mb-4 px-2 font-display text-lg tracking-wide text-foreground">
                Scenes
              </h3>
              <div className="space-y-2">
                {mockScenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene)}
                    className={cn(
                      "group flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all",
                      selectedScene?.id === scene.id
                        ? "bg-primary/10 border border-primary/30"
                        : "hover:bg-cinema-hover"
                    )}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted font-display text-lg">
                      {scene.number}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {scene.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{scene.duration}</span>
                        <span>•</span>
                        <span className={cn("capitalize", statusColors[scene.status])}>
                          {statusLabels[scene.status]}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            {/* Scene Details */}
            {selectedScene && (
              <div className="space-y-6 lg:col-span-2">
                {/* Preview Card */}
                <div className="cinema-card overflow-hidden">
                  <div className="relative aspect-video bg-cinema-dark">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 transition-colors hover:bg-primary/30 cursor-pointer">
                          <Play className="h-8 w-8 text-primary ml-1" />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                          {selectedScene.status === "draft" ? "Generate Sketch First" : "AI Preview Available"}
                        </p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="rounded-lg bg-cinema-dark/80 px-3 py-1.5 backdrop-blur-sm">
                        <span className="font-display text-sm text-foreground">
                          Scene {selectedScene.number}
                        </span>
                      </div>
                      <div className={cn(
                        "rounded-lg px-3 py-1.5 backdrop-blur-sm",
                        selectedScene.status === "approved" ? "bg-cinema-success/20" : "bg-cinema-dark/80"
                      )}>
                        <span className={cn("text-sm", statusColors[selectedScene.status])}>
                          {statusLabels[selectedScene.status]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-xl tracking-wide text-foreground">
                          {selectedScene.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {selectedScene.description}
                        </p>
                      </div>
                      <button className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-cinema-hover">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Generation Pipeline */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleGenerateSketch(selectedScene.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                          selectedScene.status !== "draft"
                            ? "border-cinema-warning/50 bg-cinema-warning/10"
                            : "border-border bg-secondary hover:border-primary/30"
                        )}
                      >
                        <Pencil className={cn(
                          "h-6 w-6",
                          selectedScene.status !== "draft" ? "text-cinema-warning" : "text-muted-foreground"
                        )} />
                        <span className="text-xs font-medium text-foreground">Generate Sketch</span>
                        {selectedScene.status !== "draft" && (
                          <Check className="h-4 w-4 text-cinema-warning" />
                        )}
                      </button>

                      <button
                        onClick={() => handleGeneratePrevisual(selectedScene.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                          selectedScene.status === "previsual" || selectedScene.status === "video" || selectedScene.status === "approved"
                            ? "border-cinema-info/50 bg-cinema-info/10"
                            : "border-border bg-secondary hover:border-primary/30"
                        )}
                      >
                        <Image className={cn(
                          "h-6 w-6",
                          selectedScene.status === "previsual" || selectedScene.status === "video" || selectedScene.status === "approved"
                            ? "text-cinema-info"
                            : "text-muted-foreground"
                        )} />
                        <span className="text-xs font-medium text-foreground">Pre-Visual</span>
                        {(selectedScene.status === "previsual" || selectedScene.status === "video" || selectedScene.status === "approved") && (
                          <Check className="h-4 w-4 text-cinema-info" />
                        )}
                      </button>

                      <button
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
                          selectedScene.status === "video" || selectedScene.status === "approved"
                            ? "border-primary/50 bg-primary/10"
                            : "border-border bg-secondary hover:border-primary/30"
                        )}
                      >
                        <Video className={cn(
                          "h-6 w-6",
                          selectedScene.status === "video" || selectedScene.status === "approved"
                            ? "text-primary"
                            : "text-muted-foreground"
                        )} />
                        <span className="text-xs font-medium text-foreground">AI Video</span>
                        {(selectedScene.status === "video" || selectedScene.status === "approved") && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    </div>

                    {/* Scene Meta */}
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="rounded-xl bg-secondary p-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="text-xs">Actors</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          {selectedScene.actors.length} people
                        </p>
                      </div>
                      <div className="rounded-xl bg-secondary p-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Camera className="h-4 w-4" />
                          <span className="text-xs">Location</span>
                        </div>
                        <p className="mt-1 truncate text-sm font-medium text-foreground">
                          {selectedScene.location}
                        </p>
                      </div>
                      <div className="rounded-xl bg-secondary p-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          <span className="text-xs">Audience Beats</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {selectedScene.audienceBeats}%
                        </p>
                      </div>
                      <div className="rounded-xl bg-secondary p-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs">Story Beats</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-cinema-info">
                          {selectedScene.storyBeats}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Type & Audio Settings */}
                <div className="cinema-card p-6">
                  <h3 className="font-display text-lg tracking-wide text-foreground">
                    Video Settings
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Action Type</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {actionTypes.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => setSelectedAction(action.id)}
                            className={cn(
                              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                              selectedAction === action.id
                                ? "bg-primary text-primary-foreground"
                                : "border border-border bg-secondary text-secondary-foreground hover:bg-cinema-hover"
                            )}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIncludeAudio(!includeAudio)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border px-4 py-3 transition-all",
                          includeAudio
                            ? "border-primary bg-primary/10"
                            : "border-border bg-secondary"
                        )}
                      >
                        <Volume2 className={cn(
                          "h-5 w-5",
                          includeAudio ? "text-primary" : "text-muted-foreground"
                        )} />
                        <span className="text-sm font-medium text-foreground">
                          Include Audio Dialogue
                        </span>
                        {includeAudio && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="cinema-card p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-lg tracking-wide text-foreground">
                      AI Recommendations
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-cinema-info/10 p-4">
                      <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-cinema-info" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Lighting Suggestion
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Consider using low-key lighting with a single source to enhance the mysterious atmosphere. A practical lamp on the desk could serve as the key light.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-primary/10 p-4">
                      <Camera className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Camera Angle
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          A high angle establishing shot transitioning to a close-up on Marcus's face would effectively convey his isolation and the weight of the past.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-xl bg-cinema-warning/10 p-4">
                      <Eye className="mt-0.5 h-5 w-5 flex-shrink-0 text-cinema-warning" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Direction Mode
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Use slow dolly movement to build tension. The pacing should mirror Marcus's internal conflict—hesitant but purposeful.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "characters" && (
          <motion.div
            key="characters"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="cinema-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg tracking-wide text-foreground">
                    Character Pre-Visuals
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Upload character photos to create AI-powered pre-visualizations
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    className="rounded-xl border border-border bg-secondary p-4"
                  >
                    <div className="relative mb-4">
                      {character.photoUrl ? (
                        <img
                          src={character.photoUrl}
                          alt={character.name}
                          className="aspect-square w-full rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex aspect-square w-full items-center justify-center rounded-xl bg-muted">
                          <Users className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <label className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                        <Upload className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCharacterPhotoUpload(character.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <h4 className="font-medium text-foreground">{character.name}</h4>
                    <p className="text-sm text-muted-foreground">{character.actor}</p>
                    {character.photoUrl && (
                      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                        <Wand2 className="h-4 w-4" />
                        Generate Pre-visual
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "analysis" && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* Beats Analysis */}
            <div className="cinema-card p-6">
              <h3 className="font-display text-lg tracking-wide text-foreground">
                Scene Impact Analysis
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Audience & Story Beats across all scenes
              </p>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sceneImpactData}>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.75rem",
                      }}
                    />
                    <Bar dataKey="audience" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="story" fill="hsl(var(--cinema-info))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Audience Beats</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-cinema-info" />
                  <span className="text-sm text-muted-foreground">Story Beats</span>
                </div>
              </div>
            </div>

            {/* Selected Scene Beats */}
            {selectedScene && (
              <div className="cinema-card p-6">
                <h3 className="font-display text-lg tracking-wide text-foreground">
                  Scene {selectedScene.number} - Beat Distribution
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedScene.title}
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="h-64 w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={beatsData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {beatsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.75rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/10 p-4 text-center">
                    <p className="font-display text-3xl text-primary">{selectedScene.audienceBeats}%</p>
                    <p className="text-sm text-muted-foreground">Audience Beats</p>
                  </div>
                  <div className="rounded-xl bg-cinema-info/10 p-4 text-center">
                    <p className="font-display text-3xl text-cinema-info">{selectedScene.storyBeats}%</p>
                    <p className="text-sm text-muted-foreground">Story Beats</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Analysis Summary */}
            <div className="cinema-card p-6 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-display text-lg tracking-wide text-foreground">
                  AI Direction Recommendations
                </h3>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-secondary p-4">
                  <Camera className="mb-2 h-6 w-6 text-primary" />
                  <h4 className="font-medium text-foreground">Camera Work</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Mix of steady medium shots with occasional handheld for tension scenes. Use Dutch angles sparingly for disorientation.
                  </p>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <Lightbulb className="mb-2 h-6 w-6 text-cinema-warning" />
                  <h4 className="font-medium text-foreground">Lighting Design</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Chiaroscuro style for night scenes. Natural motivated lighting for day exteriors with subtle fill.
                  </p>
                </div>
                <div className="rounded-xl bg-secondary p-4">
                  <Volume2 className="mb-2 h-6 w-6 text-cinema-info" />
                  <h4 className="font-medium text-foreground">Audio Design</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ambient tension builds with subtle drones. Dialogue should be crisp with room tone matching each location.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
