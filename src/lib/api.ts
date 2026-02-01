// // The URL of your backend server
// const API_URL = "http://localhost:5000/api/projects";

// export const fetchProjectData = async () => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error("Server not responding");
//     }
//     const data = await response.json();
    
//     // FIX: Get the LAST project (the newest one), not the first one
//     if (data.length > 0) {
//         return data[data.length - 1]; 
//     }
//     return null;

//   } catch (error) {
//     console.error("❌ Failed to fetch from backend:", error);
//     return null;
//   }
// };

// // Send a new script to the backend
// export const createProject = async (title: string, scriptText: string) => {
//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, scriptText }),
//     });

//     if (!response.ok) throw new Error("Upload failed");
//     return await response.json();
//   } catch (error) {
//     console.error("❌ Error uploading script:", error);
//     return null;
//   }
// };
// // Add this new function to get the FULL LIST of projects
// export const fetchAllProjects = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/projects");
//       if (!response.ok) throw new Error("Server error");
//       const data = await response.json();
//       return data; // Returns the Array: [Mahabharata, Your Uploaded Script]
//     } catch (error) {
//       console.error("❌ Failed to load projects:", error);
//       return [];
//     }
//   };
//   // Delete a project by ID
// export const deleteProject = async (id: string) => {
//     try {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Delete failed");
//       return true;
//     } catch (error) {
//       console.error("❌ Failed to delete:", error);
//       return false;
//     }
//   };
import { API_BASE_URL } from "./config";

// ✅ FIX 1: Define the full path to the projects endpoint
// This ensures we are always talking to /api/projects, not just /api
const PROJECTS_URL = `${API_BASE_URL}/api/projects`;

export const fetchProjectData = async () => {
  try {
    // ✅ Uses dynamic URL
    const response = await fetch(PROJECTS_URL); 
    if (!response.ok) {
      throw new Error("Server not responding");
    }
    const data = await response.json();
    
    // Get the LAST project (the newest one)
    if (data.length > 0) {
        return data[data.length - 1]; 
    }
    return null;

  } catch (error) {
    console.error("❌ Failed to fetch from backend:", error);
    return null;
  }
};

export const createProject = async (title: string, scriptText: string) => {
  try {
    // ✅ Uses dynamic URL
    const response = await fetch(PROJECTS_URL, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, scriptText }),
    });

    if (!response.ok) throw new Error("Upload failed");
    return await response.json();
  } catch (error) {
    console.error("❌ Error uploading script:", error);
    return null;
  }
};

export const fetchAllProjects = async () => {
    try {
      // ✅ FIX 2: Removed "http://localhost:5000"
      const response = await fetch(PROJECTS_URL);
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("❌ Failed to load projects:", error);
      return [];
    }
};

export const deleteProject = async (id: string) => {
    try {
      // ✅ Uses dynamic URL + ID
      const response = await fetch(`${PROJECTS_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      return true;
    } catch (error) {
      console.error("❌ Failed to delete:", error);
      return false;
    }
};