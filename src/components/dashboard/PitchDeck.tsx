import { MOCK_PROJECT } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Download, Share2, TrendingUp, Users, DollarSign, Film, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PitchDeck() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exporting to PDF...",
      description: "Compiling investor assets.",
    });
  };

  // Safe Accessors (Prevents crashing if data is missing)
  // We default to Mahabharata values if the specific field is missing in mockData
  const title = MOCK_PROJECT.script?.title || "MAHABHARATA";
  const subtitle = MOCK_PROJECT.script?.subtitle || "A War of Dharma";
  const logline = MOCK_PROJECT.script?.logline || "A cosmic saga of duty, destiny, and the ultimate war between good and evil.";
  const characters = MOCK_PROJECT.script?.characters || [];
  
  // Production Defaults (Hardcoded fallbacks for the demo visuals)
  const budget = (MOCK_PROJECT as any).production?.budget || 250000000;
  const crew = (MOCK_PROJECT as any).production?.crew || ["VFX Supervisor", "Mythology Consultant", "Composer"];
  const cameraStyle = (MOCK_PROJECT as any).visuals?.camera || "IMAX 70mm / Large Format";

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-6 animate-in fade-in duration-500">
      
      {/* HEADER ACTIONS */}
      <div className="flex justify-between items-center px-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Investor Deck</h1>
          <p className="text-muted-foreground">Series A Proposal • Q1 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Link Copied" })}>
            <Share2 className="mr-2 h-4 w-4" /> Share Link
          </Button>
          <Button onClick={handleExport} className="bg-primary text-black hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* MAIN SLIDE STAGE */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Carousel className="w-full max-w-5xl" opts={{ loop: true }}>
          <CarouselContent>
            
            {/* SLIDE 1: THE TITLE CARD */}
            <CarouselItem>
              <Card className="h-[550px] border-zinc-800 bg-black overflow-hidden relative group">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black z-0"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] bg-cover bg-center"></div>
                
                <CardContent className="relative h-full flex flex-col justify-center items-center text-center p-16 z-10">
                  <Badge className="mb-8 bg-amber-500/10 text-amber-500 border-amber-500/20 px-4 py-1 text-sm tracking-[0.3em] uppercase">
                    Feature Film Proposal
                  </Badge>
                  <h1 className="text-9xl font-display font-bold text-white mb-6 tracking-tighter drop-shadow-2xl">
                    {title}
                  </h1>
                  <h2 className="text-2xl text-primary font-display tracking-widest uppercase mb-8">
                    {subtitle}
                  </h2>
                  <p className="text-xl text-zinc-300 max-w-3xl font-light leading-relaxed">
                    "{logline}"
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>

            {/* SLIDE 2: THE CAST & CHARACTERS */}
            <CarouselItem>
              <div className="grid grid-cols-12 gap-4 h-[550px]">
                {/* Left: Text Info */}
                <Card className="col-span-4 border-zinc-800 bg-zinc-900/50 p-8 flex flex-col justify-center">
                  <Film className="w-12 h-12 text-primary mb-6" />
                  <h2 className="text-4xl font-display font-bold mb-4 text-white">The Ensemble</h2>
                  <p className="text-zinc-400 mb-8">
                    A star-studded cast bringing the epic of Mahabharata to life.
                    Targeting A-list talent for global appeal.
                  </p>
                  <div className="space-y-3">
                     <div className="p-3 bg-black/40 rounded border border-white/5">
                        <h4 className="font-bold text-xs uppercase text-zinc-500 mb-1">Target Demographic</h4>
                        <p className="text-white">Global (18-45), Mythology Enthusiasts</p>
                     </div>
                     <div className="p-3 bg-black/40 rounded border border-white/5">
                        <h4 className="font-bold text-xs uppercase text-zinc-500 mb-1">Visual Style</h4>
                        <p className="text-white">{cameraStyle}</p>
                     </div>
                  </div>
                </Card>

                {/* Right: Character Cards */}
                <Card className="col-span-8 border-zinc-800 bg-black p-8 overflow-y-auto">
                   <div className="grid grid-cols-2 gap-4">
                      {characters.map((char: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-primary/50 transition-colors">
                           <div className="w-16 h-16 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                              <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white">{char.name}</h3>
                              <Badge variant="outline" className="mt-1 text-xs border-primary/30 text-primary">{char.role}</Badge>
                              {/* Fallback for archetype if missing in data */}
                              <p className="text-xs text-zinc-500 mt-2 font-mono uppercase">{char.archetype || "Lead Cast"}</p>
                           </div>
                        </div>
                      ))}
                      {/* Placeholder for expansion */}
                      <div className="flex items-center justify-center p-4 border border-dashed border-zinc-800 rounded-lg text-zinc-600">
                         + Casting In Progress
                      </div>
                   </div>
                </Card>
              </div>
            </CarouselItem>

            {/* SLIDE 3: THE NUMBERS */}
            <CarouselItem>
              <Card className="h-[550px] border-zinc-800 bg-zinc-900/30 p-16 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-3xl rounded-full pointer-events-none"></div>
                 
                 <div className="flex items-center gap-4 mb-12 relative z-10">
                   <div className="p-4 bg-primary/10 rounded-full"><TrendingUp className="w-8 h-8 text-primary" /></div>
                   <h2 className="text-5xl font-display font-bold text-white">Production Economics</h2>
                 </div>

                 <div className="grid grid-cols-3 gap-8 relative z-10">
                    {/* Budget Widget */}
                    <div className="col-span-1 p-8 bg-black/60 rounded-2xl border border-zinc-800 backdrop-blur-md">
                       <DollarSign className="w-10 h-10 text-emerald-500 mb-4" />
                       <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Total Budget</div>
                       <div className="text-5xl font-bold text-white mb-4">
                         ${(budget / 1000000).toFixed(0)}M
                       </div>
                       <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[85%]"></div>
                       </div>
                       <p className="text-xs text-zinc-500 mt-2">85% Secured via Co-Production</p>
                    </div>

                    {/* Crew Widget */}
                    <div className="col-span-1 p-8 bg-black/60 rounded-2xl border border-zinc-800 backdrop-blur-md">
                       <Users className="w-10 h-10 text-blue-500 mb-4" />
                       <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Key Crew</div>
                       <ul className="space-y-3 mt-4">
                          {crew.map((role: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-300 font-mono text-sm">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> {role}
                            </li>
                          ))}
                       </ul>
                    </div>

                    {/* ROI Widget */}
                    <div className="col-span-1 p-8 bg-black/60 rounded-2xl border border-zinc-800 backdrop-blur-md">
                       <Trophy className="w-10 h-10 text-amber-500 mb-4" />
                       <div className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Projected ROI</div>
                       <div className="text-5xl font-bold text-white mb-2">3.5x</div>
                       <p className="text-zinc-400 leading-snug text-sm">
                         Based on global box office performance of similar mythological epics (e.g., Baahubali, RRR).
                       </p>
                    </div>
                 </div>
              </Card>
            </CarouselItem>

          </CarouselContent>
          <CarouselPrevious className="left-4 bg-black/50 border-white/10 hover:bg-primary text-white" />
          <CarouselNext className="right-4 bg-black/50 border-white/10 hover:bg-primary text-white" />
        </Carousel>

        <div className="absolute bottom-6 text-zinc-600 font-mono text-[10px] tracking-[0.2em] uppercase">
          Confidential • For Internal Review Only
        </div>
      </div>
    </div>
  );
}