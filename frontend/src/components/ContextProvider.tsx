import { createContext, useState, ReactNode } from "react";

export interface Login {
  username: string;
  token: string;
}

export interface LoginContextValue {
  login: Login | null;
  setLogin: React.Dispatch<React.SetStateAction<Login | null>>;
}

export const CombinedContext = createContext<LoginContextValue>({
  login: null,
  setLogin: () => {},
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [login, setLogin] = useState<Login | null>(null);

  return (
    <CombinedContext.Provider value={{ login, setLogin }}>
      {children}
    </CombinedContext.Provider>
  );
}
