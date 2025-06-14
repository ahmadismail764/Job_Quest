"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPinIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  CheckIcon,
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

// Mock job data - will be replaced with real API calls
const mockJobDetail = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$120,000 - $150,000",
  description: `We are looking for a senior frontend developer with experience in React and TypeScript to join our dynamic team. You'll be working on cutting-edge web applications that serve millions of users worldwide.

As a Senior Frontend Developer, you'll lead the development of user-facing features, collaborate with designers and backend engineers, and mentor junior developers. This is an excellent opportunity to make a significant impact on our product and grow your career in a fast-paced, innovative environment.`,

  requirements: [
    "5+ years of professional React development experience",
    "Strong proficiency in TypeScript and modern JavaScript (ES6+)",
    "Experience with state management libraries (Redux, Zustand, or similar)",
    "Knowledge of modern build tools (Webpack, Vite, etc.)",
    "Experience with testing frameworks (Jest, React Testing Library)",
    "Understanding of responsive design and cross-browser compatibility",
    "Experience with Git and collaborative development workflows",
    "Team leadership and mentoring experience preferred",
  ],

  responsibilities: [
    "Lead the development of complex frontend features and applications",
    "Collaborate with product managers and designers to translate requirements into technical solutions",
    "Write clean, maintainable, and well-tested code",
    "Mentor junior developers and conduct code reviews",
    "Optimize applications for maximum speed and scalability",
    "Stay up-to-date with latest frontend technologies and best practices",
    "Participate in technical architecture discussions and decisions",
    "Contribute to our engineering culture and best practices",
  ],

  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Flexible working hours and remote work options",
    "Professional development budget ($3,000/year)",
    "Top-tier hardware and equipment",
    "Catered meals and unlimited snacks",
    "401(k) with company matching",
    "Generous vacation policy",
    "Parental leave",
    "Wellness programs and gym membership",
  ],

  postedDate: "2024-01-15",
  applicationDeadline: "2024-02-15",
  isRemote: false,
  tags: ["React", "TypeScript", "Leadership", "Frontend"],

  companyInfo: {
    name: "TechCorp Inc.",
    size: "500-1000 employees",
    industry: "Technology",
    founded: "2015",
    website: "https://techcorp.com",
    description:
      "TechCorp is a leading technology company that builds innovative software solutions for businesses worldwide. We're committed to creating products that make a positive impact on people's lives.",
  },
};

export default function JobDetailPage() {
  // const params = useParams(); // Will be used when connecting to real API
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  // In a real app, we'd fetch the job by ID from params.id
  // const jobId = params.id; // Will be used when connecting to real API
  const job = mockJobDetail;

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    // In a real app, this would call an API to save/unsave the job
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: job.description,
        url: window.location.href,
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to jobs
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center mb-4">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-xl text-blue-600 font-medium">
                  {job.company}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
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
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Posted {new Date(job.postedDate).toLocaleDateString()}
                </div>
                {job.isRemote && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Remote
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 lg:ml-6">
              <button
                onClick={handleSaveJob}
                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  isSaved
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {isSaved ? (
                  <HeartSolidIcon className="h-5 w-5 mr-2" />
                ) : (
                  <HeartIcon className="h-5 w-5 mr-2" />
                )}
                {isSaved ? "Saved" : "Save Job"}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShareIcon className="h-5 w-5 mr-2" />
                Share
              </button>

              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="prose prose-gray max-w-none">
                {job.description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Benefits & Perks
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Deadline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Application Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="h-5 w-5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Apply by</p>
                    <p className="font-medium">
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About {job.companyInfo.name}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Industry</span>
                  <p className="font-medium">{job.companyInfo.industry}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Company Size</span>
                  <p className="font-medium">{job.companyInfo.size}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Founded</span>
                  <p className="font-medium">{job.companyInfo.founded}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                {job.companyInfo.description}
              </p>
              <a
                href={job.companyInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Visit Company Website →
              </a>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-gray-900">
                    Frontend Developer
                  </h4>
                  <p className="text-sm text-gray-600">StartupXYZ</p>
                  <p className="text-sm text-gray-500">Remote</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-gray-900">React Developer</h4>
                  <p className="text-sm text-gray-600">DevCorp</p>
                  <p className="text-sm text-gray-500">New York, NY</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-gray-900">UI Engineer</h4>
                  <p className="text-sm text-gray-600">WebTech</p>
                  <p className="text-sm text-gray-500">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal/Form would go here */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Apply for {job.title}
              </h2>
              <p className="text-gray-600 mb-6">
                Complete your application for this position at {job.company}.
              </p>

              {/* Application form would go here */}
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  Application form coming soon...
                </p>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
