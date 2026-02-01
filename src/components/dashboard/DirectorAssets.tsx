// // import { useState } from "react";
// // import { motion } from "framer-motion";
// // import { 
// //   Camera, Lightbulb, ScanEye, Aperture, Plus, Info, 
// //   CheckCircle2, Sparkles 
// // } from "lucide-react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Dialog, DialogContent } from "@/components/ui/dialog";
// // import { useToast } from "@/hooks/use-toast";

// // // --- THE DIRECTOR'S LIBRARY DATA ---
// // const ASSET_LIBRARY = {
// //   lighting: [
// //     {
// //       id: "setup_two_lights",
// //       title: "Two-Point Setup",
// //       image: "/assets/setup_two_lights.png", // ✅ YOUR SAVED DIAGRAM
// //       token: 'lighting_setup: "key_and_rim", fill: "negative"',
// //       desc: "A Key Light for the subject and a Backlight to separate them from the background.",
// //       insight: "The 'Backlight' is crucial here—it creates a halo that pops the actor out from a dark background.",
// //       tags: ["Studio", "Clean", "Professional"]
// //     },
// //     {
// //       id: "setup_side",
// //       title: "Split / Side Lighting",
// //       image: "/assets/setup_side_lights.png", // ✅ YOUR SAVED DIAGRAM
// //       token: 'lighting_angle: "90_deg", contrast: "extreme"',
// //       desc: "Lights the subject from exactly 90 degrees, leaving half the face in shadow.",
// //       insight: "Used to show internal conflict or a 'dual nature' of a villain or anti-hero.",
// //       tags: ["Thriller", "Mystery", "Villain"]
// //     },
// //     {
// //       id: "light_neon",
// //       title: "Neon Noir / Cyberpunk",
// //       image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
// //       token: 'lighting: "neon_blue_pink", atmosphere: "foggy", bloom: "high"',
// //       desc: "High contrast lighting using artificial neon sources.",
// //       insight: "Essential for Sci-Fi or night scenes. Hides low-detail backgrounds effectively.",
// //       tags: ["Sci-Fi", "Night", "Stylized"]
// //     }
// //   ],
// //   camera: [
// //     {
// //       id: "ref_shot_sizes",
// //       title: "Master Shot Guide",
// //       image: "/assets/chart_camera_shots.png", // ✅ YOUR SAVED CHART
// //       token: 'shot_size: "auto_match_context"',
// //       desc: "Reference chart for all standard cinematic shot sizes from Extreme Long to Extreme Close-up.",
// //       insight: "Use 'Long Shots' to show loneliness/scale and 'Close-ups' to show intimacy/emotion.",
// //       tags: ["Reference", "Guide", "Education"]
// //     },
// //     {
// //       id: "cam_dutch",
// //       title: "Dutch Angle",
// //       image: "https://images.unsplash.com/photo-1519681393784-d8e5b5a4570b?w=800&q=80",
// //       token: 'camera_angle: "dutch_tilt_15_deg", composition: "unbalanced"',
// //       desc: "The camera is tilted to one side so the horizon is on an angle.",
// //       insight: "Creates a sense of unease, disorientation, or madness in the character.",
// //       tags: ["Horror", "Tension", "Psychological"]
// //     }
// //   ],
// //   composition: [
// //     {
// //       id: "comp_thirds",
// //       title: "Rule of Thirds",
// //       image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80",
// //       token: 'composition: "rule_of_thirds", subject_position: "grid_intersection"',
// //       desc: "Aligning a subject with the guide lines and their intersection points.",
// //       insight: "The gold standard for balanced, visually pleasing shots.",
// //       tags: ["Standard", "Balanced"]
// //     }
// //   ],
// //   lens: [
// //     {
// //       id: "lens_anamorphic",
// //       title: "Anamorphic Lens",
// //       image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
// //       token: 'lens: "anamorphic", bokeh: "oval", flares: "horizontal_blue"',
// //       desc: "Produces an oval bokeh and horizontal lens flares. Cinematic widescreen look.",
// //       insight: "Instantly makes a scene feel like a high-budget movie production.",
// //       tags: ["Cinematic", "Widescreen"]
// //     }
// //   ]
// // };

// // export function DirectorAssets() {
// //   const { toast } = useToast();
// //   const [selectedAsset, setSelectedAsset] = useState<any | null>(null);

