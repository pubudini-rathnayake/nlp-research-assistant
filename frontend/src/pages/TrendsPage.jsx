import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function TrendsPage() {
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    setTrends(null);

    try {
      const res = await api.get("/api/trends/");
      setTrends(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to analyze trends.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Research Trends 📈
          </h1>
          <p className="text-gray-500 mb-8">
            Discover emerging topics and patterns across your uploaded papers.
          </p>

          {/* Plan check */}
          {user.plan === "free" ? (
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white">
              <div className="text-5xl mb-4">📈</div>
              <h2 className="text-3xl font-black mb-3">Pro Feature</h2>
              <p className="text-indigo-200 mb-6">
                Trend analysis is available on Pro and Team plans.
              </p>

                <a href="/pricing"
                className="inline-block px-8 py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:scale-105 transition"
              >
                Upgrade to Pro ⭐
              </a>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-500 mb-6">
                  Click below to analyze trends across all your uploaded papers.
                  You need at least 2 papers uploaded.
                </p>

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
                >
                  {loading ? "🧠 Analyzing trends..." : "Analyze Research Trends 📈"}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 rounded-xl py-3 px-4 mb-6 text-center">
                  {error}
                </p>
              )}

              {trends && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
                >
                  <h2 className="text-2xl font-black text-gray-900 mb-2">
                    Trend Analysis Report
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    Based on {trends.total_papers_analyzed} papers
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {trends.paper_titles.map((title, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
                      >
                        {title}
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {trends.trends}
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}