import { useState } from "react";
import { 
  Calendar, Clock, AlertTriangle, CheckCircle2, 
  MoreHorizontal, Users, MapPin, ArrowRight, Wand2,
  FileText, Briefcase, Camera, Sparkles, Sun, Moon,
  Download, Pencil, X
} from "lucide-react";
import { MOCK_PROJECT } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// --- 1. INITIAL "MESSY" DATA (Before AI) ---
// Notice: Day 1 has a "Forest" scene (Conflict) which creates a company move.
const INITIAL_SCHEDULE = [
  {
    day: 1,
    location: "VFX Soundstage 01",
    theme: "Cosmic & Divine",
    weather: "Indoor (Controlled)",
    scenes: ["scene-1", "scene-8", "scene-5"], // ⚠️ SCENE 5 IS FOREST (CONFLICT)
    crew_call: "07:00 AM",
    shoot_start: "09:00 AM",
    resources: { cast: ["Krishna", "Arjuna", "Pandavas"], vfx: "Heavy", props: "Peacock Feather" },
    conflict: true 
  },
  {
    day: 2,
    location: "Hastinapura Palace Set",
    theme: "Royal Court Drama",
    weather: "Sunny / Indoor",
    scenes: ["scene-2", "scene-4"],
    crew_call: "06:30 AM",
    shoot_start: "08:30 AM",
    resources: { cast: ["Draupadi", "Duryodhana", "Arjuna"], vfx: "Moderate", props: "Golden Dice, Thrones" },
    conflict: false
  },
  {
    day: 3,
    location: "Forest Location (Karnataka)",
    theme: "Exile & Training",
    weather: "Overcast",
    scenes: ["scene-3"], // ⚠️ MISSING SCENE 5
    crew_call: "05:00 AM (Travel)",
    shoot_start: "10:00 AM",
    resources: { cast: ["Pandavas", "Duryodhana"], vfx: "Light", props: "Bows, Simple Robes" },
    conflict: false
  },
  {
    day: 4,
    location: "Backlot Battlefield",
    theme: "Kurukshetra War",
    weather: "Clear Sky",
    scenes: ["scene-7"],
    crew_call: "04:00 AM (Extras Prep)",
    shoot_start: "07:00 AM",
    resources: { cast: ["All Main Cast", "500 Extras"], vfx: "Heavy (Crowd)", props: "Chariots, Weapons" },
    conflict: false
  }
];