// //   const handleAddToConfig = (token: string) => {
// //     navigator.clipboard.writeText(token);
// //     toast({
// //       title: "Asset Equipped",
// //       description: "AI Prompt Token copied to configuration.",
// //       action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
// //     });
// //     setSelectedAsset(null);
// //   };

// //   return (
// //     <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
// //       {/* HEADER */}
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <h1 className="text-3xl font-display font-bold text-white mb-2">Director's Asset Library</h1>
// //           <p className="text-zinc-400 max-w-2xl">
// //             A curated collection of filmmaking techniques. Select a card to inject its technical specifications directly into the AI generation engine.
// //           </p>
// //         </div>
// //         <Button variant="outline" className="hidden md:flex">
// //           <Info className="w-4 h-4 mr-2" /> How to use
// //         </Button>
// //       </div>

// //       {/* TABS */}
// //       <Tabs defaultValue="lighting" className="w-full">
// //         <TabsList className="bg-zinc-900 border-zinc-800 p-1 h-12">
// //           <TabsTrigger value="lighting" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white px-6"><Lightbulb className="w-4 h-4 mr-2"/> Lighting</TabsTrigger>
// //           <TabsTrigger value="camera" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6"><Camera className="w-4 h-4 mr-2"/> Camera</TabsTrigger>
// //           <TabsTrigger value="composition" className="data-[state=active]:bg-green-600 data-[state=active]:text-white px-6"><ScanEye className="w-4 h-4 mr-2"/> Composition</TabsTrigger>
// //           <TabsTrigger value="lens" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white px-6"><Aperture className="w-4 h-4 mr-2"/> Lens</TabsTrigger>
// //         </TabsList>

// //         {Object.entries(ASSET_LIBRARY).map(([key, assets]) => (
// //           <TabsContent key={key} value={key} className="mt-8">
// //             <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
// //               {assets.map((asset) => (
// //                 <motion.div key={asset.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
// //                   <Card 
// //                     className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer group hover:border-zinc-600 transition-colors"
// //                     onClick={() => setSelectedAsset(asset)}
// //                   >
// //                     <div className="aspect-video relative overflow-hidden bg-black">
// //                       <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
// //                       <img src={asset.image} alt={asset.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
// //                       <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
// //                          <Badge variant="secondary" className="bg-black/70 backdrop-blur text-white border-none">Inspect</Badge>
// //                       </div>
// //                     </div>
// //                     <CardHeader className="p-4 pb-2">
// //                       <CardTitle className="text-lg text-white">{asset.title}</CardTitle>
// //                       <div className="flex flex-wrap gap-2 mt-2">
// //                         {asset.tags.map(tag => <Badge key={tag} variant="outline" className="text-[10px] text-zinc-400 border-zinc-700">{tag}</Badge>)}
// //                       </div>
// //                     </CardHeader>
// //                     <CardContent className="p-4 pt-0">
// //                       <p className="text-xs text-zinc-500 line-clamp-2 mt-2">{asset.desc}</p>
// //                     </CardContent>
// //                   </Card>
// //                 </motion.div>
// //               ))}
              
// //               {/* PLACEHOLDER CARD */}
// //               <Card className="bg-black/20 border-zinc-800 border-dashed border-2 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 cursor-pointer transition-colors min-h-[250px]">
// //                 <Plus className="w-10 h-10 mb-4 opacity-50" />
// //                 <span className="font-medium text-sm">Create New Asset</span>
// //               </Card>
// //             </div>
// //           </TabsContent>
// //         ))}
// //       </Tabs>

// //       {/* INSPECT MODAL */}
// //       <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
// //         <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl overflow-hidden p-0">
// //           {selectedAsset && (
// //             <div className="flex flex-col md:flex-row h-full">
// //               {/* Left: Image */}
// //               <div className="md:w-1/2 relative min-h-[300px] bg-black">
// //                 <img src={selectedAsset.image} className="absolute inset-0 w-full h-full object-contain" />
// //               </div>
              
// //               {/* Right: Details */}
// //               <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-6">
// //                 <div>
// //                   <h2 className="text-2xl font-bold mb-2">{selectedAsset.title}</h2>
// //                   <p className="text-zinc-400 text-sm">{selectedAsset.desc}</p>
// //                 </div>

