import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { getContactSubmissions, exportAllSubmissions, clearAllSubmissions, ContactSubmission } from "../../../lib/contactUtils";

export default function Page() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const allSubmissions = await getContactSubmissions();
      setSubmissions(allSubmissions);
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  const handleExport = async () => {
    try {
      await exportAllSubmissions();
    } catch (error) {
      console.error('Error exporting submissions:', error);
    }
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to delete all contact submissions? This action cannot be undone.')) {
      try {
        await clearAllSubmissions();
        setSubmissions([]);
        setSelectedSubmission(null);
        alert('All submissions cleared successfully!');
      } catch (error) {
        console.error('Error clearing submissions:', error);
        alert('Error clearing submissions. Please try again.');
      }
    }
  };

  const filteredSubmissions = filter === "all" 
    ? submissions 
    : submissions.filter(sub => sub.inquiryType === filter);

  const inquiryTypes = Array.from(new Set(submissions.map(sub => sub.inquiryType)));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Helmet>
        <title>Contact Submissions - VEX Aware Admin</title>
        <meta name="description" content="Manage and review contact form submissions from the VEX Aware platform." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Contact Submissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {submissions.length} total submissions
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Export All
            </button>
            <button
              onClick={handleClear}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Clear All
            </button>
            <button
              onClick={loadSubmissions}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              All ({submissions.length})
            </button>
            {inquiryTypes.map((type) => {
              const count = submissions.filter(sub => sub.inquiryType === type).length;
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filter === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No submissions yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Contact form submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Submissions List */}
            <div className="lg:col-span-1">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedSubmission?.id === submission.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {submission.name}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(submission.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {submission.email}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                        {submission.inquiryType}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(submission.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                      {submission.subject}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Details */}
            <div className="lg:col-span-2">
              {selectedSubmission ? (
                <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedSubmission.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedSubmission.email}
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      <p>ID: {selectedSubmission.id}</p>
                      <p>{new Date(selectedSubmission.timestamp).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedSubmission.company || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Inquiry Type
                      </label>
                      <span className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                        {selectedSubmission.inquiryType}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {selectedSubmission.subject}
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Technical Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div>
                        <span className="font-medium">IP Address:</span>
                        <br />
                        {selectedSubmission.ipAddress}
                      </div>
                      <div>
                        <span className="font-medium">User Agent:</span>
                        <br />
                        <span className="break-all">{selectedSubmission.userAgent}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
                  <div className="text-gray-400 text-4xl mb-4">📄</div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a submission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on a submission from the list to view its details.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}