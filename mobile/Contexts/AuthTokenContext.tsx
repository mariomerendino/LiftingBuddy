import { createContext } from "react";

interface AuthTokenContextType {
  authToken: string | null;
  setAuthToken: (arg0: string | null) => void;
  authTokenIsValid: boolean;
  setAuthTokenIsValid: (_arg0: boolean) => void;
}

const AuthTokenContext = createContext<AuthTokenContextType>({
  setAuthToken: () => {},
  authToken: null,
  setAuthTokenIsValid: () => {},
  authTokenIsValid: false,
});

export default AuthTokenContext;
