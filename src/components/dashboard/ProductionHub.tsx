import { useState } from "react";
import { 
  Box, Users, Shield, Search, Plus, 
  Truck, Sparkles, Phone, Mail, MapPin,
  CheckCircle2, Loader2, X, Download,
  Calendar, DollarSign, Clock, Trash2, FileText,
  AlertTriangle, Sun, CloudRain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

// --- MOCK DATA ---
const INITIAL_ASSETS = [
  { id: 1, name: "Gandiva Bow", type: "Prop (Hero)", owner: "Arjuna", source: "Prop Store A", status: "Ready" },
  { id: 2, name: "Golden Dice Set", type: "Prop (Key)", owner: "Shakuni", source: "Vendor (Mumbai)", status: "In Transit" },
  { id: 3, name: "War Chariot (Base)", type: "Vehicle", owner: "Krishna", source: "Workshop", status: "Construction" },
  { id: 4, name: "Peacock Feather", type: "Costume", owner: "Krishna", source: "Costume Van", status: "Ready" },
  { id: 5, name: "Heavy Maces (Foam)", type: "Stunt Prop", owner: "Bhima", source: "Stunt Tent", status: "Ready" },
];

const DEPARTMENTS = [
  { id: 1, name: "Art Department", head: "Sarah Jenkins", staff: 12, status: "Active", budgetStatus: "On Track", totalBudget: 150000, spent: 110000 },
  { id: 2, name: "Stunt Team", head: "Ravi Varma", staff: 24, status: "Rehearsing", budgetStatus: "Overburn", totalBudget: 80000, spent: 95000 },
  { id: 3, name: "Costume / Wardrobe", head: "Neeta Lulla", staff: 8, status: "Fitting", budgetStatus: "On Track", totalBudget: 60000, spent: 45000 },
  { id: 4, name: "VFX On-Set", head: "Double Negative", staff: 4, status: "Idle", budgetStatus: "Healthy", totalBudget: 200000, spent: 25000 },
];

const VENDORS = [
  { id: 1, name: "Prop Store A", service: "Hero Props", location: "Hyderabad", contact: "+91 98765...", rating: "4.8" },
  { id: 2, name: "Action Vehicles Inc", service: "Chariots/Horses", location: "Rajasthan", contact: "+91 91234...", rating: "4.5" },
  { id: 3, name: "Mumbai FX Supplies", service: "Special Effects", location: "Mumbai", contact: "+91 99887...", rating: "4.2" },
];

const AI_SUGGESTIONS = [
  {
    id: 1,
    text: "Reuse the 'Palace Pillar' 3D assets for the 'Courtroom' scene to save approx $15k.",
    saving: 0.015,
    category: "Art Dept"
  },
  {
    id: 2,
    text: "Merge travel logistics for Stunt Team and Extras to reduce transport costs by $8k.",
    saving: 0.008,
    category: "Logistics"
  },
  {
    id: 3,
    text: "Switch to LED lighting for 'Night Forest' sequence. Reduces generator fuel by $4k.",
    saving: 0.004,
    category: "Electrical"
  }
];

export function ProductionHub() {
  const { toast } = useToast();
  
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("inventory"); 
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState(2.4);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // AI Insight State
  const [insightIndex, setInsightIndex] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);

  // Modal States
  const [selectedDeptSchedule, setSelectedDeptSchedule] = useState<any>(null);
  const [selectedDeptBudget, setSelectedDeptBudget] = useState<any>(null);
  const [isViewingReport, setIsViewingReport] = useState(false); // ✅ NEW STATE FOR REPORT

  // New Item Form
  const [newItem, setNewItem] = useState({ name: "", type: "Prop", owner: "", status: "Ready" });

  // --- ACTIONS ---

  const filteredAssets = assets.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const applyAIOptimization = () => {
    if (insightIndex >= AI_SUGGESTIONS.length) return;

    const suggestion = AI_SUGGESTIONS[insightIndex];
    setBudget(prev => +(prev - suggestion.saving).toFixed(3)); 
    
    toast({
      title: `Budget Optimized (${suggestion.category})`,
      description: `Applied fix. Saved $${(suggestion.saving * 1000).toFixed(0)}k.`,
      action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
    });

    if (insightIndex + 1 < AI_SUGGESTIONS.length) {
      setInsightIndex(prev => prev + 1); 
    } else {
      setIsOptimized(true); 
    }
  };

  const handleAutoFill = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newItems = [
        { id: Math.random(), name: "Background Spears (50x)", type: "Prop (Bulk)", owner: "Extras", source: "Armory", status: "Ready" },
        { id: Math.random(), name: "Fake Blood (Barrels)", type: "SFX", owner: "Makeup", source: "Mumbai FX", status: "In Transit" },
        { id: Math.random(), name: "Forest Fog Fluid", type: "Atmosphere", owner: "SFX", source: "Local", status: "Missing" },
      ];
      setAssets([...assets, ...newItems]);
      setIsGenerating(false);
      toast({
        title: "AI Analysis Complete",
        description: "Scanned script and added 3 missing critical requirements.",
        action: <div className="p-2 bg-purple-500/20 rounded-full"><Sparkles className="w-4 h-4 text-purple-500"/></div>
      });
    }, 2000);
  };

  const handleStatusToggle = (id: number) => {
    setAssets(assets.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "Ready" ? "In Transit" : item.status === "In Transit" ? "Missing" : "Ready";
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const handleDelete = (id: number, name: string) => {
    setAssets(assets.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: `${name} has been removed from the manifest.`,
      variant: "destructive"
    });
  };

  const handleAddItem = () => {
    if (!newItem.name) return;
    setAssets([...assets, { ...newItem, id: Math.random(), source: "Added Manually" }]);
    setIsAddingItem(false);
    setNewItem({ name: "", type: "Prop", owner: "", status: "Ready" });
    toast({ title: "Asset Added", description: `${newItem.name} added to manifest.` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "In Transit": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Construction": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Missing": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-zinc-800 text-zinc-400";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">PRODUCTION COMMAND</h1>
          <p className="text-zinc-400">Asset & Resource Management • Day 14 of 42</p>
        </div>
        
        {/* ✅ OPENS REPORT MODAL */}
        <Button 
          variant="outline" 
          className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
          onClick={() => setIsViewingReport(true)}
        >
           <FileText className="w-4 h-4 mr-2" /> Daily Production Report
        </Button>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-950 border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors" onClick={() => setIsEditingBudget(true)}>
          <CardHeader className="pb-2"><CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between">Budget Burn <Badge variant="default" className="bg-green-900 text-green-400 hover:bg-green-900 text-[10px] h-5">Healthy</Badge></CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
               <h2 className="text-3xl font-bold text-white">${budget}M</h2>
               <span className="text-sm text-zinc-500">/ $8.5M</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 mt-3 rounded-full overflow-hidden">
               <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${(budget/8.5)*100}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between">Asset Status <Truck className="w-4 h-4"/></CardTitle></CardHeader>
          <CardContent>
             <h2 className="text-3xl font-bold text-white">94% <span className="text-base font-normal text-zinc-500">On Site</span></h2>
             <p className="text-xs text-zinc-400 mt-1">2 Critical Items in Transit</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-950 border-zinc-800">
          <CardHeader className="pb-2"><CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between">Crew Safety <Shield className="w-4 h-4"/></CardTitle></CardHeader>
          <CardContent>
             <h2 className="text-3xl font-bold text-white">0 <span className="text-base font-normal text-zinc-500">Incidents</span></h2>
             <p className="text-xs text-zinc-400 mt-1">Last Audit: Yesterday</p>
          </CardContent>
        </Card>

        <div className={`border rounded-xl p-4 flex flex-col justify-between transition-colors duration-500 ${isOptimized ? 'bg-green-900/20 border-green-500/30' : 'bg-gradient-to-br from-orange-900/20 to-black border-orange-500/30'}`}>
           <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2 ${isOptimized ? 'text-green-400' : 'text-orange-400'}`}>
              <Sparkles className="w-3 h-3"/> {isOptimized ? "Optimization Complete" : "AI Insight"}
           </div>
           
           <AnimatePresence mode="wait">
             <motion.p 
                key={insightIndex}
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -5 }}
                className={`text-sm leading-snug ${isOptimized ? 'text-green-100/90' : 'text-orange-100/90'}`}
             >
               {isOptimized 
                 ? "All production workflows have been optimized for maximum efficiency." 
                 : `"${AI_SUGGESTIONS[insightIndex].text}"`
               }
             </motion.p>
           </AnimatePresence>

           {!isOptimized && (
             <button onClick={applyAIOptimization} className="mt-3 text-xs font-bold text-orange-400 hover:text-orange-300 text-left transition-colors">
               Apply Optimization ({insightIndex + 1}/{AI_SUGGESTIONS.length}) →
             </button>
           )}
        </div>
      </div>

      {/* --- TOOLBAR --- */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-950 p-2 rounded-xl border border-zinc-800">
         <div className="flex gap-1 p-1 bg-zinc-900/50 rounded-lg w-full md:w-auto">
            <Button 
              variant={activeTab === 'inventory' ? "secondary" : "ghost"} 
              size="sm" onClick={() => setActiveTab('inventory')}
              className={`h-8 ${activeTab === 'inventory' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
            >
              <Box className="w-3 h-3 mr-2"/> Asset Inventory
            </Button>
            <Button 
              variant={activeTab === 'departments' ? "secondary" : "ghost"} 
              size="sm" onClick={() => setActiveTab('departments')}
              className={`h-8 ${activeTab === 'departments' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
            >
              <Users className="w-3 h-3 mr-2"/> Departments
            </Button>
            <Button 
              variant={activeTab === 'vendors' ? "secondary" : "ghost"} 
              size="sm" onClick={() => setActiveTab('vendors')}
              className={`h-8 ${activeTab === 'vendors' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
            >
              <Truck className="w-3 h-3 mr-2"/> Vendors
            </Button>
         </div>

         {activeTab === 'inventory' && (
           <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                 <Input 
                   placeholder="Search (e.g., 'Arjuna', 'Prop')..." 
                   className="pl-9 bg-zinc-900 border-zinc-800 h-9" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
              <Button className="h-9 bg-yellow-500 text-black hover:bg-yellow-400" onClick={() => setIsAddingItem(true)}>
                 <Plus className="w-4 h-4 mr-2"/> New Item
              </Button>
           </div>
         )}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="min-h-[400px]">
        
        {/* VIEW 1: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             <AnimatePresence>
                {filteredAssets.map((item) => (
                   <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                      <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-all group">
                         <CardContent className="p-5 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                               <Box className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300" />
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between items-start mb-1">
                                  <h3 className="font-bold text-white text-base">{item.name}</h3>
                                  <div className="flex items-center gap-2">
                                     <Badge 
                                        variant="outline" 
                                        className={`cursor-pointer select-none ${getStatusColor(item.status)}`}
                                        onClick={() => handleStatusToggle(item.id)}
                                     >
                                        {item.status}
                                     </Badge>
                                     <Button 
                                       size="icon" variant="ghost" className="h-6 w-6 text-zinc-600 hover:text-red-500 hover:bg-red-500/10"
                                       onClick={() => handleDelete(item.id, item.name)}
                                     >
                                        <Trash2 className="w-3 h-3" />
                                     </Button>
                                  </div>
                               </div>
                               <p className="text-xs text-zinc-400 mb-3">{item.type}</p>
                               <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 pt-3">
                                  <span className="flex items-center gap-1"><Users className="w-3 h-3"/> {item.owner}</span>
                                  <span>{item.source}</span>
                               </div>
                            </div>
                         </CardContent>
                      </Card>
                   </motion.div>
                ))}
             </AnimatePresence>

             {!searchQuery && (
               <Card 
                 className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 border-dashed border-2 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:border-yellow-500/50 transition-colors group ${isGenerating ? 'opacity-50 pointer-events-none' : ''}`}
                 onClick={handleAutoFill}
               >
                  {isGenerating ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mb-3" />
                      <h3 className="font-bold text-white text-sm">Scanning Script...</h3>
                      <p className="text-xs text-zinc-500 mt-1">Identifying missing props</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-3 group-hover:bg-yellow-500/20 transition-colors">
                         <Sparkles className="w-6 h-6 text-yellow-500" />
                      </div>
                      <h3 className="font-bold text-white text-sm">AI AUTO-FILL</h3>
                      <p className="text-xs text-zinc-500 mt-1">Generate list from Script Analysis</p>
                    </>
                  )}
               </Card>
             )}
          </div>
        )}

        {/* VIEW 2: DEPARTMENTS */}
        {activeTab === 'departments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-4">
             {DEPARTMENTS.map(dept => (
               <Card key={dept.id} className="bg-zinc-900 border-zinc-800">
                 <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-lg text-white">{dept.name}</CardTitle>
                   <Badge variant="outline" className={dept.budgetStatus === 'Overburn' ? 'text-red-500 border-red-500/20' : 'text-green-500 border-green-500/20'}>{dept.budgetStatus}</Badge>
                 </CardHeader>
                 <CardContent>
                   <div className="flex justify-between items-center mt-2 p-3 bg-black/20 rounded-lg">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase">Head of Dept</p>
                        <p className="text-sm font-bold text-zinc-200">{dept.head}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-500 uppercase">Staff Count</p>
                        <p className="text-sm font-bold text-zinc-200">{dept.staff} Members</p>
                      </div>
                   </div>
                   <div className="mt-4 flex gap-2">
                      <Button 
                        size="sm" variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800"
                        onClick={() => setSelectedDeptSchedule(dept)}
                      >
                        <Calendar className="w-3 h-3 mr-2" /> View Schedule
                      </Button>
                      <Button 
                        size="sm" variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800"
                        onClick={() => setSelectedDeptBudget(dept)}
                      >
                        <DollarSign className="w-3 h-3 mr-2" /> Budget
                      </Button>
                   </div>
                 </CardContent>
               </Card>
             ))}
          </motion.div>
        )}

        {/* VIEW 3: VENDORS */}
        {activeTab === 'vendors' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {VENDORS.map(vendor => (
               <Card key={vendor.id} className="bg-zinc-900 border-zinc-800">
                 <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-10 h-10 bg-blue-900/20 rounded-full flex items-center justify-center text-blue-400">
                          <Truck className="w-5 h-5" />
                       </div>
                       <Badge className="bg-zinc-800 text-zinc-300">⭐ {vendor.rating}</Badge>
                    </div>
                    <h3 className="font-bold text-white text-lg">{vendor.name}</h3>
                    <p className="text-sm text-zinc-400 mb-4">{vendor.service}</p>
                    
                    <div className="space-y-2 text-sm text-zinc-500">
                       <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {vendor.location}</div>
                       <div className="flex items-center gap-2"><Phone className="w-4 h-4"/> {vendor.contact}</div>
                    </div>
                    <div className="mt-6 flex gap-2">
                       <Button size="sm" className="flex-1 bg-white text-black hover:bg-zinc-200"><Phone className="w-3 h-3 mr-2"/> Call</Button>
                       <Button size="sm" variant="outline" className="flex-1 border-zinc-700"><Mail className="w-3 h-3 mr-2"/> Email</Button>
                    </div>
                 </CardContent>
               </Card>
             ))}
          </motion.div>
        )}
      </div>

      {/* --- MODALS --- */}

      {/* ✅ NEW: DAILY PRODUCTION REPORT (PDF STYLE) */}
      <Dialog open={isViewingReport} onOpenChange={setIsViewingReport}>
         <DialogContent className="bg-white text-black max-w-3xl overflow-y-auto max-h-[85vh] p-0">
            {/* Header */}
            <div className="p-8 border-b-4 border-black">
               <div className="flex justify-between items-start">
                  <div>
                     <h1 className="text-4xl font-black font-serif tracking-tighter uppercase mb-1">CineIntent Studio</h1>
                     <p className="text-sm font-mono text-zinc-600">DAILY PRODUCTION REPORT</p>
                  </div>
                  <div className="text-right font-mono text-sm">
                     <p>DATE: <span className="font-bold">JAN 31, 2026</span></p>
                     <p>DAY: <span className="font-bold">14 of 42</span></p>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8 font-mono text-sm">
               
               {/* Section 1: Logistics */}
               <div className="grid grid-cols-2 gap-8">
                  <div className="border border-black p-4">
                     <h3 className="font-bold bg-black text-white px-2 py-1 mb-3 inline-block">LOCATION</h3>
                     <p>CYBER CITY - STAGE A</p>
                     <p className="text-zinc-500 mt-1">Interior Courtroom Set</p>
                  </div>
                  <div className="border border-black p-4">
                     <h3 className="font-bold bg-black text-white px-2 py-1 mb-3 inline-block">WEATHER</h3>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2"><Sun className="w-4 h-4"/> 28°C / Clear</div>
                        <div className="flex items-center gap-2 text-zinc-400"><CloudRain className="w-4 h-4"/> 0% Chance</div>
                     </div>
                  </div>
               </div>

               {/* Section 2: Progress */}
               <div className="border border-black">
                  <div className="bg-zinc-100 border-b border-black p-2 font-bold flex justify-between">
                     <span>SCENES SCHEDULED</span>
                     <span>STATUS</span>
                  </div>
                  <div className="p-4 space-y-2">
                     <div className="flex justify-between items-center">
                        <span>SCENE 42 - The Dice Game (INT)</span>
                        <Badge className="bg-green-600 text-white hover:bg-green-700">COMPLETED</Badge>
                     </div>
                     <div className="flex justify-between items-center">
                        <span>SCENE 43 - Draupadi's Vow (INT)</span>
                        <Badge className="bg-green-600 text-white hover:bg-green-700">COMPLETED</Badge>
                     </div>
                     <div className="flex justify-between items-center text-zinc-400">
                        <span>SCENE 45 - The Exile Begins (EXT)</span>
                        <Badge variant="outline">PUSHED TO TMRW</Badge>
                     </div>
                  </div>
               </div>

               {/* Section 3: Crew Call */}
               <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-zinc-100 p-3 rounded">
                     <p className="text-xs text-zinc-500">CREW CALL</p>
                     <p className="text-xl font-bold">06:00 AM</p>
                  </div>
                  <div className="bg-zinc-100 p-3 rounded">
                     <p className="text-xs text-zinc-500">LUNCH</p>
                     <p className="text-xl font-bold">13:00 PM</p>
                  </div>
                  <div className="bg-zinc-100 p-3 rounded">
                     <p className="text-xs text-zinc-500">WRAP</p>
                     <p className="text-xl font-bold">19:30 PM</p>
                  </div>
               </div>

               {/* Footer */}
               <div className="pt-4 border-t border-zinc-200 flex justify-between items-center text-zinc-400 text-xs">
                  <p>GENERATED BY CINEINTENT AI ENGINE</p>
                  <p>ID: DPR-2025-10-24-A</p>
               </div>
            </div>

            <DialogFooter className="bg-zinc-50 p-4 border-t border-zinc-200">
               <Button variant="outline" onClick={() => setIsViewingReport(false)}>Close Preview</Button>
               <Button className="bg-black text-white hover:bg-zinc-800" onClick={() => {
                  toast({ title: "Downloading...", description: "DPR_Day14.pdf saved to device." });
                  setIsViewingReport(false);
               }}>
                  <Download className="w-4 h-4 mr-2"/> Download PDF
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* [KEEP THE OTHER MODALS: ADD ITEM, BUDGET, SCHEDULE] */}
      
      {/* 1. Add Item */}
      <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader><DialogTitle>Add New Asset</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase">Item Name</span>
                  <Input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="bg-zinc-900 border-zinc-800" placeholder="Ex: Arjuna's Quiver"/>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <span className="text-xs font-bold text-zinc-500 uppercase">Owner/Actor</span>
                     <Input value={newItem.owner} onChange={(e) => setNewItem({...newItem, owner: e.target.value})} className="bg-zinc-900 border-zinc-800" placeholder="Ex: Arjuna"/>
                  </div>
                  <div className="space-y-2">
                     <span className="text-xs font-bold text-zinc-500 uppercase">Type</span>
                     <Select onValueChange={(v) => setNewItem({...newItem, type: v})} defaultValue="Prop">
                        <SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue placeholder="Type" /></SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                           <SelectItem value="Prop">Prop</SelectItem>
                           <SelectItem value="Costume">Costume</SelectItem>
                           <SelectItem value="Vehicle">Vehicle</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </div>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setIsAddingItem(false)}>Cancel</Button>
               <Button onClick={handleAddItem} className="bg-yellow-500 text-black hover:bg-yellow-400">Add to Manifest</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* 2. Edit Budget */}
      <Dialog open={isEditingBudget} onOpenChange={setIsEditingBudget}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white w-[300px]">
            <DialogHeader><DialogTitle>Adjust Budget</DialogTitle></DialogHeader>
            <div className="py-4 flex items-center gap-2">
               <span className="text-xl font-bold">$</span>
               <Input 
                 type="number" 
                 value={budget} 
                 onChange={(e) => setBudget(parseFloat(e.target.value))} 
                 className="bg-zinc-900 border-zinc-800 text-xl font-bold"
               />
               <span className="text-xl font-bold">M</span>
            </div>
            <DialogFooter>
               <Button onClick={() => setIsEditingBudget(false)} className="w-full">Update</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* 3. Dept Schedule */}
      <Dialog open={!!selectedDeptSchedule} onOpenChange={() => setSelectedDeptSchedule(null)}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-500" /> {selectedDeptSchedule?.name} - Weekly Schedule
               </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                  <div key={day} className="flex items-center gap-4 p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                     <div className="w-10 text-xs font-bold text-zinc-500 uppercase">{day}</div>
                     <div className="flex-1">
                        <p className="text-sm font-medium text-white">{['Safety Briefing', 'Set Construction', 'Rehearsal', 'Camera Test', 'Shoot Day 1'][i]}</p>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1"><Clock className="w-3 h-3" /> 08:00 AM - 06:00 PM</div>
                     </div>
                     <Badge variant="outline" className="border-zinc-700 text-zinc-400">Scheduled</Badge>
                  </div>
               ))}
            </div>
            <DialogFooter><Button onClick={() => setSelectedDeptSchedule(null)}>Close</Button></DialogFooter>
         </DialogContent>
      </Dialog>

      {/* 4. Dept Budget */}
      <Dialog open={!!selectedDeptBudget} onOpenChange={() => setSelectedDeptBudget(null)}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" /> {selectedDeptBudget?.name} - Financials
               </DialogTitle>
            </DialogHeader>
            {selectedDeptBudget && (
               <div className="space-y-6 py-2">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-xs text-zinc-500 uppercase mb-1">Total Spent</p>
                        <h2 className="text-3xl font-bold text-white">${selectedDeptBudget.spent.toLocaleString()}</h2>
                     </div>
                     <div className="text-right">
                        <p className="text-xs text-zinc-500 uppercase mb-1">Budget Cap</p>
                        <p className="text-lg font-medium text-zinc-400">${selectedDeptBudget.totalBudget.toLocaleString()}</p>
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between text-xs text-zinc-400">
                        <span>Utilization</span>
                        <span>{Math.round((selectedDeptBudget.spent / selectedDeptBudget.totalBudget) * 100)}%</span>
                     </div>
                     <Progress value={(selectedDeptBudget.spent / selectedDeptBudget.totalBudget) * 100} className="h-2 bg-zinc-800" />
                  </div>

                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                     <h4 className="text-xs font-bold text-zinc-500 uppercase">Recent Expenses</h4>
                     <div className="flex justify-between text-sm"><span className="text-zinc-300">Labor & Wages</span><span className="font-mono text-white">$12,400</span></div>
                     <div className="flex justify-between text-sm"><span className="text-zinc-300">Materials</span><span className="font-mono text-white">$8,250</span></div>
                     <div className="flex justify-between text-sm"><span className="text-zinc-300">Equipment Rental</span><span className="font-mono text-white">$3,100</span></div>
                  </div>
               </div>
            )}
            <DialogFooter><Button onClick={() => setSelectedDeptBudget(null)}>Close</Button></DialogFooter>
         </DialogContent>
      </Dialog>

    </div>
  );
}