export const MOCK_PROJECT = {
  _id: "mock-id-mahabharata",
  script: {
    title: "MAHABHARATA (Demo)",
    subtitle: "A War of Dharma",
    logline: "A cosmic saga of duty, destiny, and the ultimate war between good and evil.",
    characters: [
      { id: "c1", name: "Arjuna", role: "Protagonist", archetype: "The Warrior" },
      { id: "c2", name: "Krishna", role: "The Divine", archetype: "The Guide" },
      { id: "c3", name: "Duryodhana", role: "Antagonist", archetype: "The Rival" },
      { id: "c4", name: "Draupadi", role: "Key Figure", archetype: "The Catalyst" }
    ],
    scenes: [
      {
        id: "scene-1", number: 1, title: "Cosmic Beginning",
        text: "Dark cosmic universe. Golden light slowly forms an ancient battlefield.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Wide Pan / Slow Zoom", lighting: "Bioluminescent", mood: "Ethereal" },
        music: { track: "Celestial Drone", type: "Ambient", status: "generated" },
        beats: { story: "The universe prepares for conflict.", audience: "Awe and mystery." },
        recommendations: []
      },
      {
        id: "scene-2", number: 2, title: "Hastinapura & Destiny",
        text: "Grand ancient palace at sunrise. Massive stone pillars cast long shadows.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Low Angle / Static", lighting: "Golden Hour", mood: "Regal / Ominous" },
        music: { track: "Royal Trumpets", type: "Orchestral", status: "generated" },
        beats: { story: "Establish the power of the dynasty.", audience: "Impression of grandeur." },
        recommendations: []
      },
      {
        id: "scene-3", number: 3, title: "Pandavas vs Kauravas",
        text: "Young warriors training in a dusty arena. Duryodhana watches Bhima with jealousy.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Handheld / Shaky", lighting: "Harsh Sunlight", mood: "Tense" },
        music: { track: "Percussion Beats", type: "Action", status: "generated" },
        beats: { story: "Establish the rivalry.", audience: "Feel the tension." },
        recommendations: []
      },
      {
        id: "scene-4", number: 4, title: "The Dice Game",
        text: "Royal court tension. Dice rolling in slow motion. Draupadi's humiliation.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Extreme Close-ups", lighting: "Dim / Flickering", mood: "Tragic / Intense" },
        music: { track: "Silent Tension", type: "Minimal", status: "generated" },
        beats: { story: "The turning point of the epic.", audience: "Shock and empathy." },
        recommendations: []
      },
      {
        id: "scene-5", number: 5, title: "The Exile",
        text: "Pandavas walking through a vast forest. Dusty paths. A sense of loss.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Wide Tracking Shot", lighting: "Overcast / Grey", mood: "Melancholic" },
        music: { track: "Flute & Strings", type: "Folk", status: "generated" },
        beats: { story: "The consequence of defeat.", audience: "Sympathy and sadness." },
        recommendations: []
      },
      {
        id: "scene-6", number: 6, title: "Arrival of Krishna",
        text: "Lord Krishna appears with a divine blue glow, offering counsel.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Slow Push-in", lighting: "Divine Glow (Blue/Gold)", mood: "Hopeful / Mystical" },
        music: { track: "Divine Chants", type: "Spiritual", status: "generated" },
        beats: { story: "Introduction of divine intervention.", audience: "Hope and reverence." },
        recommendations: []
      },
      {
        id: "scene-7", number: 7, title: "The Bhagavad Gita",
        text: "Time freezes on the battlefield. Krishna reveals his cosmic form to Arjuna.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Rotating / Disorienting", lighting: "Psychedelic / Cosmic", mood: "Mind-bending" },
        music: { track: "Cosmic crescendo", type: "Experimental", status: "generated" },
        beats: { story: "The philosophical core.", audience: "Awe and enlightenment." },
        recommendations: []
      },
      {
        id: "scene-8", number: 8, title: "The Great War (Kurukshetra)",
        text: "Massive armies clash. Arrows flying like rain. Chaos and destruction.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Drone / High Angle", lighting: "Sunset / Fiery", mood: "Epic / Chaotic" },
        music: { track: "War Drums & Choir", type: "Epic", status: "generated" },
        beats: { story: "The climax of the conflict.", audience: "Excitement and horror." },
        recommendations: []
      },
      {
        id: "scene-9", number: 9, title: "The Final Blow",
        text: "Arjuna vs Karna. The final arrow is released. Silence falls.",
        isFilmed: true,
        image: "", // <--- ADDED FIELD
        analysis: { camera: "Rack Focus", lighting: "Dramatic Spotlight", mood: "Finality" },
        music: { track: "Single Violin Note", type: "Classical", status: "generated" },
        beats: { story: "Resolution of the main rivalry.", audience: "Relief and sadness." },
        recommendations: []
      }
    ]
  }
};