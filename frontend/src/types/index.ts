// Core types based on Django models
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface UserProfile {
  id: number;
  user: User;
  type_job: "job_seeker" | "employer";
  phone_number?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience_years?: number;
  resume?: string;
  profile_picture?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  type: "Full-time" | "Part-time" | "Contract" | "Freelance" | "Internship";
  postedDate: string;
  applicationDeadline: string;
  isRemote: boolean;
  tags: string[];
  // Legacy fields for Django compatibility
  salary_min?: number;
  salary_max?: number;
  job_type?: "full_time" | "part_time" | "contract" | "internship" | "remote";
  category?: string;
  is_active?: boolean;
  posted_by?: User;
  created_at?: string;
  updated_at?: string;
  deadline?: string;
  experience_level?: "entry" | "mid" | "senior" | "executive";
}

export interface Application {
  id: number;
  job: Job;
  applicant: User;
  cover_letter: string;
  resume?: string;
  status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
  applied_at: string;
  updated_at: string;
  notes?: string;
}

export interface Award {
  id: number;
  user: User;
  title: string;
  organization: string;
  date_received: string;
  description?: string;
}

export interface Certificate {
  id: number;
  user: User;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface Experience {
  id: number;
  user: User;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  location?: string;
}

export interface License {
  id: number;
  user: User;
  name: string;
  issuing_authority: string;
  license_number: string;
  issue_date: string;
  expiry_date?: string;
}

export interface Project {
  id: number;
  user: User;
  title: string;
  description: string;
  technologies_used: string[];
  start_date: string;
  end_date?: string;
  project_url?: string;
  github_url?: string;
  is_featured: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}

// Form types
export interface LoginForm {
  username: string;
  password: string;
}

export interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  type_job: "job_seeker" | "employer";
  first_name: string;
  last_name: string;
}

export interface JobApplicationForm {
  cover_letter: string;
  resume?: File;
}

export interface JobPostForm {
  title: string;
  company: string;
  description: string;
  requirements: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  job_type: "full_time" | "part_time" | "contract" | "internship" | "remote";
  category: string;
  deadline?: string;
  experience_level: "entry" | "mid" | "senior" | "executive";
}

// Filter types
export interface JobFilters {
  search?: string;
  location?: string;
  job_type?: string[];
  category?: string;
  salary_min?: number;
  salary_max?: number;
  experience_level?: string[];
  company?: string;
  posted_within?: "day" | "week" | "month";
}

// State types
export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  filters: JobFilters;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
}

export interface ApplicationState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
}
