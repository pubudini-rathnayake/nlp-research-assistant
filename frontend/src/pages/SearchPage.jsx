import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import AnswerCard from "../components/AnswerCard";
import api from "../api/axios";

export default function SearchPage() {
  const [question, setQuestion] = useState("");
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/papers/").then((res) => setPapers(res.data));
  }, []);

  const handleAsk = async () => {
    if (!question.trim()) return setError("Please enter a question.");
    setLoading(true);
    setError("");

    try {
      const payload = { question };
      if (selectedPaper) payload.paper_id = parseInt(selectedPaper);

      const res = await api.post("/api/search/query", payload);
      setAnswers([res.data, ...answers]);
      setQuestion("");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get answer. Try again.");
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
            Ask Questions 🧠
          </h1>
          <p className="text-gray-500 mb-8">
            Ask anything about your research papers and get AI-powered cited answers.
          </p>

          {/* Input */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Search in
              </label>
              <select
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
                className="w-full rounded-2xl border-2 border-gray-200 p-3 text-gray-900 outline-none focus:border-indigo-400 transition"
              >
                <option value="">All Papers</option>
                {papers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Your Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What methodology did the authors use? What are the key findings?"
                rows={3}
                className="w-full rounded-2xl border-2 border-gray-200 p-4 text-gray-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition resize-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-xl py-2 px-4 mb-4">
                {error}
              </p>
            )}

            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "🧠 Searching papers..." : "Get Answer 🔍"}
            </button>
          </div>

          {/* Answers */}
          {answers.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Answers ({answers.length})
              </h2>
              <div className="space-y-4">
                {answers.map((answer, i) => (
                  <AnswerCard
                    key={i}
                    question={answer.question}
                    answer={answer.answer}
                    sources={answer.sources}
                  />
                ))}
              </div>
            </div>
          )}

          {papers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📄</div>
              <p className="text-gray-500">
                No papers uploaded yet.{" "}
                <a href="/upload" className="text-indigo-600 font-semibold">
                  Upload a paper first
                </a>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}