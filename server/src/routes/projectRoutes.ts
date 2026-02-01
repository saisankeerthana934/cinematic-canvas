import express from 'express';
import Project from '../models/Project';
import { generateSceneVisual, generateStoryScript } from '../services/aiService';

const router = express.Router();

// --- 1. THE PERFECT DEMO SEED ---
router.get('/seed', async (req, res) => {
  try {
    await Project.deleteMany({ title: { $regex: /MAHABHARATA/i } });
    const demoProject = await Project.create({
      title: "MAHABHARATA (Demo)",
      subtitle: "A War of Dharma",
      isDemo: true, 
      scenes: [
        { id: "s1", number: 1, title: "Cosmic Beginning", text: "Dark cosmic universe...", image: "", isFilmed: true, analysis: { camera: "Wide Pan", lighting: "Bioluminescent", mood: "Ethereal" } },
        { id: "s2", number: 2, title: "Hastinapura & Destiny", text: "Grand ancient palace...", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1920", isFilmed: true, analysis: { camera: "Static", lighting: "Golden Hour", mood: "Regal", lens: "35mm Anamorphic", color: "Gold & Dust", time: "Sunrise" } }, 
        { id: "s3", number: 3, title: "Pandavas vs Kauravas", text: "Young warriors training...", image: "", isFilmed: true, analysis: { camera: "Handheld", lighting: "Harsh", mood: "Tense" } },
        { id: "s4", number: 4, title: "The Dice Game", text: "Royal court tension...", image: "", isFilmed: true, analysis: { camera: "Close-up", lighting: "Dim", mood: "Tragic" } },
        { id: "s5", number: 5, title: "The Exile", text: "Pandavas walking...", image: "", isFilmed: true, analysis: { camera: "Tracking", lighting: "Overcast", mood: "Melancholic" } },
        { id: "s6", number: 6, title: "Arrival of Krishna", text: "Divine blue glow...", image: "", isFilmed: true, analysis: { camera: "Push-in", lighting: "Divine", mood: "Hopeful" } },
        { id: "s7", number: 7, title: "Gita Revealed", text: "Time freezes...", image: "", isFilmed: true, analysis: { camera: "Rotating", lighting: "Cosmic", mood: "Mind-bending" } },
        { id: "s8", number: 8, title: "The Great War", text: "Massive armies clash...", image: "", isFilmed: true, analysis: { camera: "Drone", lighting: "Fiery", mood: "Epic" } },
        { id: "s9", number: 9, title: "Final Blow", text: "Arjuna vs Karna...", image: "", isFilmed: true, analysis: { camera: "Rack Focus", lighting: "Spotlight", mood: "Finality" } }
      ]
    });
    res.json({ message: "✅ Demo Restored", project: demoProject });
  } catch (error) { res.status(500).json({ msg: "Seed failed" }); }
});

// --- 2. GET ALL PROJECTS ---
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) { res.status(500).json({ message: "Error" }); }
});

