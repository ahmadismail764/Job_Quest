"use client";

import { useState } from "react";
import {
  UserIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock user data - will be replaced with real API calls
const mockUserProfile = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  title: "Senior Frontend Developer",
  bio: "Passionate frontend developer with 6+ years of experience building scalable web applications. I love creating beautiful, user-friendly interfaces and staying up-to-date with the latest technologies.",

  experience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      startDate: "2022-01",
      endDate: null,
      current: true,
      description:
        "Leading frontend development for multiple web applications, mentoring junior developers, and implementing modern React practices.",
    },
    {
      id: "2",
      company: "WebDev Solutions",
      position: "Frontend Developer",
      startDate: "2019-06",
      endDate: "2021-12",
      current: false,
      description:
        "Developed responsive web applications using React, TypeScript, and modern CSS frameworks.",
    },
  ],

  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2015-08",
      endDate: "2019-05",
      gpa: "3.8",
    },
  ],

  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Node.js",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Git",
    "Jest",
    "Cypress",
  ],

  applications: [
    {
      id: "1",
      jobTitle: "Senior React Developer",
      company: "StartupXYZ",
      appliedDate: "2024-01-10",
      status: "under_review",
    },
    {
      id: "2",
      jobTitle: "Frontend Lead",
      company: "TechFlow",
      appliedDate: "2024-01-08",
      status: "interview_scheduled",
    },
  ],

  savedJobs: [
    {
      id: "3",
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      location: "Remote",
      savedDate: "2024-01-12",
    },
  ],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState(mockUserProfile);
  const [editedProfile, setEditedProfile] = useState(mockUserProfile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, this would save to the API
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under_review":
        return "bg-yellow-100 text-yellow-800";
      case "interview_scheduled":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "under_review":
        return "Under Review";
      case "interview_scheduled":
        return "Interview Scheduled";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return "Applied";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{profile.title}</p>
                <div className="flex items-center text-gray-500 mt-2">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {profile.location}
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <XMarkIcon className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <CheckIcon className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "experience", label: "Experience" },
              { id: "applications", label: "My Applications" },
              { id: "saved", label: "Saved Jobs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            email: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-900">{profile.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="flex items-center">
                    <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            phone: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-900">{profile.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            location: e.target.value,
                          })
                        }
                        className="flex-1 border border-gray-300 rounded px-3 py-2"
                      />
                    ) : (
                      <span className="text-gray-900">{profile.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About Me
              </h2>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                  rows={6}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-8">
            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Work Experience
              </h2>
              <div className="space-y-6">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      {exp.current && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(exp.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -
                      {exp.current
                        ? " Present"
                        : ` ${new Date(exp.endDate!).toLocaleDateString(
                            "en-US",
                            { month: "long", year: "numeric" }
                          )}`}
                    </p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Education
              </h2>
              <div className="space-y-6">
                {profile.education.map((edu) => (
                  <div
                    key={edu.id}
                    className="border-l-4 border-green-500 pl-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {new Date(edu.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -
                      {new Date(edu.endDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-600 mt-2">GPA: {edu.gpa}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Applications
            </h2>
            <div className="space-y-4">
              {profile.applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.jobTitle}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {application.company}
                      </p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        Applied on{" "}
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {getStatusText(application.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "saved" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Saved Jobs
            </h2>
            <div className="space-y-4">
              {profile.savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Remove
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
