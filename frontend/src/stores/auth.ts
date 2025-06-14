import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { api } from "@/lib/api";
import { User, UserProfile, LoginForm, SignupForm } from "@/types";

// API Response types for auth
interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Error response type
interface ApiError {
  response?: {
    data?: {
      detail?: string;
      message?: string;
    };
  };
}

interface AuthState {
  // State
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginForm) => Promise<void>;
  signup: (userData: SignupForm) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Login action
        login: async (credentials: LoginForm) => {
          try {
            set({ isLoading: true, error: null });

            const response = await api.post<AuthResponse>(
              "/auth/login/",
              credentials
            );
            const { access, refresh, user } = response.data;

            // Store tokens
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);

            // Fetch user profile
            const profileResponse = await api.get<UserProfile>(
              `/users/${user.id}/profile/`
            );

            set({
              user,
              profile: profileResponse.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: unknown) {
            const apiError = error as ApiError;
            const errorMessage =
              apiError.response?.data?.detail ||
              apiError.response?.data?.message ||
              "Login failed. Please try again.";
            set({
              error: errorMessage,
              isLoading: false,
              isAuthenticated: false,
            });
            throw error;
          }
        },

        // Signup action
        signup: async (userData: SignupForm) => {
          try {
            set({ isLoading: true, error: null });

            const response = await api.post<AuthResponse>(
              "/auth/signup/",
              userData
            );
            const { access, refresh, user } = response.data;

            // Store tokens
            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);

            // Create user profile
            const profileData = {
              type_job: userData.type_job,
            };
            const profileResponse = await api.post<UserProfile>(
              "/users/profile/",
              profileData
            );

            set({
              user,
              profile: profileResponse.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: unknown) {
            const apiError = error as ApiError;
            const errorMessage =
              apiError.response?.data?.detail ||
              apiError.response?.data?.message ||
              "Signup failed. Please try again.";
            set({
              error: errorMessage,
              isLoading: false,
              isAuthenticated: false,
            });
            throw error;
          }
        },

        // Logout action
        logout: () => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({
            user: null,
            profile: null,
            isAuthenticated: false,
            error: null,
          });
        },

        // Refresh user data
        refreshUser: async () => {
          try {
            const { user } = get();
            if (!user) return;

            set({ isLoading: true });

            const [userResponse, profileResponse] = await Promise.all([
              api.get<User>(`/users/${user.id}/`),
              api.get<UserProfile>(`/users/${user.id}/profile/`),
            ]);

            set({
              user: userResponse.data,
              profile: profileResponse.data,
              isLoading: false,
            });
          } catch (error) {
            set({ isLoading: false });
            console.error("Failed to refresh user data:", error);
          }
        },

        // Clear error
        clearError: () => set({ error: null }),

        // Set loading
        setLoading: (loading: boolean) => set({ isLoading: loading }),
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          user: state.user,
          profile: state.profile,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: "auth-store",
    }
  )
);