// //                 <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
// //                   <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest mb-1">
// //                     <Sparkles className="w-3 h-3" /> AI Method Processing
// //                   </div>
// //                   <p className="text-zinc-300 text-sm italic">"{selectedAsset.insight}"</p>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <span className="text-xs text-zinc-500 uppercase font-bold">Token Code</span>
// //                   <div className="bg-black p-3 rounded font-mono text-xs text-green-500 border border-zinc-800 flex justify-between items-center group">
// //                     {selectedAsset.token}
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-3 mt-auto">
// //                   <Button variant="outline" className="flex-1" onClick={() => setSelectedAsset(null)}>Close</Button>
// //                   <Button className="flex-1 bg-white text-black hover:bg-zinc-200" onClick={() => handleAddToConfig(selectedAsset.token)}>
// //                     <Plus className="w-4 h-4 mr-2" /> Equip Asset
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>

// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { 
//   Camera, Lightbulb, ScanEye, Aperture, Plus, Info, 
//   CheckCircle2, Sparkles 
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast";
// import { useVisualProfile } from "@/contexts/VisualProfileContext"; // ✅ IMPORTED CONTEXT

// // ... (KEEP YOUR EXISTING ASSET_LIBRARY DATA HERE) ...
// const ASSET_LIBRARY = {
//   lighting: [
//     {
//       id: "setup_two_lights",
//       title: "Two-Point Setup",
//       category: "lighting", // Added category for logic
//       value: "Low-Key / Two-Point", // Simple value for profile
//       image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
//       token: 'lighting_setup: "key_and_rim", fill: "negative"',
//       desc: "A Key Light for the subject and a Backlight to separate them from the background.",
//       insight: "The 'Backlight' is crucial here—it creates a halo that pops the actor out from a dark background.",
//       tags: ["Studio", "Clean", "Professional"]
//     },
//     // ... (Keep other items, just ensure they have 'category' and 'value')
//   ],
//   camera: [
//      {
//       id: "cam_dutch",
//       title: "Dutch Angle",
//       category: "camera",
//       value: "Dutch Tilt / Unsettling",
//       image: "https://images.unsplash.com/photo-1519681393784-d8e5b5a4570b?w=800&q=80",
//       token: 'camera_angle: "dutch_tilt_15_deg"',
//       desc: "The camera is tilted to one side.",
//       insight: "Creates a sense of unease.",
//       tags: ["Horror", "Tension"]
//     }
//   ],
//   // ... (Keep composition and lens sections)
//   lens: [
//     {
//       id: "lens_anamorphic",
//       title: "Anamorphic Lens",
//       category: "lens",
//       value: "Anamorphic / Widescreen",
//       image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
//       token: 'lens: "anamorphic", bokeh: "oval"',
//       desc: "Produces an oval bokeh and horizontal flares.",
//       insight: "Instantly makes a scene feel like a high-budget movie.",
//       tags: ["Cinematic", "Widescreen"]
//     }
//   ]
// };

// export function DirectorAssets() {
//   const { toast } = useToast();
//   const { updateProfile } = useVisualProfile(); // ✅ USE CONTEXT
//   const [selectedAsset, setSelectedAsset] = useState<any | null>(null);

//   const handleEquip = () => {
//     if (!selectedAsset) return;

//     // 1. Update the Global Visual Profile
//     // We map the tab categories to our profile keys
//     if (selectedAsset.category === "lighting") updateProfile("lighting", selectedAsset.value);
//     if (selectedAsset.category === "lens") updateProfile("lens", selectedAsset.value);
//     if (selectedAsset.category === "camera") updateProfile("camera", selectedAsset.value);

//     // 2. Show Toast
//     toast({
//       title: "Visual Profile Updated",
//       description: `Film style set to: ${selectedAsset.title}`,
//       action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
//     });
//     setSelectedAsset(null);
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500 pb-20">
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-display font-bold text-white mb-2">Director's Asset Library</h1>
//           <p className="text-zinc-400 max-w-2xl">
//             Select a card to enforce technical specifications across your entire project.
//           </p>
//         </div>
//       </div>

//       {/* ... (KEEP YOUR TABS AND GRIDS EXACTLY AS BEFORE) ... */}
//       <Tabs defaultValue="lighting" className="w-full">
//          <TabsList className="bg-zinc-900 border-zinc-800 p-1 h-12">
//              <TabsTrigger value="lighting" className="px-6"><Lightbulb className="w-4 h-4 mr-2"/> Lighting</TabsTrigger>
//              <TabsTrigger value="camera" className="px-6"><Camera className="w-4 h-4 mr-2"/> Camera</TabsTrigger>
//              <TabsTrigger value="lens" className="px-6"><Aperture className="w-4 h-4 mr-2"/> Lens</TabsTrigger>
//          </TabsList>

