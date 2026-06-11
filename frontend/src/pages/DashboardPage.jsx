import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import PaperCard from "../components/PaperCard";
import UsageBar from "../components/UsageBar";
import PlanBadge from "../components/PlanBadge";
import api from "../api/axios";

export default function DashboardPage() {
  const [papers, setPapers] = useState([]);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [papersRes, usageRes] = await Promise.all([
          api.get("/api/papers/"),
          api.get("/api/plans/usage"),
        ]);
        setPapers(papersRes.data);
        setUsage(usageRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (paperId) => {
    if (!confirm("Are you sure you want to delete this paper?")) return;
    try {
      await api.delete(`/api/papers/${paperId}`);
      setPapers(papers.filter((p) => p.id !== paperId));
    } catch (err) {
      alert("Failed to delete paper.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
                <PlanBadge plan={user.plan || "free"} />
              </div>
              <p className="text-gray-500">Welcome back, {user.email} 👋</p>
            </div>
            <Link
              to="/upload"
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
            >
              + Upload Paper
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Left - Papers */}
          <div className="md:col-span-2">

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: "🧠", label: "Ask a Question", to: "/search", color: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700" },
                { icon: "⚖️", label: "Compare Papers", to: "/compare", color: "bg-purple-50 hover:bg-purple-100 text-purple-700" },
                { icon: "📈", label: "View Trends", to: "/trends", color: "bg-green-50 hover:bg-green-100 text-green-700" },
              ].map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className={`${action.color} rounded-2xl p-5 text-center transition font-semibold`}
                >
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <div className="text-sm">{action.label}</div>
                </Link>
              ))}
            </div>

            {/* Papers List */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Your Papers ({papers.length})
              </h2>

              {loading ? (
                <p className="text-gray-400 animate-pulse">Loading papers...</p>
              ) : papers.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                  <div className="text-5xl mb-4">📄</div>
                  <p className="text-gray-500 mb-4">No papers uploaded yet</p>
                  <Link
                    to="/upload"
                    className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    Upload Your First Paper
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {papers.map((paper) => (
                    <PaperCard
                      key={paper.id}
                      paper={paper}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right - Usage & Plan */}
          <div>
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-black text-gray-900 mb-4">
                Plan Usage
              </h3>

              {usage ? (
                <>
                  <UsageBar
                    label="Papers Uploaded"
                    used={usage.usage.papers_uploaded}
                    max={usage.usage.max_papers}
                  />
                  <UsageBar
                    label="Questions Today"
                    used={usage.usage.questions_asked_today}
                    max={usage.usage.max_questions_per_day}
                  />
                  <UsageBar
                    label="Comparisons"
                    used={usage.usage.comparisons_done}
                    max={usage.usage.max_comparisons}
                  />

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Trend Analysis</span>
                      <span className={usage.features.trend_analysis ? "text-green-500" : "text-red-400"}>
                        {usage.features.trend_analysis ? "✓ Available" : "✗ Upgrade"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Team Workspace</span>
                      <span className={usage.features.team_workspace ? "text-green-500" : "text-red-400"}>
                        {usage.features.team_workspace ? "✓ Available" : "✗ Upgrade"}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 animate-pulse">Loading usage...</p>
              )}
            </div>

            {/* Upgrade Card */}
            {user.plan === "free" && (
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white">
                <h3 className="font-black text-lg mb-2">Upgrade to Pro ⭐</h3>
                <p className="text-indigo-200 text-sm mb-4">
                  Unlock unlimited papers, questions, and trend analysis.
                </p>
                <Link
                  to="/pricing"
                  className="block text-center py-3 rounded-2xl bg-white text-indigo-600 font-semibold hover:scale-105 transition"
                >
                  View Plans
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}