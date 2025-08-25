import React, { useState, useEffect } from "react";
import { Leaf, PlusCircle, Trash2, Camera } from "lucide-react";
import axios from 'axios';

// The API URL is set to the correct port (3000)
const API_URL = "http://localhost:3000/api";

const Profile = () => {
  const [credits, setCredits] = useState(0);
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportImage, setReportImage] = useState(null);
  const [reportImagePreview, setReportImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(true);

  const [prevCredits, setPrevCredits] = useState(0);
  const [showCreditAnimation, setShowCreditAnimation] = useState(false);

  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const [userResponse, reportsResponse] = await Promise.all([
          axios.get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/reports`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setCredits(userResponse.data.user.credits);
        setPrevCredits(userResponse.data.user.credits);
        setReports(reportsResponse.data.reports);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (credits > prevCredits) {
      setShowCreditAnimation(true);
      const timer = setTimeout(() => setShowCreditAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevCredits(credits);
  }, [credits, prevCredits]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setReportImage(file);
    if (file) {
      setReportImagePreview(URL.createObjectURL(file));
    } else {
      setReportImagePreview(null);
    }
  };

  const handleReportSubmit = async () => {
    if ((!reportText.trim() && !reportImage) || submitting) {
      return alert("Please provide some text or an image for the report.");
    }
    setSubmitting(true);
    const token = getAuthToken();
    
    const formData = new FormData();
    formData.append("text", reportText);
    if (reportImage) {
      formData.append("reportImage", reportImage);
    }

    try {
      const response = await axios.post(`${API_URL}/reports`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // No need to manually set 'Content-Type', Axios handles it for FormData
        },
      });
      
      setReports((prev) => [response.data.report, ...prev]);
      setCredits(response.data.user.credits);
      setReportText("");
      setReportImage(null);
      setReportImagePreview(null);
      setShowForm(false);
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReport = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    const token = getAuthToken();

    try {
      const response = await axios.delete(`${API_URL}/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReports((prev) => prev.filter((r) => r.id !== id));
      setCredits(response.data.user.credits);
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Failed to delete report. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-3xl" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center gradient-text">Your Profile</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full breathe-animation"></div>
        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 flex justify-center relative">
          <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-800 px-4 py-2 rounded-full animate-pulse">
            <Leaf className="text-emerald-600 dark:text-emerald-300" />
            <span className="font-bold text-emerald-700 dark:text-emerald-100">
              {credits} Credits
            </span>
          </div>
          {showCreditAnimation && (
            <div className="absolute inset-0 flex items-center justify-center animate-fireworks">
              🎉 🎊 🔥
            </div>
          )}
        </div>
        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Report a Pollution Event
          </h3>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
            >
              <PlusCircle /> Report Event
            </button>
          ) : (
            <div className="space-y-4">
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Describe the pollution event..."
                className="w-full p-3 border border-emerald-300 dark:border-emerald-600 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
              <label htmlFor="image-upload" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer">
                <Camera size={20} />
                <span className="font-medium">
                  {reportImage ? `Selected: ${reportImage.name}` : "Add an image (optional)"}
                </span>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {reportImagePreview && (
                <div className="mt-2 w-full max-w-xs rounded-lg overflow-hidden border border-gray-300">
                  <img src={reportImagePreview} alt="Selected report preview" className="w-full h-auto object-cover" />
                </div>
              )}
              <div className="flex gap-4">
                <button
                  onClick={handleReportSubmit}
                  disabled={submitting}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-emerald-200/50 dark:border-emerald-700/50">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Your Reports
          </h3>
          {reports.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No reports submitted yet.</p>
          ) : (
            <ul className="space-y-3">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-gray-800 dark:text-gray-200 shadow-sm flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">{report.text}</p>
                    {report.image_path && (
                      <div className="mt-2 w-32 rounded-lg overflow-hidden border border-gray-300">
                        <img 
                          src={`http://localhost:3000/${report.image_path}`} 
                          alt="Report" 
                          className="w-full h-auto object-cover" 
                        />
                      </div>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400 block mt-2">
                      {new Date(report.created_at).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteReport(report.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {showToast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6 py-4 rounded-xl shadow-2xl 
          bg-white/20 dark:bg-gray-800/40 backdrop-blur-md border border-emerald-400/50 
          text-emerald-800 dark:text-emerald-100 font-semibold text-lg flex items-center gap-3 
          animate-fadeInOut"
        >
          🌱 Save Environment!
        </div>
      )}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(20px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 10s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Profile;