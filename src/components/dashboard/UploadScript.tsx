import { useState, useRef } from "react";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createProject } from "@/lib/api";
import { cn } from "@/lib/utils";

export function UploadScript({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const [scriptText, setScriptText] = useState("");
  const [fileName, setFileName] = useState("");

  // Handle File Selection (TXT files)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setScriptText(e.target?.result as string);
        setFileName(file.name);
        // Auto-guess title from filename
        if (!title) setTitle(file.name.replace(".txt", ""));
        toast({ title: "File Read", description: "Script text loaded successfully." });
      };
      reader.readAsText(file);
    } else {
      toast({ 
        title: "Format Warning", 
        description: "For this demo, please copy-paste the text from your PDF directly into the box.", 
        variant: "destructive" 
      });
      setFileName(file.name + " (Cannot read PDF directly)");
    }
  };

  const handleUpload = async () => {
    if (!title || !scriptText) {
      toast({ title: "Missing Info", description: "Please add a Title and Script Text.", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    // Call the Backend
    const newProject = await createProject(title, scriptText);
    setIsUploading(false);

    if (newProject) {
      toast({ title: "Success!", description: `Created "${newProject.title}"` });
      onNavigate('scenes');
    } else {
      toast({ title: "Error", description: "Server connection failed.", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8 animate-in fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold">New Project Studio</h1>
        <p className="text-muted-foreground">Upload a script to start a separate production.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* LEFT: DROP ZONE (Restored Visual) */}
        <Card 
          className={cn(
            "md:col-span-1 border-dashed border-2 bg-zinc-900/30 flex flex-col items-center justify-center text-center p-6 transition-all cursor-pointer",
            dragActive ? "border-primary bg-primary/10" : "border-zinc-700 hover:border-zinc-500"
          )}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".txt" // PDF parsing is too complex for browser-only, sticking to text
          />
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-zinc-400" />
          </div>
          <h3 className="font-bold text-sm text-white">Upload File</h3>
          <p className="text-xs text-zinc-500 mt-2">Drag & Drop or Click</p>
          <p className="text-[10px] text-zinc-600 mt-4 uppercase font-bold tracking-wider">.TXT Recommended</p>
          {fileName && (
            <div className="mt-4 bg-primary/20 text-primary text-xs px-2 py-1 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {fileName}
            </div>
          )}
        </Card>

        {/* RIGHT: TEXT EDITOR (The Real Logic) */}
        <Card className="md:col-span-2 bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase">Project Title</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Inception" 
                className="bg-black/50 border-zinc-700"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase flex justify-between">
                <span>Script Content</span>
                <span className="text-primary cursor-pointer hover:underline" onClick={() => setScriptText("")}>Clear</span>
              </label>
              <Textarea 
                value={scriptText} 
                onChange={(e) => setScriptText(e.target.value)} 
                placeholder="Paste your script text here..." 
                className="min-h-[200px] font-mono text-sm bg-black/50 border-zinc-700"
              />
            </div>

            <Button onClick={handleUpload} disabled={isUploading} className="w-full bg-primary text-black font-bold">
              {isUploading ? <Loader2 className="animate-spin mr-2" /> : <FileText className="mr-2" />}
              {isUploading ? "AI Analyzing..." : "Create Project"}
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}