// --- 3. CREATE PROJECT (SMART PARSER FIX) ---
router.post('/', async (req, res) => {
  try {
    const { title, scriptText } = req.body;
    let rawScenes: string[] = [];

    if (scriptText) {
        // Attempt 1: Standard Script Format (INT./EXT./SCENE)
        const splitByHeader = scriptText.split(/INT\.|EXT\.|SCENE/i).filter((s:string) => s.trim().length > 10);
        
        if (splitByHeader.length > 0) {
            rawScenes = splitByHeader;
        } 
        // Attempt 2: Split by Paragraphs (Double Newline)
        else {
            const splitByPara = scriptText.split('\n\n').filter((s:string) => s.trim().length > 10);
            if (splitByPara.length > 0) {
                rawScenes = splitByPara;
            } 
            // Attempt 3: Just treat the whole text as Scene 1
            else if (scriptText.trim().length > 0) {
                rawScenes = [scriptText];
            }
        }
    }

    // Default to a placeholder if text was completely empty
    if (rawScenes.length === 0) rawScenes = ["Scene 1: Start your story here..."];
    
    const scenes = rawScenes.map((text:string, index:number) => ({
        id: `scene-${Date.now()}-${index}`,
        number: index + 1,
        title: `Scene ${index + 1}`, // Simple Auto-Title
        text: text.trim().slice(0, 200), // Trim for display
        image: "", 
        isFilmed: false,
        analysis: { camera: "Wide Shot", lighting: "Natural", mood: "Neutral" }
    }));

    const newProject = await Project.create({ title: title || "Untitled", scenes: scenes });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
});

// --- 4. GENERATE VISUAL (Manual) ---
router.post('/:projectId/scenes/:sceneId/generate', async (req, res) => {
  try {
    const { projectId, sceneId } = req.params;
    const { text, analysis } = req.body; 
    const project = await Project.findById(projectId);
    
    if (!project) return res.status(404).json({ msg: "Project not found" });

    // @ts-ignore
    const scene = project.scenes.find(s => s.id === sceneId || s._id.toString() === sceneId);
    if (!scene) return res.status(404).json({ msg: "No scene" });

    const promptText = text || scene.text;
    const imageUrl = await generateSceneVisual(promptText, analysis || scene.analysis);

    scene.image = imageUrl;
    scene.isFilmed = true;
    if (text) scene.text = text;
    if (analysis) scene.analysis = analysis;
    
    await project.save();
    res.json({ message: "Generated", imageUrl });
  } catch (e) { res.status(500).json({ msg: "Error" }); }
});

// --- 5. AI ANALYZER ---
router.post('/analyze', (req, res) => {
  const { text } = req.body;
  const lower = text ? text.toLowerCase() : "";
  let analysis = { camera: "Static", lighting: "Natural", mood: "Neutral", lens: "35mm", color: "Balanced", time: "Day" };
  
  if (lower.includes("sun") || lower.includes("morning")) analysis = { ...analysis, lighting: "Golden Hour", time: "Sunrise", color: "Warm Orange" };
  if (lower.includes("night") || lower.includes("dark")) analysis = { ...analysis, lighting: "Low Key", time: "Night", mood: "Mystery" };
  
  res.json(analysis);
});

// --- 6. DELETE ---
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// --- 7. ✅ NEW: GENERATE STORY FROM IDEA (AI WRITER) ---
// This handles the "Idea -> Script" feature
router.post('/generate', async (req, res) => {
  try {
    const { genre, idea } = req.body;

    console.log("🚀 Route Hit: /generate");
    console.log("Input:", { genre, idea });

    if (!idea) {
      return res.status(400).json({ message: "Story idea is required" });
    }

    // 1. Call AI to write the script (Returns JSON)
    const scriptJSON = await generateStoryScript(genre || "Cinematic", idea);

    // 2. Format Scenes for Mongoose
    const scenes = scriptJSON.scenes.map((scene: any, index: number) => ({
        id: `scene_${Date.now()}_${index}`,
        number: index + 1,
        title: scene.title || `Scene ${index + 1}`,
        text: scene.text || "Scene description...",
        image: "", 
        isFilmed: false,
        analysis: scene.analysis || { camera: "Wide", lighting: "Natural", mood: "Neutral" }
    }));

    // 3. Create Project
    const newProject = new Project({
      title: scriptJSON.title || "Untitled AI Story",
      isDemo: false,
      script: {
        title: scriptJSON.title,
        scenes: scenes 
      },
      scenes: scenes, // Save scenes array
      createdAt: new Date()
    });

    // 4. Save
    const savedProject = await newProject.save();

    console.log(`✅ Project Saved: ${savedProject.title} (${savedProject._id})`);
    res.status(201).json(savedProject);

  } catch (error) {
    console.error("❌ Generation Route Error:", error);
    res.status(500).json({ message: "Failed to generate story" });
  }
});

export default router;