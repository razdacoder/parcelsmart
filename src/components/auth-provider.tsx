// AuthProvider.tsx
import useRefreshToken from "@/features/auth/api/useRefreshToken";
import { client } from "@/lib/client";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

// Define the shape of the Token type
type TokenType = {
  token: string;
  expires_at: Date;
};

type CustomRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// Define the shape of the context state
interface AuthContextType {
  authToken: TokenType | null;
  login: (token: TokenType) => void;
  logout: () => void;
}

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if the token is expired based on `expires_at` property
const isTokenExpired = (token: TokenType): boolean => {
  return new Date(token.expires_at) < new Date();
};

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<TokenType | null>(() => {
    const tokenString = localStorage.getItem("authToken");
    if (tokenString) {
      try {
        const token = JSON.parse(tokenString) as TokenType;
        return !isTokenExpired(token) ? token : null;
      } catch (error) {
        return null;
      }
    }
    return null;
  });
  const { mutate: refreshToken } = useRefreshToken();

  // Effect to handle token expiration check
  useEffect(() => {
    if (authToken && isTokenExpired(authToken)) {
      refreshToken(undefined, {
        onSuccess: (data) => {
          setAuthToken({
            token: data.access_token,
            expires_at: data.expires_at,
          });
          localStorage.setItem(
            "authToken",
            JSON.stringify({
              token: data.access_token,
              expires_at: data.expires_at,
            })
          );
        },
        onError: () => {
          setAuthToken(null);
          localStorage.removeItem("authToken");
        },
      });
    }
  }, [authToken]);

  useLayoutEffect(() => {
    const authInterceptor = client.interceptors.request.use(
      (config: CustomRequestConfig) => {
        config.headers.Authorization =
          !config._retry && authToken
            ? `Bearer ${authToken.token}`
            : config.headers.Authorization;
        return config;
      }
    );

    return () => {
      client.interceptors.request.eject(authInterceptor);
    };
  }, [authToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomRequestConfig;
        if (error.response?.status === 401 && !originalRequest._retry) {
          refreshToken(undefined, {
            onSuccess: (data) => {
              setAuthToken({
                token: data.access_token,
                expires_at: data.expires_at,
              });
              originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
              originalRequest._retry = true;
              return client(originalRequest);
            },
            onError: () => {
              setAuthToken(null);
            },
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      client.interceptors.response.eject(refreshInterceptor);
    };
  }, [authToken]);

  const login = (token: TokenType) => {
    setAuthToken(token);
    localStorage.setItem("authToken", JSON.stringify(token));
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context with type safety
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
