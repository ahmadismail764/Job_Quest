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
  company_name?: string;
  email: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  profile_picture?: string;
  experience_years?: number;
  resume?: string;
  created_at: string;
  updated_at: string;
  full_name: string;
}

export interface Company {
  id: number;
  name: string;
  description: string;
  website?: string;
  logo?: string;
  industry?: string;
  size?: string;
  location?: string;
  founded?: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: number;
  title: string;
  company: Company;
  description: string;
  requirements: string[];
  location: string;
  salary_min?: number;
  salary_max?: number;
  salary_display: string;
  job_type: "full_time" | "part_time" | "contract" | "freelance" | "internship";
  experience_level: "entry" | "mid" | "senior" | "executive";
  years_of_experience: number;
  is_remote: boolean;
  is_active: boolean;
  tags: string[];
  application_deadline?: string;
  posted_by: UserProfile;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job: Job;
  applicant: UserProfile;
  status:
    | "pending"
    | "under_review"
    | "interview_scheduled"
    | "accepted"
    | "rejected";
  cover_letter?: string;
  resume?: string;
  applied_at: string;
  updated_at: string;
}

export interface SavedJob {
  id: number;
  user: UserProfile;
  job: Job;
  saved_at: string;
}

export interface Experience {
  id: number;
  user_account: number;
  company: string;
  position: string;
  description?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
}

export interface Project {
  id: number;
  user_account: number;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  github_url?: string;
  start_date: string;
  end_date?: string;
}

export interface Education {
  id: number;
  user_account: number;
  degree_type:
    | "high_school"
    | "associate"
    | "bachelor"
    | "master"
    | "doctorate"
    | "certificate"
    | "bootcamp";
  field_of_study?: string;
  institution: string;
  start_year: string;
  end_year?: string;
  gpa?: number;
  description?: string;
}

export interface Skill {
  id: number;
  user_account: number;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  years_of_experience: number;
}

export interface Certificate {
  id: number;
  user_account: number;
  title: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface License {
  id: number;
  user_account: number;
  title: string;
  issuing_organization: string;
  issue_date: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
}

export interface Award {
  id: number;
  user_account: number;
  name: string;
  description?: string;
  issuing_organization: string;
  date_received: string;
  url?: string;
}

export interface Interest {
  id: number;
  user_account: number;
  title: string;
  since: string;
}

// API Response types
export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
  profile: UserProfile;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
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
  confirmPassword: string;
  first_name: string;
  last_name: string;
  type_job: "job_seeker" | "employer";
}

export interface JobApplicationForm {
  cover_letter: string;
  resume?: File;
}

export interface JobSearchParams {
  search?: string;
  location?: string;
  job_type?: string;
  experience_level?: string;
  is_remote?: boolean;
  company?: string;
  ordering?: string;
  page?: number;
}

export interface CompanySearchParams {
  search?: string;
  industry?: string;
  size?: string;
  location?: string;
  ordering?: string;
  page?: number;
}
