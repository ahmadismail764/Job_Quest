"use client";

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">
                Welcome back, {user.first_name}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Logged in as:{" "}
                <span className="font-medium">{user.username}</span>
              </span>
              <button
                onClick={() => {
                  useAuthStore.setState({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                  });
                  router.push("/");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Welcome back
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">
                    Account created:{" "}
                    {new Date(user.date_joined).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Applications
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">💼</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Saved Jobs
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔍</div>
                  <div className="font-medium text-gray-900">Search Jobs</div>
                  <div className="text-sm text-gray-500">
                    Find your dream job
                  </div>
                </div>
              </button>

              <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-2xl mb-2">📄</div>
                  <div className="font-medium text-gray-900">Update Resume</div>
                  <div className="text-sm text-gray-500">
                    Keep your profile current
                  </div>
                </div>
              </button>

              <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium text-gray-900">
                    View Analytics
                  </div>
                  <div className="text-sm text-gray-500">
                    Track your progress
                  </div>
                </div>
              </button>

              <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-medium text-gray-900">Settings</div>
                  <div className="text-sm text-gray-500">
                    Manage your account
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="bg-white shadow rounded-lg">
              <div className="p-6 text-center text-gray-500">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No recent activity
                </h3>
                <p className="text-sm">
                  Start by searching for jobs or updating your profile to see
                  activity here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
