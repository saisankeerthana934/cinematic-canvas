import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "admin" | "director";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: (User & { password: string })[] = [
  {
    id: "admin-1",
    email: "admin@cineintent.com",
    password: "admin123",
    name: "Alex Rodriguez",
    role: "admin",
    avatar: "AR",
  },
  {
    id: "director-1",
    email: "director@cineintent.com",
    password: "director123",
    name: "Sarah Chen",
    role: "director",
    avatar: "SC",
  },
  {
    id: "director-2",
    email: "mike@studio.com",
    password: "mike123",
    name: "Mike Roberts",
    role: "director",
    avatar: "MR",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("cineintent-user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("cineintent-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("cineintent-user");
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const exists = mockUsers.find((u) => u.email === email);
    if (exists) {
      return { success: false, error: "User already exists" };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
