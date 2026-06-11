import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return setError("Please select a PDF file.");
    setUploading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/papers/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") {
      setFile(dropped);
      setError("");
    } else {
      setError("Only PDF files are supported.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Upload Research Paper
          </h1>
          <p className="text-gray-500 mb-8">
            Upload a PDF and our AI will extract, index, and summarize it automatically.
          </p>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`border-3 border-dashed rounded-3xl p-16 text-center transition-all cursor-pointer mb-6 ${
              dragOver
                ? "border-indigo-500 bg-indigo-50"
                : file
                ? "border-green-400 bg-green-50"
                : "border-gray-300 bg-white hover:border-indigo-300 hover:bg-indigo-50"
            }`}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setError("");
              }}
            />

            {file ? (
              <>
                <div className="text-5xl mb-4">📄</div>
                <p className="text-green-700 font-semibold">{file.name}</p>
                <p className="text-green-500 text-sm mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB — Ready to upload
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">📥</div>
                <p className="text-gray-600 font-semibold">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Only PDF files are supported
                </p>
              </>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 rounded-xl py-3 px-4 mb-4">
              {error}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploading
              ? "🧠 Processing paper — AI is reading and indexing..."
              : "Upload & Process Paper 🚀"}
          </button>

          {uploading && (
            <p className="text-center text-indigo-500 text-sm mt-3 animate-pulse">
              This may take 30-60 seconds — AI is extracting, embedding, and summarizing...
            </p>
          )}

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                ✅ Paper Processed Successfully!
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 rounded-2xl p-4">
                  <p className="text-indigo-500 text-xs font-semibold">Pages</p>
                  <p className="text-2xl font-black text-indigo-900">{result.page_count}</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4">
                  <p className="text-purple-500 text-xs font-semibold">Words</p>
                  <p className="text-2xl font-black text-purple-900">
                    {result.word_count?.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-400 font-semibold mb-2">
                  🤖 AI Summary
                </p>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {result.summary}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  Upload Another
                </button>
                <button
                  onClick={() => navigate("/search")}
                  className="flex-1 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  Ask Questions 🧠
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}