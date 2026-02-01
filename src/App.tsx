// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ThemeProvider } from "@/contexts/ThemeContext";
// import { AuthProvider, useAuth } from "@/contexts/AuthContext";
// import Index from "./pages/Index";
// import Auth from "./pages/Auth";
// import NotFound from "./pages/NotFound";

// // ✅ 1. FIXED IMPORTS (Ensure /dashboard/ is included)
// import { SceneBreakdown } from "./components/dashboard/SceneBreakdown";
// import { StoryGenerate } from "./components/dashboard/StoryGenerate";
// import { AIAnalysis } from "./components/dashboard/AIAnalysis"; // ✅ New Import

// const queryClient = new QueryClient();

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
// }

// function AuthRoute({ children }: { children: React.ReactNode }) {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
// }

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Index />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/auth"
//         element={
//           <AuthRoute>
//             <Auth />
//           </AuthRoute>
//         }
//       />

//       {/* ✅ 2. PROJECT STUDIO ROUTE */}
//       <Route
//         path="/project/:id"
//         element={
//           <ProtectedRoute>
//             <SceneBreakdown />
//           </ProtectedRoute>
//         }
//       />

//       {/* ✅ 3. STORY GENERATOR ROUTE */}
//       <Route
//         path="/generate"
//         element={
//           <ProtectedRoute>
//             <StoryGenerate />
//           </ProtectedRoute>
//         }
//       />

//       {/* ✅ 4. AI ANALYSIS ROUTE (The New Graphs Page) */}
//       <Route
//         path="/analysis"
//         element={
//           <ProtectedRoute>
//             <AIAnalysis />
//           </ProtectedRoute>
//         }
//       />

//       {/* CATCH-ALL ROUTE */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider>
//       <AuthProvider>
//         <TooltipProvider>
//           <Toaster />
//           <Sonner />
//           <BrowserRouter>
//             <AppRoutes />
//           </BrowserRouter>
//         </TooltipProvider>
//       </AuthProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// ✅ 1. IMPORT YOUR DASHBOARD COMPONENTS
import { SceneBreakdown } from "./components/dashboard/SceneBreakdown";
import { StoryGenerate } from "./components/dashboard/StoryGenerate";
import { AIAnalysis } from "./components/dashboard/AIAnalysis"; 

// ✅ 2. IMPORT THE VISUAL PROFILE PROVIDER (Critical for Scene Breakdown)
import { VisualProfileProvider } from "@/contexts/VisualProfileContext"; 

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }
      />

      {/* PROJECT STUDIO ROUTE */}
      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <SceneBreakdown />
          </ProtectedRoute>
        }
      />

      {/* STORY GENERATOR ROUTE */}
      <Route
        path="/generate"
        element={
          <ProtectedRoute>
            <StoryGenerate />
          </ProtectedRoute>
        }
      />

      {/* AI ANALYSIS ROUTE */}
      <Route
        path="/analysis"
        element={
          <ProtectedRoute>
            <AIAnalysis />
          </ProtectedRoute>
        }
      />

      {/* CATCH-ALL ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        
        {/* ✅ 3. WRAP EVERYTHING HERE so the context is available everywhere */}
        <VisualProfileProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </VisualProfileProvider>

      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;