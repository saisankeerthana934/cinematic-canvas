import { useState } from "react";
import { 
  TrendingUp, Activity, Users, BrainCircuit, 
  AlertTriangle, Info, Sparkles, PlayCircle, 
  BarChart3, List, Heart, CircleDot
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const SCENE_BEATS = [
  { id: 1, time: "00:00", name: "The Setup", storyVal: 20, engageVal: 40, desc: "Introduction of the Kuru Princes.", type: "Exposition" },
  { id: 2, time: "15:00", name: "The Dice Game", storyVal: 45, engageVal: 90, desc: "High tension. Shakuni cheats.", type: "Inciting Incident" },
  { id: 3, time: "30:00", name: "Draupadi's Vow", storyVal: 60, engageVal: 95, desc: "Emotional peak. The humiliation.", type: "Plot Point 1" },
  { id: 4, time: "45:00", name: "The Exile Begins", storyVal: 30, engageVal: 40, desc: "Slow pacing. Character development.", type: "Midpoint Lull" },
  { id: 5, time: "60:00", name: "Arjuna's Penance", storyVal: 50, engageVal: 65, desc: "Visual spectacle. Gaining the Pashupatastra.", type: "Rising Action" },
  { id: 6, time: "75:00", name: "The War Declaration", storyVal: 75, engageVal: 85, desc: "Krishna's peace mission fails.", type: "All Hope Lost" },
  { id: 7, time: "90:00", name: "Gita Upadesha", storyVal: 80, engageVal: 70, desc: "Philosophical depth. Pace slows.", type: "Theme Stated" },
  { id: 8, time: "105:00", name: "The War (Kurukshetra)", storyVal: 100, engageVal: 100, desc: "Action climax. Karna vs Arjuna.", type: "Climax" },
];

// Exact positions for the circle nodes
const HARMON_STEPS = [
  { id: 1, label: "YOU", desc: "A character is in a zone of comfort", pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", color: "bg-blue-500" },
  { id: 2, label: "NEED", desc: "But they want something", pos: "top-[14%] right-[14%] -translate-y-1/2 translate-x-1/2", color: "bg-purple-500" },
  { id: 3, label: "GO", desc: "They enter an unfamiliar situation", pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2", color: "bg-pink-500" },
  { id: 4, label: "SEARCH", desc: "Adapt to it", pos: "bottom-[14%] right-[14%] translate-y-1/2 translate-x-1/2", color: "bg-red-500" },
  { id: 5, label: "FIND", desc: "Get what they wanted", pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", color: "bg-orange-500" },
  { id: 6, label: "TAKE", desc: "Pay a heavy price for it", pos: "bottom-[14%] left-[14%] translate-y-1/2 -translate-x-1/2", color: "bg-yellow-500" },
  { id: 7, label: "RETURN", desc: "Then return to their familiar situation", pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2", color: "bg-lime-500" },
  { id: 8, label: "CHANGE", desc: "Having changed", pos: "top-[14%] left-[14%] -translate-y-1/2 -translate-x-1/2", color: "bg-green-500" },
];

export function AIAnalysis() {
  const [hoveredBeat, setHoveredBeat] = useState<any>(null);
  const [hoveredHarmon, setHoveredHarmon] = useState<any>(HARMON_STEPS[0]); // Default to step 1

  const getPath = (key: 'storyVal' | 'engageVal') => {
    const points = SCENE_BEATS.map((beat, i) => {
      const x = (i / (SCENE_BEATS.length - 1)) * 100;
      const y = 100 - beat[key];
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER STATS (From your Image) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6 flex items-center gap-4">
               <div className="p-3 rounded-full bg-green-500/10 text-green-500"><TrendingUp className="w-6 h-6" /></div>
               <div><p className="text-xs text-zinc-500 uppercase">Predicted Rating</p><h3 className="text-2xl font-bold text-white">9.4/10</h3></div>
            </CardContent>
         </Card>
         <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6 flex items-center gap-4">
               <div className="p-3 rounded-full bg-red-500/10 text-red-500"><Heart className="w-6 h-6" /></div>
               <div><p className="text-xs text-zinc-500 uppercase">Emotional Impact</p><h3 className="text-2xl font-bold text-white">HIGH</h3></div>
            </CardContent>
         </Card>
         <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6 flex items-center gap-4">
               <div className="p-3 rounded-full bg-blue-500/10 text-blue-500"><Activity className="w-6 h-6" /></div>
               <div><p className="text-xs text-zinc-500 uppercase">Pacing Score</p><h3 className="text-2xl font-bold text-white">A+</h3></div>
            </CardContent>
         </Card>
         <Card className="bg-zinc-950 border-zinc-800">
            <CardContent className="p-6 flex items-center gap-4">
               <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500"><Users className="w-6 h-6" /></div>
               <div><p className="text-xs text-zinc-500 uppercase">Target Audience</p><h3 className="text-2xl font-bold text-white">18-45 M</h3></div>
            </CardContent>
         </Card>
      </div>

      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="bg-zinc-900 border border-zinc-800">
           <TabsTrigger value="structure"><Sparkles className="w-4 h-4 mr-2"/> Narrative Structure</TabsTrigger>
           <TabsTrigger value="audience"><BarChart3 className="w-4 h-4 mr-2"/> Audience Retention</TabsTrigger>
           <TabsTrigger value="beats"><List className="w-4 h-4 mr-2"/> Detailed Beat Sheet</TabsTrigger>
        </TabsList>

        {/* --- TAB 1: NARRATIVE STRUCTURE (Harmon Cycle RESTORED) --- */}
        <TabsContent value="structure" className="mt-6 space-y-6">
           
           {/* Acts */}
           <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                 <h4 className="text-blue-400 font-bold uppercase text-sm mb-2">ACT I: THE SETUP</h4>
                 <p className="text-white text-sm font-bold">Inciting Incident:</p>
                 <p className="text-zinc-400 text-xs">The invitation to Hastinapura.</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                 <h4 className="text-purple-400 font-bold uppercase text-sm mb-2">ACT II: THE CONFRONTATION</h4>
                 <p className="text-white text-sm font-bold">Midpoint:</p>
                 <p className="text-zinc-400 text-xs">Arjuna receives the Gita.</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                 <h4 className="text-red-400 font-bold uppercase text-sm mb-2">ACT III: THE RESOLUTION</h4>
                 <p className="text-white text-sm font-bold">Climax:</p>
                 <p className="text-zinc-400 text-xs">Karna vs Arjuna.</p>
              </div>
           </div>

           {/* --- THE EXACT HARMON CYCLE FROM YOUR IMAGE --- */}
           <Card className="bg-zinc-950 border-zinc-800">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2"><CircleDot className="w-5 h-5 text-yellow-500"/> Dan Harmon / Hero's Journey Cycle</CardTitle>
                 <CardDescription>Hover over the nodes to see the AI breakdown of the cycle steps.</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex items-center justify-center relative bg-black/40">
                 
                 {/* The Circle Container */}
                 <div className="w-[350px] h-[350px] rounded-full border-2 border-dashed border-zinc-700 relative flex items-center justify-center">
                    
                    {/* Inner Content (Changing Text) */}
                    <AnimatePresence mode="wait">
                       <motion.div 
                          key={hoveredHarmon ? hoveredHarmon.id : "empty"}
                          initial={{ opacity: 0, scale: 0.8 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="text-center w-48"
                       >
                          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xl mb-3 shadow-lg ${hoveredHarmon?.color || "bg-zinc-800"}`}>
                             {hoveredHarmon?.id}
                          </div>
                          <h4 className="text-3xl font-black text-white uppercase tracking-tighter">{hoveredHarmon?.label}</h4>
                          <p className="text-sm text-zinc-400 mt-2 font-medium">{hoveredHarmon?.desc}</p>
                       </motion.div>
                    </AnimatePresence>

                    {/* Nodes (Absolute Positioned) */}
                    {HARMON_STEPS.map((step) => (
                       <div 
                          key={step.id}
                          className={`absolute ${step.pos} w-12 h-12 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center font-bold text-lg shadow-xl
                             ${hoveredHarmon?.id === step.id ? 'scale-125 ring-4 ring-white' : 'scale-100 ring-2 ring-transparent opacity-80 hover:opacity-100'}
                             ${step.color} text-white
                          `}
                          onMouseEnter={() => setHoveredHarmon(step)}
                       >
                          {step.id}
                       </div>
                    ))}
                 </div>

              </CardContent>
           </Card>
        </TabsContent>

        {/* --- TAB 2: AUDIENCE GRAPH --- */}
        <TabsContent value="audience" className="mt-6 space-y-6">
            <Card className="bg-zinc-950 border-zinc-800 relative overflow-hidden">
                <CardHeader className="border-b border-zinc-800 pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-yellow-500" /> Engagement vs. Story Arc
                        </CardTitle>
                        <CardDescription>
                            Comparing <span className="text-purple-400 font-bold">Narrative Structure</span> against predicted <span className="text-yellow-400 font-bold">Audience Interest</span>.
                        </CardDescription>
                    </div>
                    <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> Story Intensity</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Audience Dopamine</div>
                    </div>
                </div>
                </CardHeader>
                
                <CardContent className="pt-8 h-[350px] relative">
                <div className="w-full h-[250px] relative">
                    <div className="absolute inset-0 flex flex-col justify-between text-xs text-zinc-600">
                        <div className="border-b border-zinc-800/50 w-full h-0"></div>
                        <div className="border-b border-zinc-800/50 w-full h-0"></div>
                        <div className="border-b border-zinc-800/50 w-full h-0"></div>
                        <div className="border-b border-zinc-800/50 w-full h-0"></div>
                    </div>
                    <svg className="w-full h-full overflow-visible preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.path d={getPath('storyVal')} fill="none" stroke="#a855f7" strokeWidth="0.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}/>
                        <path d={`${getPath('storyVal')} V 100 H 0 Z`} fill="url(#purpleGradient)" opacity="0.2" />
                        <motion.path d={getPath('engageVal')} fill="none" stroke="#eab308" strokeWidth="0.8" strokeDasharray="1 1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}/>
                        <defs><linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" stopOpacity="0.5"/><stop offset="100%" stopColor="#a855f7" stopOpacity="0"/></linearGradient></defs>
                    </svg>
                    <div className="absolute inset-0 flex justify-between items-end">
                        {SCENE_BEATS.map((beat) => (
                            <div key={beat.id} className="relative group flex flex-col items-center" style={{ height: `${beat.storyVal}%` }}>
                                <div className="w-3 h-3 bg-zinc-950 border-2 border-white rounded-full cursor-pointer hover:scale-150 transition-transform hover:border-yellow-500 z-10" onMouseEnter={() => setHoveredBeat(beat)}/>
                            </div>
                        ))}
                    </div>
                </div>
                {hoveredBeat && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 right-4 bg-zinc-900/90 border border-zinc-700 p-4 rounded-xl shadow-2xl backdrop-blur-md w-64 z-20">
                        <h4 className="font-bold text-white text-lg">{hoveredBeat.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1">{hoveredBeat.desc}</p>
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between text-xs"><span className="text-purple-400">Story Importance</span><span className="text-white font-mono">{hoveredBeat.storyVal}%</span></div>
                            <Progress value={hoveredBeat.storyVal} className="h-1 bg-zinc-800" />
                            <div className="flex justify-between text-xs"><span className="text-yellow-400">Audience Grip</span><span className="text-white font-mono">{hoveredBeat.engageVal}%</span></div>
                            <Progress value={hoveredBeat.engageVal} className="h-1 bg-zinc-800" />
                        </div>
                    </motion.div>
                )}
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-zinc-950 border-zinc-800">
                    <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><AlertTriangle className="w-5 h-5 text-red-500" /> Critical Pacing Issues</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                    <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-lg flex gap-3 items-start">
                        <div className="bg-red-500/10 p-2 rounded-full mt-1"><TrendingUp className="w-4 h-4 text-red-500 rotate-180" /></div>
                        <div>
                            <h4 className="text-sm font-bold text-red-400">Engagement Drop (45:00)</h4>
                            <p className="text-xs text-zinc-400 mt-1">Audience interest drops by 45% during "The Exile Begins". Dialogue heavy.</p>
                            <Button size="sm" variant="link" className="text-red-400 p-0 h-auto mt-2 text-xs">Suggest Fix: Add "Visual Montage" &rarr;</Button>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        {/* --- TAB 3: STORY BEATS (List) --- */}
        <TabsContent value="beats" className="mt-6">
            <Card className="bg-zinc-950 border-zinc-800">
                <CardHeader><CardTitle>Scene-by-Scene Breakdown</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                    {SCENE_BEATS.map((beat) => (
                        <div key={beat.id} className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                            <div className="col-span-2 text-sm font-mono text-zinc-500">{beat.time}</div>
                            <div className="col-span-4"><h4 className="font-bold text-white text-sm">{beat.name}</h4><Badge variant="outline" className="text-[10px] text-zinc-400 border-zinc-700 mt-1">{beat.type}</Badge></div>
                            <div className="col-span-4 text-xs text-zinc-400">{beat.desc}</div>
                            <div className="col-span-2 text-right"><Badge className={beat.engageVal > 80 ? "bg-green-900 text-green-400" : beat.engageVal < 50 ? "bg-red-900 text-red-400" : "bg-yellow-900 text-yellow-400"}>{beat.engageVal}% Engage</Badge></div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
