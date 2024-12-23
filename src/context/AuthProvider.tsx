import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

// Define Auth State
interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

// Define Auth Context Type
interface AuthContextType {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
  });

  // Initialize Auth State
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthState({ isAuthenticated: true, token });
    }
  }, []);

  // Login Function
  const login = (token: string) => {
    Cookies.set("token", token, {
      secure: true,
      sameSite: "strict",
      expires: 1, // 1 day
    });
    setAuthState({ isAuthenticated: true, token });
  };

  // Logout Function
  const logout = () => {
    Cookies.remove("token");
    setAuthState({ isAuthenticated: false, token: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
