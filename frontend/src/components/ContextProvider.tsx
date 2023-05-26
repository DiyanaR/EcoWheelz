import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import ErrorPopup from "./ErrorPopup";

export interface Login {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface LoginContextValue {
  login: Login | null;
  setLogin: React.Dispatch<React.SetStateAction<Login | null>>;
}

export const LoginContext = createContext<LoginContextValue>({
  login: null,
  setLogin: () => {},
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [login, setLogin] = useState<Login | null>(null);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    (async () => {
      const rememberedLoginToken = localStorage.getItem("token");

      if (rememberedLoginToken) {
        try {
          const rememberedUser = await axios.get(
            "http://localhost:8080/validate-token",
            {
              headers: { Authorization: `Bearer ${rememberedLoginToken}` },
            }
          );

          const { email, firstName, lastName, token } = rememberedUser.data;

          setLogin({ email, firstName, lastName, token });
        } catch (error) {
          setErrorMsg(true);

          setTimeout(() => {
            setErrorMsg(false);
          }, 2500);
        }
      }
    })();
  }, []);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
      <ErrorPopup errorMsg={errorMsg} errorText="Error couldn't login user" />
    </LoginContext.Provider>
  );
}
