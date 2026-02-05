import dotenv from 'dotenv';
import OpenAI from "openai"; 

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy", 
  dangerouslyAllowBrowser: true 
});

// --- 1. VISUAL GENERATOR (Free via Pollinations) ---
// ✅ KEPT EXACTLY THE SAME AS YOUR WORKING VERSION
export const generateSceneVisual = async (sceneDescription: string, analysis: any) => {
  console.log("🎨 AI Service input:", sceneDescription.substring(0, 50) + "...");

  try {
    // 1. Clean the text to get a good visual prompt
    let cleanText = sceneDescription
      .replace(/\b(EXT\.|INT\.|Narration|Voiceover|On-screen Text|Visual Description|Mood|Music|Scene \d+)[:\-]?\s*/gi, "")
      .replace(/[^a-zA-Z0-9\s,.-]/g, "") // Remove special chars
      .trim();

    // Fallbacks
    if (cleanText.length < 5) cleanText = sceneDescription.substring(0, 100);
    if (cleanText.length > 200) cleanText = cleanText.substring(0, 200);

    // 2. Build a Cinematic Prompt
    const lighting = analysis?.lighting || "cinematic lighting";
    const camera = analysis?.camera || "wide shot";
    const mood = analysis?.mood || "dramatic";
    
    const finalPrompt = `cinematic film shot of ${cleanText}, ${camera}, ${lighting}, ${mood}, 8k, photorealistic, highly detailed, movie frame, masterpiece`;
    
    console.log("✂️ Final Prompt to AI:", finalPrompt);

    // 3. Call Pollinations (Free)
    const encodedPrompt = encodeURIComponent(finalPrompt);
    const randomSeed = Math.floor(Math.random() * 99999);
    
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1280&height=720&seed=${randomSeed}&nologo=true&model=flux`;

  } catch (error) {
    console.error("❌ Generation Error:", error);
    // Fallback image if service fails
    return "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1280&q=80";
  }
};

// --- 2. SCRIPT GENERATOR (Hybrid: Real AI -> Fallback to Smart Mock) ---
// ✅ UPDATED: Fails gracefully to a Smart Mock instead of an Error
export const generateStoryScript = async (genre: string, idea: string) => {
  console.log(`✍️ Generating Script for: "${idea}"`);

  // A. TRY REAL AI (Only if Key looks valid)
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
    try {
      const systemPrompt = `
        You are a professional Screenwriter AI.
        Convert the user's idea into a structured film script JSON object.
        Genre: ${genre}
        STRICT OUTPUT FORMAT (JSON ONLY):
        { "title": "Movie Title", "scenes": [{ "title": "Scene Heading", "text": "Visual action description.", "analysis": { "camera": "Camera Angle", "lighting": "Lighting Style", "mood": "Emotional Tone" } }] }
        Generate exactly 6 scenes.
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Idea: ${idea}` }
        ],
      //   response_format: { type: "json_object" }, { timeout: 40000 });
      // // });
      response_format: { type: "json_object" },
      }, { timeout: 40000 });

      const content = completion.choices[0].message.content;
      if (content) {
        const parsed = JSON.parse(content);
        console.log("✅ OpenAI Script Generated:", parsed.title);
        return parsed;
      }
    } catch (error) {
      console.warn("⚠️ OpenAI Failed, switching to Smart Mock...");
    }
  }

  // B. SMART MOCK FALLBACK (If API fails or no key)
  // This generates a coherent script structure using your input text so the app NEVER crashes.
  console.log("🤖 Generating Smart Mock Script...");
  const cleanIdea = idea.split('.')[0] || "A mysterious journey";
  const titleIdea = idea.length > 20 ? idea.substring(0, 20) + "..." : idea;
  
  return {
    title: `The ${genre} of ${titleIdea}`,
    scenes: [
      {
        title: "The Inciting Incident",
        text: `The story begins. ${cleanIdea}. The atmosphere is heavy with anticipation.`,
        analysis: { camera: "Wide Shot", lighting: "Natural", mood: "Anticipation" }
      },
      {
        title: "Into the Unknown",
        text: `Our protagonist steps forward into the new world. ${idea.substring(0, 50)}...`,
        analysis: { camera: "Tracking Shot", lighting: "High Contrast", mood: "Mystery" }
      },
      {
        title: "The Conflict",
        text: "A sudden obstacle appears, challenging everything they thought they knew.",
        analysis: { camera: "Dutch Angle", lighting: "Dark & Stormy", mood: "Danger" }
      },
      {
        title: "The Climax",
        text: "Forces collide in a spectacular display. The stakes have never been higher.",
        analysis: { camera: "Fast Cuts", lighting: "Strobe / Action", mood: "Intense" }
      },
      {
        title: "Resolution",
        text: "The dust settles. The world is changed forever, but hope remains.",
        analysis: { camera: "Static Fade Out", lighting: "Soft Warmth", mood: "Peace" }
      }
    ]
  };
};