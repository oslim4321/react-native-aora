import { getCurrentUser } from "@/lib/appwrite";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface User {
  id: string;
  userName: string;
  email: string;
  accountId: string;
  avatar: string;
  $collectionId?: string;
  $createdAt?: string;
  $databaseId?: string;
  $permissions?: string[];
  $updatedAt?: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const res = await getCurrentUser();

        if (res && res != null) {
          setIsLoggedIn(true);
          setUser({
            id: res.$id,
            userName: res.userName,
            email: res.email,
            accountId: res.accountId,
            avatar: res.avatar,
            $collectionId: res.$collectionId,
            $createdAt: res.$createdAt,
            $databaseId: res.$databaseId,
            $permissions: res.$permissions,
            $updatedAt: res.$updatedAt,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        setIsLoggedIn,
        setUser,
        setIsLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
