"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  openJobs: number;
  rating: number;
  website: string;
  founded: string;
  tags: string[];
}

// Mock company data
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Inc.",
    industry: "Technology",
    location: "San Francisco, CA",
    size: "500-1000 employees",
    description:
      "Leading technology company building innovative software solutions for businesses worldwide.",
    openJobs: 12,
    rating: 4.5,
    website: "https://techcorp.com",
    founded: "2015",
    tags: [
      "Remote Friendly",
      "Great Benefits",
      "Innovation",
      "Work-Life Balance",
    ],
  },
  {
    id: "2",
    name: "StartupXYZ",
    industry: "Financial Technology",
    location: "New York, NY",
    size: "50-100 employees",
    description:
      "Fast-growing fintech startup revolutionizing digital payments and financial services.",
    openJobs: 8,
    rating: 4.2,
    website: "https://startupxyz.com",
    founded: "2020",
    tags: ["Startup", "Equity", "Fast Growth", "Innovation"],
  },
  {
    id: "3",
    name: "InnovateLabs",
    industry: "Healthcare Technology",
    location: "Boston, MA",
    size: "200-500 employees",
    description:
      "Healthcare technology company developing cutting-edge medical software and devices.",
    openJobs: 15,
    rating: 4.7,
    website: "https://innovatelabs.com",
    founded: "2018",
    tags: ["Healthcare", "Impact", "R&D", "Remote Friendly"],
  },
  {
    id: "4",
    name: "CloudFirst",
    industry: "Cloud Computing",
    location: "Seattle, WA",
    size: "1000+ employees",
    description:
      "Enterprise cloud solutions provider helping businesses scale their infrastructure.",
    openJobs: 25,
    rating: 4.3,
    website: "https://cloudfirst.com",
    founded: "2012",
    tags: ["Enterprise", "Cloud", "Scalable", "Learning"],
  },
  {
    id: "5",
    name: "DesignStudio",
    industry: "Design & Creative",
    location: "Los Angeles, CA",
    size: "10-50 employees",
    description:
      "Creative design agency specializing in brand identity, UX/UI design, and digital experiences.",
    openJobs: 3,
    rating: 4.8,
    website: "https://designstudio.com",
    founded: "2019",
    tags: ["Creative", "Design", "Collaborative", "Portfolio"],
  },
  {
    id: "6",
    name: "DataCorp",
    industry: "Data & Analytics",
    location: "Austin, TX",
    size: "100-200 employees",
    description:
      "Data analytics company providing business intelligence and machine learning solutions.",
    openJobs: 7,
    rating: 4.4,
    website: "https://datacorp.com",
    founded: "2017",
    tags: ["Data Science", "AI/ML", "Analytics", "Remote Friendly"],
  },
];

export default function CompaniesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);

  const industries = [
    ...new Set(mockCompanies.map((company) => company.industry)),
  ];
  const sizes = [...new Set(mockCompanies.map((company) => company.size))];

  const handleSearch = () => {
    const filtered = mockCompanies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesIndustry =
        !industryFilter || company.industry === industryFilter;
      const matchesSize = !sizeFilter || company.size === sizeFilter;

      return matchesSearch && matchesIndustry && matchesSize;
    });

    setFilteredCompanies(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setIndustryFilter("");
    setSizeFilter("");
    setFilteredCompanies(mockCompanies);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Companies
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover great companies and find your perfect workplace culture
            </p>
          </div>

          {/* Search Filters */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Company Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Company name or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Industry Filter */}
              <div>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div>
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Company Sizes</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
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
            Showing {filteredCompanies.length} of {mockCompanies.length}{" "}
            companies
          </p>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>Sort by: Name</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Open Jobs</option>
            <option>Sort by: Company Size</option>
          </select>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/companies/${company.id}`)}
            >
              {/* Company Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Company Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {company.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  {company.size}
                </div>
                <div className="flex items-center justify-between">
                  {renderStars(company.rating)}
                  <span className="text-sm text-blue-600 font-medium">
                    {company.openJobs} open jobs
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {company.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {company.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {company.tags.length > 3 && (
                  <span className="text-gray-500 text-xs">
                    +{company.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle follow company
                  }}
                >
                  Follow
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/jobs?company=${company.name}`);
                  }}
                >
                  View Jobs
                </button>
              </div>

              {/* Founded */}
              <div className="text-xs text-gray-500 mt-3">
                Founded in {company.founded}
              </div>
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
