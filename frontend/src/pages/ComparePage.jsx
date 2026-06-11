import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function ComparePage() {
  const [papers, setPapers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/papers/").then((res) => setPapers(res.data));
  }, []);

  const togglePaper = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleCompare = async () => {
    if (selectedIds.length < 2) return setError("Select at least 2 papers.");
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await api.post("/api/compare/", { paper_ids: selectedIds });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Comparison failed. Try again.");
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
            Compare Papers ⚖️
          </h1>
          <p className="text-gray-500 mb-8">
            Select 2 or more papers to get a detailed AI comparison report.
          </p>

          {/* Paper Selection */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Select Papers ({selectedIds.length} selected)
            </h2>

            {papers.length === 0 ? (
              <p className="text-gray-400 text-center py-6">
                No papers uploaded yet.{" "}
                <a href="/upload" className="text-indigo-600 font-semibold">
                  Upload papers first
                </a>
              </p>
            ) : (
              <div className="grid gap-3">
                {papers.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => togglePaper(paper.id)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                      selectedIds.includes(paper.id)
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedIds.includes(paper.id)
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-300"
                      }`}>
                        {selectedIds.includes(paper.id) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{paper.title}</p>
                        <p className="text-xs text-gray-400">
                          {paper.page_count} pages • {paper.word_count?.toLocaleString()} words
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 rounded-xl py-2 px-4 mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleCompare}
            disabled={loading || selectedIds.length < 2}
            className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60 mb-8"
          >
            {loading ? "🧠 AI is comparing papers..." : "Compare Selected Papers ⚖️"}
          </button>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Comparison Report
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {result.papers_compared.map((title, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium"
                  >
                    {title}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {result.comparison}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}