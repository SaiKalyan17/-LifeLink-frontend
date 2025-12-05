import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: any;
  token: string | null;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  tloading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  tloading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [tloading, setTloading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    const savedUser = await AsyncStorage.getItem("user");
    const savedToken = await AsyncStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setTloading(false);
  };

  const login = async (data: any) => {
    await AsyncStorage.setItem("user", JSON.stringify(data));
    await AsyncStorage.setItem("token", data.token);
    setUser(data);
    setToken(data.token);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, tloading }}>
      {children}
    </AuthContext.Provider>
  );
};
