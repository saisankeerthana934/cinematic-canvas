// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; // ✅ IMPORT THIS
// import { Loader2, Film, FolderOpen, Trash2, Edit3, Sparkles, Play, Wand2, X } from "lucide-react";
// import { fetchAllProjects, deleteProject } from "@/lib/api"; 
// import { MOCK_PROJECT } from "@/data/mockData"; 
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";

// // 1. STRICT EMPTY MOCK
// const EMPTY_MOCK = {
//   ...MOCK_PROJECT,
//   _id: "mock-empty",
//   title: "Untitled Project",
//   isDemo: false,
//   script: {
//     ...MOCK_PROJECT.script,
//     title: "Untitled Project",
//     scenes: MOCK_PROJECT.script.scenes.map((s: any) => ({ ...s, image: "", analysis: { camera: "Wide", lighting: "Natural", mood: "Neutral" } }))
//   }
// };

// export function SceneBreakdown() {
//   const { id } = useParams(); // ✅ GET ID FROM URL
//   const { toast } = useToast();
  
//   const [projectList, setProjectList] = useState<any[]>([]);
//   const [project, setProject] = useState<any>(EMPTY_MOCK); 
//   const [loading, setLoading] = useState(true);
//   const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  
//   const [processingId, setProcessingId] = useState<string | null>(null);
//   const [editingScene, setEditingScene] = useState<any | null>(null);
//   const [editForm, setEditForm] = useState<any>({});
//   const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  
//   const [isPlayingMovie, setIsPlayingMovie] = useState(false);
//   const [currentPlayIndex, setCurrentPlayIndex] = useState(0);

//   const getScenes = () => project.scenes || project.script?.scenes || [];
//   const getTitle = () => project.title || project.script?.title || "Untitled";
//   const getIsDemo = () => (project.isDemo === true || getTitle().toUpperCase().includes("MAHABHARATA"));

//   // 1. LOAD PROJECTS
//   const refreshProjects = async () => {
//     try {
//       const allProjects = await fetchAllProjects();
//       if (allProjects && allProjects.length > 0) {
//         setProjectList(allProjects);
        
//         // ✅ SMART LOAD: If URL has ID, load that. Else load latest.
//         if (id) {
//             const target = allProjects.find((p: any) => p._id === id);
//             setProject(target || allProjects[allProjects.length - 1]);
//         } else {
//             setProject(allProjects[allProjects.length - 1]);
//         }
//       } else {
//         setProject(EMPTY_MOCK);
//       }
//     } catch (e) {
//       setProject(EMPTY_MOCK);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add 'id' to dependency array so it reloads when URL changes
//   useEffect(() => { refreshProjects(); }, [id]);

//   // RESET ON SWAP
//   useEffect(() => {
//     setRevealed({}); 
//     setIsPlayingMovie(false);
//     setCurrentPlayIndex(0);
//   }, [project._id]);

//   // 2. GENERATE SINGLE SCENE
//   const handleGenerateScene = async (sceneId: string, isBatch = false) => {
//     if (!isBatch) setProcessingId(sceneId);
    
//     // DEMO MODE: Simulate Generation
//     if (getIsDemo()) {
//        if (!isBatch) toast({ title: "Director", description: "Rendering scene assets..." });
//        await new Promise(r => setTimeout(r, 1500));
//        setRevealed(prev => ({ ...prev, [sceneId]: true }));
//        if (!isBatch) setProcessingId(null);
//        if (!isBatch) toast({ title: "Success", description: "Visual Rendered." });
//        return;
//     }

//     // REAL AI GENERATION
//     if (!isBatch) toast({ title: "Director", description: "Generating visual..." });

//     try {
//       let projectId = project._id;
//       if (!projectId || projectId === "mock-empty") {
//          const createRes = await fetch('http://localhost:5000/api/projects', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ 
//                 title: project.script.title, 
//                 scriptText: project.script.scenes.map((s:any) => s.text).join('\n') 
//             })
//          });
//          const newProject = await createRes.json();
//          projectId = newProject._id;
//          setProject(newProject);
//       }

