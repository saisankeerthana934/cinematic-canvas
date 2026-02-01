import { useState } from "react";
import { 
  Users, Film, DollarSign, Calendar, Search, 
  Plus, MoreHorizontal, Shield, Mail, Lock, 
  CheckCircle2, XCircle, Trash2, Ban
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const INITIAL_DIRECTORS = [
  { id: 1, name: "Sarah Chen", email: "sarah@studio.com", projects: 3, status: "Active", joined: "Oct 2024", role: "Director" },
  { id: 2, name: "Mike Roberts", email: "mike@studio.com", projects: 5, status: "Active", joined: "Sep 2024", role: "Producer" },
  { id: 3, name: "Lisa Park", email: "lisa@studio.com", projects: 2, status: "Pending", joined: "Jan 2025", role: "Director" },
  { id: 4, name: "David Kim", email: "david@indie.com", projects: 0, status: "Inactive", joined: "Nov 2024", role: "Writer" },
];

export function AdminDashboard() {
  const { toast } = useToast();
  
  // --- STATE ---
  const [directors, setDirectors] = useState(INITIAL_DIRECTORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  // New Director Form State
  const [newDirector, setNewDirector] = useState({ name: "", email: "", role: "Director" });

  // --- ACTIONS ---

  const filteredDirectors = directors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDirector = () => {
    if (!newDirector.name || !newDirector.email) return;
    
    const newEntry = {
      id: directors.length + 1,
      name: newDirector.name,
      email: newDirector.email,
      role: newDirector.role,
      projects: 0,
      status: "Active",
      joined: "Just Now"
    };

    setDirectors([newEntry, ...directors]);
    setIsAdding(false);
    setNewDirector({ name: "", email: "", role: "Director" });
    
    toast({
      title: "Director Added",
      description: `${newEntry.name} has been sent an invite link.`,
      action: <div className="p-2 bg-green-500/20 rounded-full"><CheckCircle2 className="w-4 h-4 text-green-500"/></div>
    });
  };

  const handleDelete = (id: number) => {
    setDirectors(directors.filter(d => d.id !== id));
    toast({ title: "User Removed", description: "Director account deleted.", variant: "destructive" });
  };

  const handleToggleStatus = (id: number) => {
    setDirectors(directors.map(d => {
      if (d.id === id) {
        const newStatus = d.status === "Active" ? "Inactive" : "Active";
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">ADMIN DASHBOARD</h1>
          <p className="text-zinc-400">Manage directors, projects, and system settings.</p>
        </div>
        <Button className="bg-yellow-500 text-black hover:bg-yellow-400" onClick={() => setIsAdding(true)}>
          <Users className="w-4 h-4 mr-2" /> Add Director
        </Button>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs uppercase font-bold">Total Directors</p>
              <h2 className="text-3xl font-bold text-white mt-1">{directors.length}</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Users className="w-5 h-5"/></div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs uppercase font-bold">Active Projects</p>
              <h2 className="text-3xl font-bold text-white mt-1">47</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500"><Film className="w-5 h-5"/></div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs uppercase font-bold">Total Budget</p>
              <h2 className="text-3xl font-bold text-white mt-1">$12.4M</h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><DollarSign className="w-5 h-5"/></div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-950 border-zinc-800">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs uppercase font-bold">This Month</p>
              <h2 className="text-3xl font-bold text-white mt-1">9 <span className="text-sm font-normal text-zinc-500">New Users</span></h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500"><Calendar className="w-5 h-5"/></div>
          </CardContent>
        </Card>
      </div>

      {/* --- MANAGEMENT SECTION --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* LEFT: DIRECTOR LIST */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-bold text-white">Director Management</h3>
             <div className="relative w-64">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
               <Input 
                 placeholder="Search directors..." 
                 className="pl-9 bg-zinc-900 border-zinc-800 h-9" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {filteredDirectors.map((director) => (
                <motion.div 
                  key={director.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center justify-between group hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center text-white font-bold">
                      {director.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {director.name}
                        {director.role === "Producer" && <Badge variant="secondary" className="text-[10px] h-4 bg-purple-500/10 text-purple-400">PRODUCER</Badge>}
                      </h4>
                      <p className="text-xs text-zinc-500">{director.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-zinc-500">Projects</p>
                      <p className="text-sm font-bold text-white">{director.projects}</p>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={`cursor-pointer select-none ${director.status === "Active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}
                      onClick={() => handleToggleStatus(director.id)}
                    >
                      {director.status}
                    </Badge>

                    <div className="flex gap-1">
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10" onClick={() => handleDelete(director.id)}>
                          <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT: PROJECT STATUS CHART (Simulated) */}
        <div className="space-y-6">
           <h3 className="text-lg font-bold text-white">Project Status</h3>
           <Card className="bg-zinc-950 border-zinc-800 h-[400px] flex flex-col items-center justify-center p-6 relative">
              <div className="w-48 h-48 rounded-full border-[16px] border-zinc-900 border-t-yellow-500 border-r-yellow-500/50 rotate-45 relative">
                 <div className="absolute inset-0 flex items-center justify-center -rotate-45 flex-col">
                    <span className="text-3xl font-bold text-white">47</span>
                    <span className="text-xs text-zinc-500 uppercase">Total</span>
                 </div>
              </div>
              
              <div className="w-full mt-8 space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400"><div className="w-2 h-2 bg-yellow-500 rounded-full"/> Active</span>
                    <span className="text-white font-bold">12</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400"><div className="w-2 h-2 bg-yellow-900 rounded-full"/> In Progress</span>
                    <span className="text-white font-bold">8</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-zinc-400"><div className="w-2 h-2 bg-zinc-800 rounded-full"/> Completed</span>
                    <span className="text-white font-bold">24</span>
                 </div>
              </div>
           </Card>
        </div>

      </div>

      {/* --- ADD DIRECTOR MODAL --- */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
         <DialogContent className="bg-zinc-950 border-zinc-800 text-white">
            <DialogHeader><DialogTitle>Add New Director</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
               <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                     placeholder="e.g. John Nolan" 
                     className="bg-zinc-900 border-zinc-800"
                     value={newDirector.name}
                     onChange={(e) => setNewDirector({...newDirector, name: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input 
                     placeholder="john@studio.com" 
                     className="bg-zinc-900 border-zinc-800"
                     value={newDirector.email}
                     onChange={(e) => setNewDirector({...newDirector, email: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <Label>Role</Label>
                  <Select onValueChange={(v) => setNewDirector({...newDirector, role: v})} defaultValue="Director">
                     <SelectTrigger className="bg-zinc-900 border-zinc-800"><SelectValue placeholder="Select Role" /></SelectTrigger>
                     <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value="Director">Director</SelectItem>
                        <SelectItem value="Producer">Producer</SelectItem>
                        <SelectItem value="Writer">Writer</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <DialogFooter>
               <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
               <Button onClick={handleAddDirector} className="bg-yellow-500 text-black hover:bg-yellow-400">Send Invite</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>

    </div>
  );
}
