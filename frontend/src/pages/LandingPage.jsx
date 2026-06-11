import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: "📄",
    title: "Upload Research Papers",
    desc: "Upload NLP research papers in PDF format and our AI extracts and indexes every word instantly.",
  },
  {
    icon: "🧠",
    title: "Ask Questions & Get Cited Answers",
    desc: "Ask any question about your papers and get precise AI answers with exact citations from the source.",
  },
  {
    icon: "⚖️",
    title: "Compare Multiple Papers",
    desc: "Compare methodologies, results, and findings across multiple papers with a detailed AI comparison report.",
  },
  {
    icon: "📈",
    title: "Track Research Trends",
    desc: "Discover emerging topics, dominant themes, and research gaps across your entire paper library.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "Your papers are private to your account. JWT authentication keeps your research safe.",
  },
  {
    icon: "💼",
    title: "SaaS Plans for Every Need",
    desc: "From individual researchers to full research teams — we have a plan that fits your workflow.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
            🔬 RAG-Powered NLP Research Assistant
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-gray-900 leading-tight mb-6">
            Research Smarter with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered RAG
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Upload NLP research papers, ask questions, compare findings, and
            discover trends — all powered by LangChain, ChromaDB, and Google
            Gemini AI.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Free 🚀
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 rounded-2xl bg-white text-indigo-600 text-lg font-semibold border-2 border-indigo-200 hover:border-indigo-400 hover:scale-105 transition-all duration-200"
            >
              View Pricing 💼
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20"
        >
          {[
            { number: "RAG", label: "Powered Pipeline" },
            { number: "3", label: "SaaS Plans" },
            { number: "AI", label: "Cited Answers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-black text-indigo-600">{stat.number}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-black text-center text-gray-900 mb-4">
          Everything You Need
        </h2>
        <p className="text-center text-gray-500 mb-16">
          Built with LangChain, ChromaDB, FastAPI, and React
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-16">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to Research Smarter?
          </h2>
          <p className="text-indigo-200 mb-8 text-lg">
            Start for free — no credit card required.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 rounded-2xl bg-white text-indigo-600 text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start for Free 🚀
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-400 text-sm">
        Built with ❤️ by Pubudini Rathnayake — ICT Undergraduate, SLIIT
      </div>
    </div>
  );
}