//       const scenes = getScenes();
//       const currentScene = scenes.find((s:any) => s.id === sceneId);
      
//       const response = await fetch(`http://localhost:5000/api/projects/${projectId}/scenes/${sceneId}/generate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text: currentScene.text,
//           analysis: currentScene.analysis 
//         })
//       });

//       if (response.ok) {
//          const refresh = await fetch(`http://localhost:5000/api/projects`);
//          const all = await refresh.json();
//          const updated = all.find((p:any) => p._id === projectId);
//          if (updated) setProject(updated);
         
//          setRevealed(prev => ({ ...prev, [sceneId]: true }));
//          if (!isBatch) toast({ title: "Success", description: "Visual Rendered." });
//       }
//     } catch (error) { 
//       if (!isBatch) toast({ title: "Error", description: "Server error.", variant: "destructive" }); 
//     } finally { 
//       if (!isBatch) setProcessingId(null); 
//     }
//   };

//   // 3. BATCH GENERATE
//   const handleGenerateAll = async () => {
//     const scenes = getScenes();
//     const scenesToGen = scenes.filter((s:any) => !revealed[s.id]);
    
//     if (scenesToGen.length === 0) {
//       toast({ title: "Ready", description: "All scenes are already rendered." });
//       return;
//     }

//     setIsBatchGenerating(true);
//     toast({ title: "Batch Production Started", description: `Rendering ${scenesToGen.length} scenes...` });

//     for (const scene of scenesToGen) {
//       setProcessingId(scene.id);
//       await handleGenerateScene(scene.id, true);
//       await new Promise(r => setTimeout(r, 500)); 
//     }

//     setProcessingId(null);
//     setIsBatchGenerating(false);
//     toast({ title: "Production Complete", description: "All visuals generated." });
//   };

//   const handleAIAnalyze = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/projects/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: editForm.text })
//       });
//       const analysis = await res.json();
//       setEditForm({ ...editForm, ...analysis });
//       toast({ title: "AI Director", description: "Settings applied." });
//     } catch (e) { toast({ title: "AI Offline", variant: "destructive" }); }
//   };

//   const saveEditor = () => {
//     const scenes = getScenes();
//     const updatedScenes = scenes.map((s: any) => 
//       s.id === editingScene.id 
//       ? { ...s, text: editForm.text, analysis: { ...s.analysis, ...editForm } }
//       : s
//     );
//     const newProject = { ...project };
//     if (newProject.scenes) newProject.scenes = updatedScenes;
//     else if (newProject.script) newProject.script.scenes = updatedScenes;
//     setProject(newProject);
//     setEditingScene(null);
//   };

//   const scenes = getScenes();
//   const projectTitle = getTitle();

//   // --- MOVIE PLAYER ---
//   const MovieTheater = () => {
//     const currentScene = scenes[currentPlayIndex];
//     const isDemo = getIsDemo();

//     if (isDemo) {
//         return (
//             <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500">
//                 <button onClick={() => setIsPlayingMovie(false)} className="fixed top-6 right-6 z-[10000] bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
//                     <X className="w-8 h-8" />
//                 </button>
//                 <div className="relative w-full max-w-7xl px-4">
//                     <video src="/assets/mahabharat_full.mp4" controls autoPlay className="w-full max-h-[85vh] shadow-[0_0_50px_rgba(255,165,0,0.3)] border-2 border-zinc-900 rounded-lg bg-black"/>
//                     <p className="text-zinc-500 text-center mt-2">Now Playing: Full Demo Feature</p>
//                 </div>
//             </div>
//         );
//     }

//     const [progress, setProgress] = useState(0);
//     useEffect(() => {
//         if (!currentScene) return;
//         const timer = setInterval(() => {
//             setProgress(old => {
//                 if (old >= 100) { clearInterval(timer); handleNext(); return 0; }
//                 return old + 2;
//             })
//         }, 100); 
//         return () => clearInterval(timer);
//     }, [currentPlayIndex]);

