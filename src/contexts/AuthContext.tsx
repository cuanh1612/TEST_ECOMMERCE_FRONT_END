import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useCheckCart } from "../api/cart.api";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  checkCart?: boolean;
  refetchCheckCart: ()=> void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const { data: dataCheckCart, refetch: refetchCheckCart } = useCheckCart(accessToken);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAccessTokenState(token);
  }, []);

  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
    setAccessTokenState(token);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessTokenState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        logout,
        checkCart: dataCheckCart?.checkCart,
        refetchCheckCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
