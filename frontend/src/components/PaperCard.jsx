import { motion } from "framer-motion";
import { FileText, Trash2, Eye } from "lucide-react";

export default function PaperCard({ paper, onDelete, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {paper.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {paper.page_count} pages • {paper.word_count?.toLocaleString()} words
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {onView && (
            <button
              onClick={() => onView(paper)}
              className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(paper.id)}
              className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {paper.summary && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {paper.summary}
        </p>
      )}

      <p className="text-xs text-gray-300 mt-3">
        {new Date(paper.created_at).toLocaleDateString()}
      </p>
    </motion.div>
  );
}