//     const handleNext = () => {
//         if (currentPlayIndex < scenes.length - 1) { setCurrentPlayIndex(p => p + 1); setProgress(0); }
//         else { setIsPlayingMovie(false); }
//     };

//     if (!currentScene) return null;

//     return (
//         <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
//             <button onClick={() => setIsPlayingMovie(false)} className="fixed top-6 right-6 z-[10000] bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full">
//                 <X className="w-6 h-6" />
//             </button>
//             <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 shadow-2xl overflow-hidden rounded-lg">
//                 <img src={currentScene.image || "https://images.unsplash.com/photo-1548625361-9872e254e26d?auto=format&fit=crop&w=800"} className="w-full h-full object-contain animate-in fade-in zoom-in-50 duration-[5000ms]" style={{ animationFillMode: "forwards" }}/>
//                 <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
//                     <h2 className="text-2xl font-bold text-white mb-2">{currentScene.title}</h2>
//                     <p className="text-zinc-200 text-lg font-serif leading-relaxed">{currentScene.text}</p>
//                 </div>
//             </div>
//         </div>
//     );
//   };

//   if (loading) return <div className="p-10 text-center text-zinc-500"><Loader2 className="animate-spin w-8 h-8 mx-auto mb-4"/>Loading Studio...</div>;

//   return (
//     <div className="space-y-8 pb-20">
//       <div className="flex justify-between items-end border-b border-white/10 pb-6">
//          <div>
//            <Badge variant="outline" className="mb-2 border-primary/50 text-primary">Studio Mode</Badge>
//            <div className="flex items-center gap-3">
//              <h1 className="text-4xl font-display font-bold text-white">{projectTitle}</h1>
//              {projectList.length > 0 && (
//                <DropdownMenu>
//                  <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-800 text-zinc-300"><FolderOpen className="w-3.5 h-3.5 mr-2" /> Switch</Button></DropdownMenuTrigger>
//                  <DropdownMenuContent className="bg-black border-zinc-800 text-white">
//                    {projectList.map((p) => (
//                      <DropdownMenuItem key={p._id} onClick={() => setProject(p)} className="hover:bg-zinc-900 cursor-pointer justify-between">
//                        {p.title}<Trash2 className="w-3 h-3 text-red-500 hover:text-red-400" onClick={(e) => { e.stopPropagation(); deleteProject(p._id).then(refreshProjects); }}/>
//                      </DropdownMenuItem>
//                    ))}
//                  </DropdownMenuContent>
//                </DropdownMenu>
//              )}
//            </div>
//          </div>
//          {scenes.length > 0 && (
//              <Button onClick={handleGenerateAll} disabled={isBatchGenerating} className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow-[0_0_15px_rgba(168,85,247,0.4)]">
//                {isBatchGenerating ? <Loader2 className="animate-spin w-4 h-4 mr-2"/> : <Wand2 className="w-4 h-4 mr-2" />}
//                {isBatchGenerating ? "Batch Rendering..." : "Generate All Visuals"}
//              </Button>
//          )}
//       </div>

//       {isPlayingMovie && <MovieTheater />}

//       {/* --- UPDATED GRID LOGIC --- */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {scenes.map((scene: any) => {
//           const isRevealed = revealed[scene.id] === true;
//           const isProcessing = processingId === scene.id;
          
//           // 1. Check for Image
//           const hasImage = scene.image && scene.image.length > 5;
          
//           // 2. Check for Video (Only in Demo Mode, if image is missing)
//           const isDemo = getIsDemo();
//           // Assuming your mock data uses number 1-9 for scenes
//           const sceneNum = scene.number || 1;
//           const hasVideo = isDemo && !hasImage && isRevealed; 
          
//           const showVisual = (hasImage || hasVideo) && isRevealed;