export function AIScheduling() {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  
  // Edit State
  const [editingDay, setEditingDay] = useState<any>(null);

  // --- ACTIONS ---

  // 1. AI OPTIMIZATION (Moves Scene 5 to Day 3)
  const handleOptimize = () => {
    setIsOptimizing(true);
    toast({ title: "AI Re-Grouping", description: "Consolidating location moves..." });
    
    setTimeout(() => {
      const optimized = schedule.map(day => {
        if (day.day === 1) {
            // Remove Scene 5 from Day 1
            return { 
                ...day, 
                scenes: ["scene-1", "scene-8", "scene-6"], // Replaced 5 with 6 (Correct)
                conflict: false,
                resources: { ...day.resources, cast: ["Krishna", "Arjuna"] } // Removed Pandavas
            }; 
        }
        if (day.day === 3) {
            // Add Scene 5 to Day 3 (Forest)
            return { ...day, scenes: ["scene-3", "scene-5"] }; 
        }
        return day;
      });

      setSchedule(optimized);
      setIsOptimizing(false);
      toast({ 
          title: "Schedule Compacted", 
          description: "Moved 'Scene 5' to Day 3. Saved 4 hours of travel time.",
          action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
      });
    }, 1500);
  };

  // 2. EXPORT FUNCTION
  const handleExport = () => {
      toast({ title: "Generating PDF...", description: "Compiling call sheets for all departments." });
      setTimeout(() => {
          toast({ title: "Export Complete", description: "Call_Sheets_Master.pdf downloaded." });
      }, 1500);
  };

  // 3. EDIT FUNCTION
  const handleSaveEdit = () => {
      setSchedule(schedule.map(d => d.day === editingDay.day ? editingDay : d));
      setEditingDay(null);
      toast({ title: "Changes Saved", description: `Day ${editingDay.day} details updated.` });
  };

  const activeDayData = schedule.find(d => d.day === selectedDay);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Production Stripboard</h1>
          <p className="text-muted-foreground">Detailed Logistics for <span className="text-primary font-bold">{MOCK_PROJECT.script.title}</span></p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-zinc-700 text-zinc-300" onClick={handleExport}>
             <Download className="mr-2 h-4 w-4" /> Export Call Sheets
          </Button>
          <Button onClick={handleOptimize} disabled={isOptimizing} className="bg-primary text-black hover:bg-primary/90">
             {isOptimizing ? <Clock className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4"/>}
             AI Smart-Group
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT: THE STRIPBOARD (Day Selector) */}
        <div className="lg:col-span-4 space-y-4">
           <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-bold text-zinc-400 uppercase tracking-wider">Shooting Schedule</span>
              <span className="text-primary text-xs">4 Days / {schedule.reduce((acc, d) => acc + d.scenes.length, 0)} Scenes</span>
           </div>
           
           <div className="space-y-3">
             {schedule.map((day) => (
               <div 
                 key={day.day}
                 onClick={() => setSelectedDay(day.day)}
                 className={cn(
                   "cursor-pointer p-4 rounded-xl border transition-all relative overflow-hidden group",
                   selectedDay === day.day 
                     ? "bg-zinc-900 border-primary shadow-lg shadow-primary/10" 
                     : "bg-zinc-950/50 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-600",
                   day.conflict && "border-red-500/50 bg-red-950/10"
                 )}
               >
                 {/* Status Bar */}
                 <div className={cn("absolute left-0 top-0 bottom-0 w-1", selectedDay === day.day ? "bg-primary" : "bg-zinc-800")} />
                 
                 <div className="flex justify-between items-start pl-3">
                    <div>
                      <h3 className={cn("font-bold text-sm", selectedDay === day.day ? "text-white" : "text-zinc-400")}>
                        DAY {day.day} : {day.location}
                      </h3>
                      <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                        <Briefcase className="w-3 h-3" /> {day.scenes.length} Scenes
                        <span className="text-zinc-700">|</span>
                        {day.scenes.includes("scene-7") ? "WAR SCENE" : day.theme}
                      </p>
                    </div>
                    {day.conflict && (
                       <Badge className="bg-red-500 text-white border-red-500 animate-pulse text-[10px]">CONFLICT</Badge>
                    )}
                 </div>
               </div>
             ))}
           </div>

           {/* AI Efficiency Note */}
           <Card className="bg-emerald-950/30 border-emerald-900/50 mt-6">
             <CardContent className="p-4 flex gap-3">
               <Sparkles className="w-5 h-5 text-emerald-500 shrink-0" />
               <div className="space-y-1">
                 <h4 className="text-sm font-bold text-emerald-400">AI Logic: Location Clustering</h4>
                 <p className="text-xs text-emerald-200/60 leading-relaxed">
                   AI analyzes scene headings (INT/EXT) to group locations. Merging "Palace" days saves approx $15,000 in setup costs.
                 </p>
               </div>
             </CardContent>
           </Card>
        </div>

        {/* RIGHT: DETAILED DAY VIEW */}
        <div className="lg:col-span-8">
           {activeDayData && (
             <Card className="h-full border-zinc-800 bg-black/40 backdrop-blur">
               <CardHeader className="border-b border-white/5 pb-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <CardTitle className="text-2xl font-display tracking-wide flex items-center gap-3">
                       DAY {activeDayData.day} <span className="text-zinc-600">|</span> {activeDayData.location}
                     </CardTitle>
                     <CardDescription className="mt-2 flex gap-4 text-zinc-400">
                        <span className="flex items-center gap-1"><Sun className="w-4 h-4 text-amber-500" /> {activeDayData.weather}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-500" /> Crew Call: {activeDayData.crew_call}</span>
                     </CardDescription>
                   </div>
                   <div className="text-right flex flex-col items-end gap-2">
                     <Button size="sm" variant="outline" className="h-8 border-zinc-700" onClick={() => setEditingDay(activeDayData)}>
                        <Pencil className="w-3 h-3 mr-2"/> Edit Day
                     </Button>
                     <div className="text-xs font-mono text-zinc-500 uppercase mt-1">Est. Wraptime: 07:30 PM</div>
                   </div>
                 </div>
               </CardHeader>

               <CardContent className="p-0">
                 <Tabs defaultValue="schedule" className="w-full">
                   <div className="p-4 border-b border-white/5">
                     <TabsList className="bg-zinc-900 border border-zinc-800">
                       <TabsTrigger value="schedule">Shooting Blocks</TabsTrigger>
                       <TabsTrigger value="resources">Requirements</TabsTrigger>
                       <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
                     </TabsList>
                   </div>

                   {/* TAB 1: SCHEDULE BLOCKS */}
                   <TabsContent value="schedule" className="p-6 space-y-6">
                      <div className="relative border-l-2 border-zinc-800 ml-3 space-y-8">
                        {activeDayData.scenes.map((sceneId, idx) => {
                          const scene = MOCK_PROJECT.script.scenes.find(s => s.id === sceneId);
                          if (!scene) return null;
                          return (
                            <div key={sceneId} className="relative pl-8">
                              {/* Timeline Dot */}
                              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-primary"></div>
                              
                              <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                                <div className="flex justify-between mb-2">
                                  <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                    SCENE {scene.number}
                                  </Badge>
                                  <span className="text-xs font-mono text-zinc-500">
                                    {idx === 0 ? "09:00 AM - 01:00 PM" : "02:00 PM - 06:00 PM"}
                                  </span>
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">{scene.title}</h4>
                                <p className="text-sm text-zinc-400 line-clamp-2">{scene.text}</p>
                                
                                {/* Technical Specs Tag */}
                                <div className="mt-3 flex gap-2">
                                  <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-[10px]">
                                    <Camera className="w-3 h-3 mr-1" /> {scene.analysis?.camera || "Standard"}
                                  </Badge>
                                  <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 text-[10px]">
                                    <Sparkles className="w-3 h-3 mr-1" /> VFX: {idx === 0 ? "Heavy" : "Light"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        
                        {/* Lunch Break */}
                        <div className="relative pl-8">
                           <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-zinc-700"></div>
                           <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                             01:00 PM - 02:00 PM • Catered Lunch (Set B)
                           </div>
                        </div>
                      </div>
                   </TabsContent>

                   {/* TAB 2: RESOURCES */}
                   <TabsContent value="resources" className="p-6">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                           <h4 className="text-sm font-bold text-zinc-400 uppercase mb-3 flex items-center gap-2"><Users className="w-4 h-4" /> Cast Call</h4>
                           <ul className="space-y-2">
                              {activeDayData.resources.cast.map(c => (
                                <li key={c} className="text-sm text-white flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-primary"></div> {c}
                                </li>
                              ))}
                           </ul>
                        </div>
                        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                           <h4 className="text-sm font-bold text-zinc-400 uppercase mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Department Needs</h4>
                           <div className="space-y-3 text-sm">
                             <div className="flex justify-between border-b border-zinc-800 pb-2">
                               <span className="text-zinc-500">Props</span>
                               <span className="text-white text-right">{activeDayData.resources.props}</span>
                             </div>
                             <div className="flex justify-between border-b border-zinc-800 pb-2">
                               <span className="text-zinc-500">VFX Supervision</span>
                               <span className="text-white text-right">{activeDayData.resources.vfx}</span>
                             </div>
                             <div className="flex justify-between">
                               <span className="text-zinc-500">Safety</span>
                               <span className="text-white text-right">{activeDayData.scenes.includes("scene-7") ? "Stunt Coordinator Reqd" : "Standard"}</span>
                             </div>
                           </div>
                        </div>
                     </div>
                   </TabsContent>

                   {/* TAB 3: RISKS */}
                   <TabsContent value="risks" className="p-6">
                      <div className="p-4 border border-amber-900/50 bg-amber-950/20 rounded-lg">
                        <h4 className="text-amber-500 font-bold flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5" /> Potential Bottlenecks
                        </h4>
                        <p className="text-sm text-amber-200/70 mb-4">
                           Based on the complexity of <strong>{activeDayData.resources.vfx}</strong> VFX requirements, AI predicts a 20% chance of overtime if setup isn't completed by 10:00 AM.
                        </p>
                        <Button size="sm" variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-900">
                          Add Buffer Time (+1 Hr)
                        </Button>
                      </div>
                   </TabsContent>
                 </Tabs>
               </CardContent>
             </Card>
           )}
        </div>
      </div>

      {/* EDIT MODAL */}
      <Dialog open={!!editingDay} onOpenChange={() => setEditingDay(null)}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader><DialogTitle>Edit Day {editingDay?.day} Logistics</DialogTitle></DialogHeader>
            {editingDay && (
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-zinc-500 uppercase">Location</span>
                        <Input 
                            value={editingDay.location} 
                            onChange={(e) => setEditingDay({...editingDay, location: e.target.value})} 
                            className="bg-zinc-900 border-zinc-800"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-zinc-500 uppercase">Crew Call</span>
                            <Input 
                                value={editingDay.crew_call} 
                                onChange={(e) => setEditingDay({...editingDay, crew_call: e.target.value})} 
                                className="bg-zinc-900 border-zinc-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-zinc-500 uppercase">Weather</span>
                            <Input 
                                value={editingDay.weather} 
                                onChange={(e) => setEditingDay({...editingDay, weather: e.target.value})} 
                                className="bg-zinc-900 border-zinc-800"
                            />
                        </div>
                    </div>
                </div>
            )}
            <DialogFooter>
                <Button variant="ghost" onClick={() => setEditingDay(null)}>Cancel</Button>
                <Button onClick={handleSaveEdit} className="bg-white text-black hover:bg-zinc-200">Save Changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}