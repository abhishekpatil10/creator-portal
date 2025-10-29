import { createContext, useContext, useState, ReactNode } from 'react';
import type { Creator } from '../api/creators';

interface CreatorContextType {
  creators: Creator[];
  setCreators: (creators: Creator[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  lastViewed: Creator | null;
  setLastViewed: (creator: Creator | null) => void;
}

const CreatorContext = createContext<CreatorContextType | undefined>(undefined);

export const useCreatorContext = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreatorContext must be used within CreatorProvider');
  }
  return context;
};

export const CreatorProvider = ({ children }: { children: ReactNode }) => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastViewed, setLastViewed] = useState<Creator | null>(null);

  return (
    <CreatorContext.Provider
      value={{
        creators,
        setCreators,
        loading,
        setLoading,
        lastViewed,
        setLastViewed,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

