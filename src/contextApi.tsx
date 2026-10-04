
"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
  
type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  authUser: User | null;
  setAuthUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;
  loading: boolean;
  setLoading: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  getMe: () => Promise<void>;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

const ContextApi = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] =
    useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "/api/auth/me",
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        setAuthUser(response.data.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      setAuthUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        loading,
        setLoading,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside ContextApi",
    );
  }

  return context;
};

export default ContextApi;
