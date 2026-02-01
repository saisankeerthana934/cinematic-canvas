// import React, { createContext, useContext, useState, ReactNode } from 'react';

// // The shape of your Visual Profile
// type VisualProfile = {
//   lighting: string;
//   camera: string;
//   lens: string;
//   tone: string;
// };

// interface VisualProfileContextType {
//   profile: VisualProfile;
//   updateProfile: (key: keyof VisualProfile, value: string) => void;
// }

// const VisualProfileContext = createContext<VisualProfileContextType | undefined>(undefined);

// export function VisualProfileProvider({ children }: { children: ReactNode }) {
//   // Default "Film Visual Profile"
//   const [profile, setProfile] = useState<VisualProfile>({
//     lighting: "Natural / High-Key", // Default
//     camera: "Steady / Tripod",
//     lens: "Standard 50mm",
//     tone: "Neutral / Realistic"
//   });

//   const updateProfile = (key: keyof VisualProfile, value: string) => {
//     setProfile(prev => ({ ...prev, [key]: value }));
//   };

//   return (
//     <VisualProfileContext.Provider value={{ profile, updateProfile }}>
//       {children}
//     </VisualProfileContext.Provider>
//   );
// }

// export function useVisualProfile() {
//   const context = useContext(VisualProfileContext);
//   if (context === undefined) {
//     throw new Error('useVisualProfile must be used within a VisualProfileProvider');
//   }
//   return context;
// }
import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- SHARED DATA ---
const INITIAL_LIBRARY = {
  lighting: [
    {
      id: "setup_two_lights",
      title: "Two-Point Setup",
      category: "lighting",
      value: "Low-Key / Two-Point",
      image: "/assets/setup_two_lights.png",
      token: 'lighting_setup: "key_and_rim", fill: "negative"',
      desc: "A Key Light for the subject and a Backlight to separate them from the background.",
      insight: "The 'Backlight' is crucial here—it creates a halo that pops the actor out.",
      tags: ["Studio", "Clean"]
    },
    {
      id: "setup_side",
      title: "Split / Side Lighting",
      category: "lighting",
      value: "Split / High-Contrast",
      image: "/assets/setup_side_lights.png",
      token: 'lighting_angle: "90_deg", contrast: "extreme"',
      desc: "Lights the subject from exactly 90 degrees.",
      insight: "Used to show internal conflict.",
      tags: ["Thriller", "Mystery"]
    },
    {
      id: "light_neon",
      title: "Neon Noir",
      category: "lighting",
      value: "Neon / Cyberpunk",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
      token: 'lighting: "neon_blue_pink", atmosphere: "foggy"',
      desc: "High contrast lighting using artificial neon sources.",
      insight: "Essential for Sci-Fi or night scenes.",
      tags: ["Sci-Fi", "Stylized"]
    }
  ],
  camera: [
    {
      id: "ref_shot_sizes",
      title: "Master Shot Guide",
      category: "camera",
      value: "Standard Coverage",
      image: "/assets/chart_camera_shots.png",
      token: 'shot_size: "auto_match_context"',
      desc: "Reference chart for all standard cinematic shot sizes.",
      insight: "Use 'Long Shots' to show loneliness/scale.",
      tags: ["Reference", "Guide"]
    },
    {
      id: "cam_dutch",
      title: "Dutch Angle",
      category: "camera",
      value: "Dutch Tilt",
      image: "https://images.unsplash.com/photo-1519681393784-d8e5b5a4570b?w=800&q=80",
      token: 'camera_angle: "dutch_tilt"',
      desc: "The camera is tilted to one side.",
      insight: "Creates a sense of unease.",
      tags: ["Horror", "Tension"]
    }
  ],
  composition: [
    {
      id: "comp_thirds",
      title: "Rule of Thirds",
      category: "composition",
      value: "Rule of Thirds",
      image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80",
      token: 'composition: "rule_of_thirds"',
      desc: "Aligning a subject with the guide lines.",
      insight: "The gold standard for balanced shots.",
      tags: ["Standard", "Balanced"]
    }
  ],
  lens: [
    {
      id: "lens_anamorphic",
      title: "Anamorphic Lens",
      category: "lens",
      value: "Anamorphic",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
      token: 'lens: "anamorphic"',
      desc: "Produces an oval bokeh and flares.",
      insight: "Cinematic widescreen look.",
      tags: ["Cinematic"]
    }
  ]
};

type VisualProfile = {
  lighting: string | null;
  camera: string | null;
  lens: string | null;
  tone: string | null;
};

interface VisualProfileContextType {
  profile: VisualProfile;
  library: any; 
  updateProfile: (key: keyof VisualProfile, value: string) => void;
  addAsset: (category: string, asset: any) => void;
  deleteAsset: (category: string, id: string) => void;
}

const VisualProfileContext = createContext<VisualProfileContextType | undefined>(undefined);

export function VisualProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<VisualProfile>({
    lighting: null,
    camera: null,
    lens: null,
    tone: null
  });

  const [library, setLibrary] = useState(INITIAL_LIBRARY);

  const updateProfile = (key: keyof VisualProfile, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const addAsset = (category: string, asset: any) => {
    // @ts-ignore
    setLibrary(prev => ({
      ...prev,
      [category]: [...(prev[category as keyof typeof prev] || []), asset]
    }));
  };

  const deleteAsset = (category: string, id: string) => {
    // @ts-ignore
    setLibrary(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].filter((item: any) => item.id !== id)
    }));
  };

  return (
    <VisualProfileContext.Provider value={{ profile, library, updateProfile, addAsset, deleteAsset }}>
      {children}
    </VisualProfileContext.Provider>
  );
}

export function useVisualProfile() {
  const context = useContext(VisualProfileContext);
  if (context === undefined) {
    throw new Error('useVisualProfile must be used within a VisualProfileProvider');
  }
  return context;
}