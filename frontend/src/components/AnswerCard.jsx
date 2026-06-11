import { motion } from "framer-motion";

export default function AnswerCard({ question, answer, sources }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="mb-4">
        <p className="text-xs text-indigo-500 font-semibold mb-1">❓ Question</p>
        <p className="text-gray-800 font-medium">{question}</p>
      </div>

      <div className="mb-4">
        <p className="text-xs text-green-500 font-semibold mb-1">🧠 Answer</p>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      </div>

      {sources && sources.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 font-semibold mb-2">📄 Sources</p>
          <div className="flex flex-wrap gap-2">
            {sources.map((source, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}