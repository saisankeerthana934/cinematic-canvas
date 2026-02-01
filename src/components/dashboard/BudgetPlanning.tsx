import { useState } from "react";
import { 
  DollarSign, PieChart, TrendingUp, AlertTriangle, 
  Plus, MoreHorizontal, Trash2, Pencil, CheckCircle2, 
  Calculator, ArrowUpRight, TrendingDown, Wallet, Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const INITIAL_BUDGET_ITEMS = [
  { id: 1, category: "Cast", spent: 320000, total: 450000, status: "Healthy" },
  { id: 2, category: "Crew", spent: 245000, total: 280000, status: "Caution" },
  { id: 3, category: "Equipment", spent: 175000, total: 180000, status: "Critical" }, // High usage
  { id: 4, category: "Locations", spent: 85000, total: 120000, status: "Healthy" },
  { id: 5, category: "Post-Production", spent: 45000, total: 200000, status: "Healthy" },
  { id: 6, category: "Marketing", spent: 12000, total: 150000, status: "Healthy" },
];

export function BudgetPlanning() {
  const { toast } = useToast();
  
  // --- STATE ---
  const [items, setItems] = useState(INITIAL_BUDGET_ITEMS);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<any>(null);
  const [newItem, setNewItem] = useState({ category: "", spent: "", total: "" });

  // AI State
  const [isSimulating, setIsSimulating] = useState(false);
  const [riskResolved, setRiskResolved] = useState(false);

  // --- CALCULATIONS ---
  const totalBudget = items.reduce((acc, item) => acc + item.total, 0);
  const totalSpent = items.reduce((acc, item) => acc + item.spent, 0);
  const percentSpent = (totalSpent / totalBudget) * 100;

  // --- ACTIONS ---

  // 1. AI MANAGER: Forecast & Adjust
  const runAISimulation = () => {
    setIsSimulating(true);
    toast({ title: "AI Assistant", description: "Analyzing spending patterns..." });

    setTimeout(() => {
      // Logic: AI notices Marketing is underspent and Post-Production needs more.
      const optimizedItems = items.map(item => {
        if (item.category === "Marketing") {
           return { ...item, total: item.total - 20000 }; // Cut $20k
        }
        if (item.category === "Post-Production") {
           return { ...item, total: item.total + 20000 }; // Add $20k
        }
        return item;
      });

      setItems(optimizedItems);
      setIsSimulating(false);
      
      toast({ 
        title: "Budget Re-Balanced", 
        description: "AI moved $20k from Marketing to Post-Production based on projected needs.",
        action: <div className="p-2 bg-purple-500/20 rounded-full"><Sparkles className="w-4 h-4 text-purple-500"/></div>
      });
    }, 2000);
  };

  // 2. AI MANAGER: Fix Critical Risks
  const resolveRisk = () => {
    // Logic: Increase Equipment budget by taking from a new "Contingency" fund
    const updatedItems = items.map(item => {
        if (item.category === "Equipment") {
            return { ...item, total: item.total + 15000, status: "Healthy" }; // Fix the risk
        }
        return item;
    });

    setItems(updatedItems);
    setRiskResolved(true);
    toast({ 
        title: "Risk Resolved", 
        description: "Injected $15k contingency into Equipment budget.",
        action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
    });
  };

  const handleAddItem = () => {
    if (!newItem.category || !newItem.total) return;
    const item = {
      id: Math.random(),
      category: newItem.category,
      spent: Number(newItem.spent) || 0,
      total: Number(newItem.total),
      status: "Healthy"
    };
    setItems([...items, item]);
    setIsAdding(false);
    setNewItem({ category: "", spent: "", total: "" });
    toast({ title: "Budget Line Added", description: `${item.category} added to tracker.` });
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id));
    toast({ title: "Deleted", description: "Budget line removed.", variant: "destructive" });
  };

  const handleUpdate = () => {
    if (!isEditing) return;
    setItems(items.map(i => i.id === isEditing.id ? { ...isEditing, spent: Number(isEditing.spent), total: Number(isEditing.total) } : i));
    setIsEditing(null);
    toast({ title: "Updated", description: "Budget values saved." });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-1">Financial Command</h1>
          <p className="text-zinc-400">AI-driven production spend tracking and forecasting.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-white" onClick={runAISimulation} disabled={isSimulating}>
             {isSimulating ? <Calculator className="w-4 h-4 mr-2 animate-spin"/> : <Sparkles className="w-4 h-4 mr-2 text-purple-400"/>}
             {isSimulating ? "Optimizing..." : "Run AI Forecast"}
           </Button>
           <Button variant="outline" className="border-zinc-700 bg-zinc-900 text-white">
             <ArrowUpRight className="w-4 h-4 mr-2" /> Export Report
           </Button>
        </div>
      </div>

      {/* --- TOP STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Main Pot */}
         <Card className="bg-zinc-950 border-zinc-800 md:col-span-2">
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Total Production Budget</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex justify-between items-end mb-4">
                  <div>
                     <span className="text-4xl font-bold text-white">${(totalSpent / 1000).toFixed(1)}k</span>
                     <span className="text-xl text-zinc-500"> / ${(totalBudget / 1000).toFixed(1)}k</span>
                  </div>
                  <Badge variant={percentSpent > 90 ? "destructive" : "outline"} className={percentSpent < 90 ? "text-green-500 border-green-500/20 bg-green-500/10" : ""}>
                     {percentSpent.toFixed(1)}% Utilized
                  </Badge>
               </div>
               <Progress value={percentSpent} className="h-4 bg-zinc-900" />
            </CardContent>
         </Card>

         {/* AI Risk Alert */}
         <Card className={`bg-zinc-950 border-zinc-800 transition-colors ${riskResolved ? 'border-green-500/30' : 'border-red-500/30 bg-red-950/10'}`}>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-bold uppercase flex items-center gap-2">
                  {riskResolved ? <CheckCircle2 className="w-4 h-4 text-green-500"/> : <AlertTriangle className="w-4 h-4 text-red-500"/>}
                  {riskResolved ? "Risk Mitigated" : "High Risk Detected"}
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-zinc-300 mb-4">
                  {riskResolved 
                    ? "AI has re-balanced the Equipment budget. Spending is now within safe limits."
                    : "Equipment budget is at 97% utilization. Projected to hit 115% by Day 20."
                  }
               </p>
               {!riskResolved && (
                 <Button size="sm" variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-900/50" onClick={resolveRisk}>
                    Auto-Resolve Risk
                 </Button>
               )}
            </CardContent>
         </Card>
      </div>

      {/* --- BUDGET BREAKDOWN LIST --- */}
      <Card className="bg-zinc-950 border-zinc-800">
         <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-800 pb-4">
            <div>
               <CardTitle className="text-lg text-white">Budget Breakdown</CardTitle>
               <CardDescription>Line item expenses by department.</CardDescription>
            </div>
            <Button className="bg-yellow-500 text-black hover:bg-yellow-400" onClick={() => setIsAdding(true)}>
               <Plus className="w-4 h-4 mr-2" /> Add Expense
            </Button>
         </CardHeader>
         <CardContent className="pt-6 space-y-6">
            <AnimatePresence>
               {items.map((item) => {
                  const percentage = (item.spent / item.total) * 100;
                  const isCritical = percentage > 90;

                  return (
                     <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="group"
                     >
                        <div className="flex justify-between items-end mb-2">
                           <div className="flex items-center gap-3">
                              <span className="font-bold text-white text-base">{item.category}</span>
                              {isCritical && <Badge variant="destructive" className="text-[10px] h-5">Overburn</Badge>}
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="text-right">
                                 <span className="text-white font-mono font-bold">${item.spent.toLocaleString()}</span>
                                 <span className="text-zinc-500 text-sm mx-1">/</span>
                                 <motion.span 
                                    key={item.total} // Animates when number changes
                                    initial={{ scale: 1.2, color: "#a855f7" }}
                                    animate={{ scale: 1, color: "#71717a" }}
                                    className="text-sm"
                                 >
                                    ${item.total.toLocaleString()}
                                 </motion.span>
                              </div>
                              
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Button size="icon" variant="ghost" className="h-6 w-6 text-zinc-400 hover:text-white" onClick={() => setIsEditing(item)}>
                                    <Pencil className="w-3 h-3" />
                                 </Button>
                                 <Button size="icon" variant="ghost" className="h-6 w-6 text-zinc-400 hover:text-red-500" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="w-3 h-3" />
                                 </Button>
                              </div>
                           </div>
                        </div>
                        <Progress value={percentage} className="h-2 bg-zinc-900" />
                     </motion.div>
                  );
               })}
            </AnimatePresence>
         </CardContent>
      </Card>

      {/* --- ADD EXPENSE MODAL --- */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader><DialogTitle>Add New Budget Line</DialogTitle></DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="space-y-2">
                  <Label>Category Name</Label>
                  <Input 
                     placeholder="e.g. Drone Unit" 
                     className="bg-zinc-900 border-zinc-800"
                     value={newItem.category}
                     onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label>Total Budget ($)</Label>
                     <Input 
                        type="number" 
                        placeholder="50000" 
                        className="bg-zinc-900 border-zinc-800"
                        value={newItem.total}
                        onChange={(e) => setNewItem({...newItem, total: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Already Spent ($)</Label>
                     <Input 
                        type="number" 
                        placeholder="0" 
                        className="bg-zinc-900 border-zinc-800"
                        value={newItem.spent}
                        onChange={(e) => setNewItem({...newItem, spent: e.target.value})}
                     />
                  </div>
               </div>
            </div>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
               <Button onClick={handleAddItem} className="bg-yellow-500 text-black hover:bg-yellow-400">Add Line Item</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

      {/* --- EDIT EXPENSE MODAL --- */}
      <Dialog open={!!isEditing} onOpenChange={() => setIsEditing(null)}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader><DialogTitle>Edit {isEditing?.category}</DialogTitle></DialogHeader>
            {isEditing && (
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Total Allocation</Label>
                            <Input 
                                type="number" 
                                value={isEditing.total} 
                                onChange={(e) => setIsEditing({...isEditing, total: e.target.value})}
                                className="bg-zinc-900 border-zinc-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Current Spend</Label>
                            <Input 
                                type="number" 
                                value={isEditing.spent} 
                                onChange={(e) => setIsEditing({...isEditing, spent: e.target.value})}
                                className="bg-zinc-900 border-zinc-800"
                            />
                        </div>
                    </div>
                </div>
            )}
            <DialogFooter>
               <Button variant="ghost" onClick={() => setIsEditing(null)}>Cancel</Button>
               <Button onClick={handleUpdate} className="bg-white text-black hover:bg-zinc-200">Save Changes</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}