//          {Object.entries(ASSET_LIBRARY).map(([key, assets]) => (
//             <TabsContent key={key} value={key} className="mt-8">
//                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {assets.map((asset: any) => (
//                      <motion.div key={asset.id} whileHover={{ y: -5 }}>
//                         <Card className="bg-zinc-900 border-zinc-800 cursor-pointer hover:border-zinc-600" onClick={() => setSelectedAsset(asset)}>
//                            <div className="aspect-video relative overflow-hidden bg-black">
//                               <img src={asset.image} className="w-full h-full object-cover opacity-80" />
//                            </div>
//                            <CardHeader className="p-4"><CardTitle className="text-lg text-white">{asset.title}</CardTitle></CardHeader>
//                         </Card>
//                      </motion.div>
//                   ))}
//                </div>
//             </TabsContent>
//          ))}
//       </Tabs>

//       {/* INSPECT MODAL */}
//       <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
//         <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl p-0">
//           {selectedAsset && (
//             <div className="flex flex-col md:flex-row h-full">
//               <div className="md:w-1/2 relative min-h-[300px] bg-black">
//                 <img src={selectedAsset.image} className="absolute inset-0 w-full h-full object-cover" />
//               </div>
//               <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-6">
//                 <div>
//                   <h2 className="text-2xl font-bold mb-2">{selectedAsset.title}</h2>
//                   <p className="text-zinc-400 text-sm">{selectedAsset.desc}</p>
//                 </div>
//                 <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
//                   <p className="text-zinc-300 text-sm italic">"{selectedAsset.insight}"</p>
//                 </div>
//                 <div className="flex gap-3 mt-auto">
//                   <Button variant="outline" className="flex-1" onClick={() => setSelectedAsset(null)}>Close</Button>
//                   {/* ✅ THE EQUIP BUTTON */}
//                   <Button className="flex-1 bg-white text-black hover:bg-zinc-200" onClick={handleEquip}>
//                     <Plus className="w-4 h-4 mr-2" /> Equip to Project
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Lightbulb, ScanEye, Aperture, Plus, Info, 
  CheckCircle2, Sparkles, Trash2 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVisualProfile } from "@/contexts/VisualProfileContext"; 