//           return (
//             <Card key={scene.id} className={cn("overflow-hidden bg-black/40 border-zinc-800", showVisual && "border-primary/30", isProcessing && "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]")}>
//               <div className="aspect-video bg-black relative group">
//                 {hasImage && isRevealed ? (
//                    // OPTION A: SHOW IMAGE (Like Scene 2)
//                    <img src={scene.image} className="w-full h-full object-cover animate-in fade-in duration-700" />
//                 ) : hasVideo ? (
//                    // OPTION B: SHOW LOCAL VIDEO (Like Scene 1, 3, etc.)
//                    <video 
//                      src={`/assets/scene-${sceneNum}.mp4`} 
//                      className="w-full h-full object-cover animate-in fade-in duration-700" 
//                      muted 
//                      loop 
//                      autoPlay 
//                      playsInline
//                    />
//                 ) : (
//                    // OPTION C: PENDING
//                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
//                      {isProcessing ? <Loader2 className="animate-spin w-8 h-8 text-purple-500"/> : <Film className="w-8 h-8"/>}
//                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-2">{isProcessing ? "Rendering..." : "Pending Visual"}</span>
//                    </div>
//                 )}
                
//                 <Button size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50" 
//                   onClick={() => { setEditingScene(scene); setEditForm({ text: scene.text, ...scene.analysis }); }}><Edit3 className="w-4 h-4 text-white" /></Button>
//               </div>
//               <CardContent className="p-4 space-y-3">
//                  <h3 className="font-bold text-sm text-white truncate">{scene.title}</h3>
//                  <Button onClick={() => handleGenerateScene(scene.id)} disabled={isProcessing || isBatchGenerating} className={cn("w-full h-8 text-xs", showVisual ? "bg-green-500/10 text-green-500" : "bg-zinc-800")}>
//                     {showVisual ? "Re-Render" : "Generate Visual"}
//                  </Button>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <div className="fixed bottom-6 right-6 z-40">
//          <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-in slide-in-from-bottom-5"
//            onClick={() => { setCurrentPlayIndex(0); setIsPlayingMovie(true); }}>
//            <Play className="w-5 h-5 mr-2" /> Watch Full Movie
//          </Button>
//       </div>

//       <Dialog open={!!editingScene} onOpenChange={() => setEditingScene(null)}>
//         <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-xl">
//           <DialogHeader><DialogTitle>Director's Override</DialogTitle></DialogHeader>
//           <div className="space-y-4">
//              <div className="relative">
//                 <Textarea value={editForm.text} onChange={(e) => setEditForm({...editForm, text: e.target.value})} className="bg-zinc-900 border-zinc-800 min-h-[80px]"/>
//                 <Button size="icon" variant="ghost" className="absolute right-2 bottom-2 text-primary hover:bg-primary/20" onClick={handleAIAnalyze} title="AI Auto-Config"><Sparkles className="w-4 h-4" /></Button>
//              </div>
//              <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-1"><Label className="text-xs text-zinc-500">Camera</Label><Input value={editForm.camera || ""} onChange={(e) => setEditForm({...editForm, camera: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
//                 <div className="space-y-1"><Label className="text-xs text-zinc-500">Lighting</Label><Input value={editForm.lighting || ""} onChange={(e) => setEditForm({...editForm, lighting: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
//                 <div className="space-y-1"><Label className="text-xs text-zinc-500">Lens</Label><Input value={editForm.lens || ""} onChange={(e) => setEditForm({...editForm, lens: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
//                 <div className="space-y-1"><Label className="text-xs text-zinc-500">Color</Label><Input value={editForm.color || ""} onChange={(e) => setEditForm({...editForm, color: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
//              </div>
//           </div>
//           <DialogFooter><Button onClick={saveEditor}>Save Configuration</Button></DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { Loader2, Film, FolderOpen, Trash2, Edit3, Sparkles, Play, Wand2, X, Sliders, Lock, ChevronDown } from "lucide-react"; 
import { fetchAllProjects, deleteProject } from "@/lib/api"; 
import { MOCK_PROJECT } from "@/data/mockData"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useVisualProfile } from "@/contexts/VisualProfileContext"; // ✅ IMPORT CONTEXT

