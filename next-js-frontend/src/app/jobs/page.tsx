"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Job } from "@/types";

// Mock job data - will be replaced with real API calls
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for a senior frontend developer with experience in React and TypeScript...",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Team leadership skills",
    ],
    postedDate: "2024-01-15",
    applicationDeadline: "2024-02-15",
    isRemote: false,
    tags: ["React", "TypeScript", "Leadership", "Frontend"],
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    description: "Join our fast-growing startup as a full stack engineer...",
    requirements: [
      "3+ years full stack experience",
      "Node.js",
      "React",
      "Database design",
    ],
    postedDate: "2024-01-14",
    applicationDeadline: "2024-02-10",
    isRemote: true,
    tags: ["React", "Node.js", "MongoDB", "Full Stack"],
  },
  {
    id: "3",
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description:
      "Lead product development for our enterprise software solutions...",
    requirements: [
      "5+ years product management",
      "Agile methodology",
      "Technical background",
    ],
    postedDate: "2024-01-13",
    applicationDeadline: "2024-02-05",
    isRemote: false,
    tags: ["Product Management", "Agile", "Strategy", "Leadership"],
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudFirst",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$100,000 - $135,000",
    description:
      "Design and maintain our cloud infrastructure and CI/CD pipelines...",
    requirements: [
      "AWS/Azure experience",
      "Docker/Kubernetes",
      "CI/CD pipelines",
      "Infrastructure as Code",
    ],
    postedDate: "2024-01-12",
    applicationDeadline: "2024-02-01",
    isRemote: true,
    tags: ["DevOps", "AWS", "Docker", "Kubernetes"],
  },
  {
    id: "5",
    title: "UX Designer",
    company: "DesignStudio",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$70 - $100/hour",
    description:
      "Create beautiful and intuitive user experiences for our mobile apps...",
    requirements: [
      "Portfolio of mobile designs",
      "Figma proficiency",
      "User research experience",
    ],
    postedDate: "2024-01-11",
    applicationDeadline: "2024-01-30",
    isRemote: false,
    tags: ["UX Design", "Mobile", "Figma", "User Research"],
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "DataCorp",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$95,000 - $125,000",
    description:
      "Analyze large datasets to drive business insights and machine learning models...",
    requirements: [
      "Python/R proficiency",
      "Machine learning experience",
      "SQL expertise",
      "Statistics background",
    ],
    postedDate: "2024-01-10",
    applicationDeadline: "2024-01-28",
    isRemote: true,
    tags: ["Data Science", "Python", "Machine Learning", "SQL"],
  },
];

export default function JobsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleSearch = () => {
    const filtered = mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesLocation =
        !locationFilter ||
        job.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
        (locationFilter.toLowerCase() === "remote" && job.isRemote);

      const matchesType = !jobTypeFilter || job.type === jobTypeFilter;

      return matchesSearch && matchesLocation && matchesType;
    });

    setFilteredJobs(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setJobTypeFilter("");
    setFilteredJobs(mockJobs);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>

          {/* Search Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Job Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title, company, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Job Type Filter */}
              <div>
                <select
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex space-x-2">
                <button
                  onClick={handleSearch}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Search
                </button>
                <button
                  onClick={resetFilters}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {mockJobs.length} jobs
          </p>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Sort by: Most Recent</option>
            <option>Sort by: Salary (High to Low)</option>
            <option>Sort by: Salary (Low to High)</option>
            <option>Sort by: Company Name</option>
          </select>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {" "}
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mb-2">
                    {job.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {job.salary}
                    </div>
                    {job.isRemote && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                        Remote
                      </span>
                    )}
                  </div>
                </div>{" "}
                <div className="flex space-x-3">
                  <button
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle save job logic
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/jobs/${job.id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {job.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500">
                Posted {new Date(job.postedDate).toLocaleDateString()} • Apply
                by {new Date(job.applicationDeadline).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
