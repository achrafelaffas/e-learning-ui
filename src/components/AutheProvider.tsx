import { UserDTO } from "@/api";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const AuthContext = createContext<UserDTO | null>(null);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn: boolean;
};

const AutheProvider = ({ isSignedIn, children }: AuthProviderProps) => {

  const [user] = useState<UserDTO | null>(isSignedIn ? { id: 1 } : null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AutheProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be use within an AuthProvider");
  }

  return context;
};