const EMPTY_MOCK = {
  ...MOCK_PROJECT,
  _id: "mock-empty",
  title: "Untitled Project",
  isDemo: false,
  script: {
    ...MOCK_PROJECT.script,
    title: "Untitled Project",
    scenes: MOCK_PROJECT.script.scenes.map((s: any) => ({ ...s, image: "", analysis: { camera: "Wide", lighting: "Natural", mood: "Neutral" } }))
  }
};

export function SceneBreakdown() {
  const { id } = useParams(); 
  const { toast } = useToast();
  // ✅ GET LIBRARY AND ACTIONS
  const { profile, library, updateProfile } = useVisualProfile(); 
  
  const [projectList, setProjectList] = useState<any[]>([]);
  const [project, setProject] = useState<any>(EMPTY_MOCK); 
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [editingScene, setEditingScene] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  
  const [isPlayingMovie, setIsPlayingMovie] = useState(false);
  const [currentPlayIndex, setCurrentPlayIndex] = useState(0);

  const getScenes = () => project.scenes || project.script?.scenes || [];
  const getTitle = () => project.title || project.script?.title || "Untitled";
  const getIsDemo = () => (project.isDemo === true || getTitle().toUpperCase().includes("MAHABHARATA"));

  const refreshProjects = async () => {
    try {
      const allProjects = await fetchAllProjects();
      if (allProjects && allProjects.length > 0) {
        setProjectList(allProjects);
        if (id) {
            const target = allProjects.find((p: any) => p._id === id);
            setProject(target || allProjects[allProjects.length - 1]);
        } else {
            setProject(allProjects[allProjects.length - 1]);
        }
      } else {
        setProject(EMPTY_MOCK);
      }
    } catch (e) {
      setProject(EMPTY_MOCK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshProjects(); }, [id]);

  useEffect(() => {
    setRevealed({}); 
    setIsPlayingMovie(false);
    setCurrentPlayIndex(0);
  }, [project._id]);

  const handleGenerateScene = async (sceneId: string, isBatch = false) => {
    if (!isBatch) setProcessingId(sceneId);
    
    if (getIsDemo()) {
       const styleMsg = profile.lighting ? `Applying ${profile.lighting}...` : "Rendering...";
       if (!isBatch) toast({ title: "Director", description: styleMsg }); 
       await new Promise(r => setTimeout(r, 1500));
       setRevealed(prev => ({ ...prev, [sceneId]: true }));
       if (!isBatch) setProcessingId(null);
       if (!isBatch) toast({ title: "Success", description: "Visual Rendered." });
       return;
    }

    if (!isBatch) toast({ title: "Director", description: "Generating visual..." });

    try {
      let projectId = project._id;
      if (!projectId || projectId === "mock-empty") {
         const createRes = await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: project.script.title, 
                scriptText: project.script.scenes.map((s:any) => s.text).join('\n') 
            })
         });
         const newProject = await createRes.json();
         projectId = newProject._id;
         setProject(newProject);
      }

      const scenes = getScenes();
      const currentScene = scenes.find((s:any) => s.id === sceneId);
      
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}/scenes/${sceneId}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: currentScene.text,
          analysis: { 
            ...currentScene.analysis, 
            lighting: profile.lighting || currentScene.analysis.lighting, 
            lens: profile.lens || currentScene.analysis.lens 
          } 
        })
      });

      if (response.ok) {
         const refresh = await fetch(`http://localhost:5000/api/projects`);
         const all = await refresh.json();
         const updated = all.find((p:any) => p._id === projectId);
         if (updated) setProject(updated);
         
         setRevealed(prev => ({ ...prev, [sceneId]: true }));
         if (!isBatch) toast({ title: "Success", description: "Visual Rendered." });
      }
    } catch (error) { 
      if (!isBatch) toast({ title: "Error", description: "Server error.", variant: "destructive" }); 
    } finally { 
      if (!isBatch) setProcessingId(null); 
    }
  };

  const handleGenerateAll = async () => {
    const scenes = getScenes();
    const scenesToGen = scenes.filter((s:any) => !revealed[s.id]);
    
    if (scenesToGen.length === 0) {
      toast({ title: "Ready", description: "All scenes are already rendered." });
      return;
    }

    setIsBatchGenerating(true);
    const styleMsg = profile.lighting ? `with ${profile.lighting} style...` : "...";
    toast({ title: "Batch Production Started", description: `Rendering ${scenesToGen.length} scenes ${styleMsg}` });

    for (const scene of scenesToGen) {
      setProcessingId(scene.id);
      await handleGenerateScene(scene.id, true);
      await new Promise(r => setTimeout(r, 500)); 
    }

    setProcessingId(null);
    setIsBatchGenerating(false);
    toast({ title: "Production Complete", description: "All visuals generated." });
  };

  const handleAIAnalyze = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editForm.text })
      });
      const analysis = await res.json();
      setEditForm({ ...editForm, ...analysis });
      toast({ title: "AI Director", description: "Settings applied." });
    } catch (e) { toast({ title: "AI Offline", variant: "destructive" }); }
  };

  const saveEditor = () => {
    const scenes = getScenes();
    const updatedScenes = scenes.map((s: any) => 
      s.id === editingScene.id 
      ? { ...s, text: editForm.text, analysis: { ...s.analysis, ...editForm } }
      : s
    );
    const newProject = { ...project };
    if (newProject.scenes) newProject.scenes = updatedScenes;
    else if (newProject.script) newProject.script.scenes = updatedScenes;
    setProject(newProject);
    setEditingScene(null);
  };

  const scenes = getScenes();
  const projectTitle = getTitle();

  const MovieTheater = () => {
    const currentScene = scenes[currentPlayIndex];
    const isDemo = getIsDemo();

    if (isDemo) {
        return (
            <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500">
                <button onClick={() => setIsPlayingMovie(false)} className="fixed top-6 right-6 z-[10000] bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
                    <X className="w-8 h-8" />
                </button>
                <div className="relative w-full max-w-7xl px-4">
                    <video src="/assets/mahabharat_full.mp4" controls autoPlay className="w-full max-h-[85vh] shadow-[0_0_50px_rgba(255,165,0,0.3)] border-2 border-zinc-900 rounded-lg bg-black"/>
                    <p className="text-zinc-500 text-center mt-2">Now Playing: Full Demo Feature</p>
                </div>
            </div>
        );
    }

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (!currentScene) return;
        const timer = setInterval(() => {
            setProgress(old => {
                if (old >= 100) { clearInterval(timer); handleNext(); return 0; }
                return old + 2;
            })
        }, 100); 
        return () => clearInterval(timer);
    }, [currentPlayIndex]);

    const handleNext = () => {
        if (currentPlayIndex < scenes.length - 1) { setCurrentPlayIndex(p => p + 1); setProgress(0); }
        else { setIsPlayingMovie(false); }
    };

    if (!currentScene) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
            <button onClick={() => setIsPlayingMovie(false)} className="fixed top-6 right-6 z-[10000] bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-full">
                <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-6xl aspect-video bg-zinc-900 shadow-2xl overflow-hidden rounded-lg">
                <img src={currentScene.image || "https://images.unsplash.com/photo-1548625361-9872e254e26d?auto=format&fit=crop&w=800"} className="w-full h-full object-contain animate-in fade-in zoom-in-50 duration-[5000ms]" style={{ animationFillMode: "forwards" }}/>
                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                    <h2 className="text-2xl font-bold text-white mb-2">{currentScene.title}</h2>
                    <p className="text-zinc-200 text-lg font-serif leading-relaxed">{currentScene.text}</p>
                </div>
            </div>
        </div>
    );
  };

  if (loading) return <div className="p-10 text-center text-zinc-500"><Loader2 className="animate-spin w-8 h-8 mx-auto mb-4"/>Loading Studio...</div>;

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500">
      
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
         <div>
           <Badge variant="outline" className="mb-2 border-primary/50 text-primary">Studio Mode</Badge>
           <div className="flex items-center gap-3">
             <h1 className="text-4xl font-display font-bold text-white">{projectTitle}</h1>
             {projectList.length > 0 && (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-800 text-zinc-300"><FolderOpen className="w-3.5 h-3.5 mr-2" /> Switch</Button></DropdownMenuTrigger>
                 <DropdownMenuContent className="bg-black border-zinc-800 text-white">
                   {projectList.map((p) => (
                     <DropdownMenuItem key={p._id} onClick={() => setProject(p)} className="hover:bg-zinc-900 cursor-pointer justify-between">
                       {p.title}<Trash2 className="w-3 h-3 text-red-500 hover:text-red-400" onClick={(e) => { e.stopPropagation(); deleteProject(p._id).then(refreshProjects); }}/>
                     </DropdownMenuItem>
                   ))}
                 </DropdownMenuContent>
               </DropdownMenu>
             )}
           </div>
         </div>
         {scenes.length > 0 && (
             <Button onClick={handleGenerateAll} disabled={isBatchGenerating} className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow-[0_0_15px_rgba(168,85,247,0.4)]">
               {isBatchGenerating ? <Loader2 className="animate-spin w-4 h-4 mr-2"/> : <Wand2 className="w-4 h-4 mr-2" />}
               {isBatchGenerating ? "Batch Rendering..." : "Generate All Visuals"}
             </Button>
         )}
      </div>

      {/* ✅ INTERACTIVE VISUAL PROFILE PANEL */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full border ${profile.lighting ? "bg-green-500/10 border-green-500/20" : "bg-zinc-800/50 border-zinc-700"}`}>
               <Sliders className={`w-5 h-5 ${profile.lighting ? "text-green-400" : "text-zinc-500"}`} />
            </div>
            <div>
               <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                 {profile.lighting ? "Film Visual Profile (Active)" : "No Visual Profile Set"}
               </h3>
               <p className="text-zinc-400 text-xs">
                 {profile.lighting ? "AI Director is enforcing these styles." : "Select styles to enforce consistency."}
               </p>
            </div>
         </div>
         
         <div className="flex flex-wrap gap-2">
            {/* LIGHTING SELECTOR */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className={`h-8 text-xs border-dashed border-zinc-700 ${profile.lighting ? "bg-green-500/10 text-green-400 border-green-500/30 border-solid" : "text-zinc-500"}`}>
                     {profile.lighting ? <><Lock className="w-3 h-3 mr-2" /> {profile.lighting}</> : "+ Add Lighting"}
                     <ChevronDown className="w-3 h-3 ml-2 opacity-50"/>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="bg-zinc-950 border-zinc-800 text-white">
                  {library.lighting?.map((item: any) => (
                     <DropdownMenuItem key={item.id} onClick={() => updateProfile("lighting", item.value)} className="hover:bg-zinc-900 cursor-pointer">
                        {item.title}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>

            {/* LENS SELECTOR */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className={`h-8 text-xs border-dashed border-zinc-700 ${profile.lens ? "bg-blue-500/10 text-blue-400 border-blue-500/30 border-solid" : "text-zinc-500"}`}>
                     {profile.lens ? <><Lock className="w-3 h-3 mr-2" /> {profile.lens}</> : "+ Add Lens"}
                     <ChevronDown className="w-3 h-3 ml-2 opacity-50"/>
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="bg-zinc-950 border-zinc-800 text-white">
                  {library.lens?.map((item: any) => (
                     <DropdownMenuItem key={item.id} onClick={() => updateProfile("lens", item.value)} className="hover:bg-zinc-900 cursor-pointer">
                        {item.title}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {scenes.map((scene: any) => {
          const isRevealed = revealed[scene.id] === true;
          const isProcessing = processingId === scene.id;
          const hasImage = scene.image && scene.image.length > 5;
          const isDemo = getIsDemo();
          const sceneNum = scene.number || 1;
          const hasVideo = isDemo && !hasImage && isRevealed; 
          const showVisual = (hasImage || hasVideo) && isRevealed;

          return (
            <Card key={scene.id} className={cn("overflow-hidden bg-black/40 border-zinc-800 transition-colors", showVisual && "border-primary/30", isProcessing && "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]")}>
              <div className="aspect-video bg-black relative group">
                {hasImage && isRevealed ? (
                   <img src={scene.image} className="w-full h-full object-cover animate-in fade-in duration-700" />
                ) : hasVideo ? (
                   <video src={`/assets/scene-${sceneNum}.mp4`} className="w-full h-full object-cover animate-in fade-in duration-700" muted loop autoPlay playsInline />
                ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
                     {isProcessing ? <Loader2 className="animate-spin w-8 h-8 text-purple-500"/> : <Film className="w-8 h-8"/>}
                     <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-2">{isProcessing ? "Rendering..." : "Pending Visual"}</span>
                   </div>
                )}
                
                {isRevealed && profile.lighting && (
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded border border-green-500/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-green-400" />
                        <span className="text-[10px] text-green-400 font-medium">Style: {profile.lighting}</span>
                    </div>
                )}

                <Button size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50" 
                  onClick={() => { setEditingScene(scene); setEditForm({ text: scene.text, ...scene.analysis }); }}><Edit3 className="w-4 h-4 text-white" /></Button>
              </div>
              <CardContent className="p-4 space-y-3">
                  <h3 className="font-bold text-sm text-white truncate">{scene.title}</h3>
                  <Button onClick={() => handleGenerateScene(scene.id)} disabled={isProcessing || isBatchGenerating} className={cn("w-full h-8 text-xs", showVisual ? "bg-green-500/10 text-green-500" : "bg-zinc-800")}>
                    {showVisual ? "Re-Render" : "Generate Visual"}
                  </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="fixed bottom-6 right-6 z-40">
         <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-in slide-in-from-bottom-5"
           onClick={() => { setCurrentPlayIndex(0); setIsPlayingMovie(true); }}>
           <Play className="w-5 h-5 mr-2" /> Watch Full Movie
         </Button>
      </div>

      <Dialog open={!!editingScene} onOpenChange={() => setEditingScene(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-xl">
          <DialogHeader><DialogTitle>Director's Override</DialogTitle></DialogHeader>
          <div className="space-y-4">
             <div className="relative">
                <Textarea value={editForm.text} onChange={(e) => setEditForm({...editForm, text: e.target.value})} className="bg-zinc-900 border-zinc-800 min-h-[80px]"/>
                <Button size="icon" variant="ghost" className="absolute right-2 bottom-2 text-primary hover:bg-primary/20" onClick={handleAIAnalyze} title="AI Auto-Config"><Sparkles className="w-4 h-4" /></Button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><Label className="text-xs text-zinc-500">Camera</Label><Input value={editForm.camera || ""} onChange={(e) => setEditForm({...editForm, camera: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
                <div className="space-y-1"><Label className="text-xs text-zinc-500">Lighting</Label><Input value={editForm.lighting || ""} onChange={(e) => setEditForm({...editForm, lighting: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
                <div className="space-y-1"><Label className="text-xs text-zinc-500">Lens</Label><Input value={editForm.lens || ""} onChange={(e) => setEditForm({...editForm, lens: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
                <div className="space-y-1"><Label className="text-xs text-zinc-500">Color</Label><Input value={editForm.color || ""} onChange={(e) => setEditForm({...editForm, color: e.target.value})} className="bg-zinc-900 border-zinc-800 h-8 text-xs"/></div>
             </div>
          </div>
          <DialogFooter><Button onClick={saveEditor}>Save Configuration</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}