export function DirectorAssets() {
  const { toast } = useToast();
  // ✅ USE GLOBAL CONTEXT
  const { library, updateProfile, addAsset, deleteAsset } = useVisualProfile(); 
  
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newAsset, setNewAsset] = useState({
    title: "",
    category: "lighting",
    desc: "",
    image: "",
    token: ""
  });

  const handleEquip = () => {
    if (!selectedAsset) return;
    if (selectedAsset.category === "lighting") updateProfile("lighting", selectedAsset.value);
    if (selectedAsset.category === "lens") updateProfile("lens", selectedAsset.value);
    if (selectedAsset.category === "camera") updateProfile("camera", selectedAsset.value);

    toast({
      title: "Visual Profile Updated",
      description: `Film style set to: ${selectedAsset.title}`,
      action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
    });
    setSelectedAsset(null);
  };

  const handleDelete = (id: string, category: string, e: React.MouseEvent) => {
    e.stopPropagation(); 
    deleteAsset(category, id); // ✅ CALL GLOBAL DELETE
    toast({ title: "Asset Deleted", variant: "destructive" });
  };

  const handleAddAsset = () => {
    if (!newAsset.title || !newAsset.image) return;
    
    const assetEntry = {
      id: Date.now().toString(),
      title: newAsset.title,
      category: newAsset.category,
      value: newAsset.title,
      image: newAsset.image,
      token: newAsset.token || 'custom_style: "true"',
      desc: newAsset.desc,
      insight: "Director's custom uploaded asset.",
      tags: ["Custom", "User"]
    };

    addAsset(newAsset.category, assetEntry); // ✅ CALL GLOBAL ADD

    setIsAdding(false);
    setNewAsset({ title: "", category: "lighting", desc: "", image: "", token: "" });
    toast({ title: "Asset Added", description: "New style available in Studio." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Director's Asset Library</h1>
          <p className="text-zinc-400 max-w-2xl">
            Select or upload styles to enforce across your project.
          </p>
        </div>
      </div>

      <Tabs defaultValue="lighting" className="w-full">
        <TabsList className="bg-zinc-900 border-zinc-800 p-1 h-12">
          <TabsTrigger value="lighting" className="px-6"><Lightbulb className="w-4 h-4 mr-2"/> Lighting</TabsTrigger>
          <TabsTrigger value="camera" className="px-6"><Camera className="w-4 h-4 mr-2"/> Camera</TabsTrigger>
          <TabsTrigger value="composition" className="px-6"><ScanEye className="w-4 h-4 mr-2"/> Composition</TabsTrigger>
          <TabsTrigger value="lens" className="px-6"><Aperture className="w-4 h-4 mr-2"/> Lens</TabsTrigger>
        </TabsList>

        {Object.entries(library).map(([key, assets]: [string, any]) => (
          <TabsContent key={key} value={key} className="mt-8">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {assets && assets.map((asset: any) => (
                  <motion.div key={asset.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ y: -5 }}>
                    <Card 
                      className="bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer group hover:border-zinc-600 transition-colors relative"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <button 
                        onClick={(e) => handleDelete(asset.id, key, e)}
                        className="absolute top-2 right-2 z-30 p-2 bg-black/60 rounded-full text-zinc-400 hover:text-red-500 hover:bg-black opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="aspect-video relative overflow-hidden bg-black">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        <img src={asset.image} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Badge variant="secondary" className="bg-black/70 backdrop-blur text-white border-none">Inspect</Badge>
                        </div>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg text-white">{asset.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {asset.tags?.map((tag: string) => <Badge key={tag} variant="outline" className="text-[10px] text-zinc-400 border-zinc-700">{tag}</Badge>)}
                        </div>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <Card 
                className="bg-black/20 border-zinc-800 border-dashed border-2 flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 cursor-pointer transition-colors min-h-[250px]"
                onClick={() => setIsAdding(true)}
              >
                <Plus className="w-10 h-10 mb-4 opacity-50" />
                <span className="font-medium text-sm">Add New Asset</span>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* INSPECT MODAL */}
      <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-2xl p-0 overflow-hidden">
          {selectedAsset && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 relative min-h-[300px] bg-black">
                <img src={selectedAsset.image} className="absolute inset-0 w-full h-full object-contain" />
              </div>
              <div className="md:w-1/2 p-6 flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedAsset.title}</h2>
                  <p className="text-zinc-400 text-sm">{selectedAsset.desc}</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-widest mb-1">
                    <Sparkles className="w-3 h-3" /> AI Method Processing
                  </div>
                  <p className="text-zinc-300 text-sm italic">"{selectedAsset.insight}"</p>
                </div>
                <div className="flex gap-3 mt-auto">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedAsset(null)}>Close</Button>
                  <Button className="flex-1 bg-white text-black hover:bg-zinc-200" onClick={handleEquip}>
                    <Plus className="w-4 h-4 mr-2" /> Equip to Project
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ADD ASSET MODAL */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
           <DialogHeader><DialogTitle>Add Custom Asset</DialogTitle></DialogHeader>
           <div className="space-y-4 py-2">
              <div className="space-y-2"><Label>Asset Name</Label><Input className="bg-zinc-900 border-zinc-800" value={newAsset.title} onChange={e => setNewAsset({...newAsset, title: e.target.value})} /></div>
              <div className="space-y-2"><Label>Category</Label><select className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white" value={newAsset.category} onChange={e => setNewAsset({...newAsset, category: e.target.value})}><option value="lighting">Lighting</option><option value="camera">Camera</option><option value="lens">Lens</option></select></div>
              <div className="space-y-2"><Label>Image URL</Label><Input placeholder="/assets/custom.png" className="bg-zinc-900 border-zinc-800" value={newAsset.image} onChange={e => setNewAsset({...newAsset, image: e.target.value})} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="What does this style achieve?" className="bg-zinc-900 border-zinc-800" value={newAsset.desc} onChange={e => setNewAsset({...newAsset, desc: e.target.value})} /></div>
           </div>
           <DialogFooter>
              <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button className="bg-yellow-500 text-black hover:bg-yellow-400" onClick={handleAddAsset}>Add to Library</Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}