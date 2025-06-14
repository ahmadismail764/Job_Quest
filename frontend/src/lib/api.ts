import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Job, Company, JobApplication, UserProfile, User } from "@/types";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          typeof window !== "undefined"
            ? localStorage.getItem("refreshToken")
            : null;

        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem("accessToken", access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/auth/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

// API Methods
export const api = {
  // Generic methods
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.get(url, config),

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.post(url, data, config),

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.put(url, data, config),

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.patch(url, data, config),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => apiClient.delete(url, config),
};

export default apiClient;

// API Response types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface JobsResponse extends PaginatedResponse<Job> {}
export interface CompaniesResponse extends PaginatedResponse<Company> {}

// Specific API functions for our Django backend
export const jobsApi = {
  // Get all jobs with filtering
  getJobs: async (params?: {
    search?: string;
    job_type?: string;
    experience_level?: string;
    is_remote?: boolean;
    page?: number;
  }): Promise<JobsResponse> => {
    const response = await api.get<JobsResponse>("/jobs/", { params });
    return response.data;
  },

  // Get single job
  getJob: async (id: number): Promise<Job> => {
    const response = await api.get<Job>(`/jobs/${id}/`);
    return response.data;
  },

  // Get job statistics
  getJobStats: async (): Promise<any> => {
    const response = await api.get<any>("/jobs/stats/");
    return response.data;
  },
};

export const companiesApi = {
  // Get all companies
  getCompanies: async (params?: {
    search?: string;
    page?: number;
  }): Promise<CompaniesResponse> => {
    const response = await api.get<CompaniesResponse>("/companies/", {
      params,
    });
    return response.data;
  },

  // Get single company
  getCompany: async (id: number): Promise<Company> => {
    const response = await api.get<Company>(`/companies/${id}/`);
    return response.data;
  },

  // Get company jobs
  getCompanyJobs: async (id: number) => {
    const response = await api.get(`/companies/${id}/jobs/`);
    return response.data;
  },
};

export const authApi = {
  // User login
  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post("/user/auth/login/", credentials);
    return response.data;
  },

  // User registration
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
  }) => {
    const response = await api.post("/user/auth/register/", userData);
    return response.data;
  },

  // User logout
  logout: async () => {
    const response = await api.post("/user/auth/logout/");
    return response.data;
  },
};

export const userApi = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get("/user/profile/");
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: any) => {
    const response = await api.patch("/user/profile/", data);
    return response.data;
  },

  // Get user dashboard
  getDashboard: async () => {
    const response = await api.get("/user/dashboard/");
    return response.data;
  },
};
