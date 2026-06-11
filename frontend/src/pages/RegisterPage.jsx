import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    icon: "🆓",
    features: ["3 papers", "10 questions/day", "1 comparison"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99/mo",
    icon: "⭐",
    features: ["Unlimited papers", "Unlimited questions", "Trend analysis"],
  },
  {
    id: "team",
    name: "Team",
    price: "$29.99/mo",
    icon: "👥",
    features: ["Everything in Pro", "Team workspace", "Shared library"],
  },
];

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) return setError("Please fill in all fields.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/auth/register", {
        email,
        password,
        plan: selectedPlan,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        email: res.data.email,
        plan: res.data.plan
      }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl">🔬</Link>
          <h1 className="text-4xl font-black text-gray-900 mt-4 mb-2">Create Account</h1>
          <p className="text-gray-500">Choose your plan and start researching</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 space-y-6">
          {/* Plan Selection */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">Choose Your Plan</label>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedPlan === plan.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-200"
                  }`}
                >
                  <div className="text-2xl mb-2">{plan.icon}</div>
                  <div className="font-bold text-gray-900 text-sm">{plan.name}</div>
                  <div className="text-indigo-600 text-xs font-semibold">{plan.price}</div>
                  <ul className="mt-2 space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-gray-500">✓ {f}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-2xl border-2 border-gray-200 p-4 text-gray-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              className="w-full rounded-2xl border-2 border-gray-200 p-4 text-gray-900 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 rounded-xl py-2 px-4">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Creating account..." : `Get Started with ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan 🚀`}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
              Sign in here
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400">
            💡 Payments are simulated for portfolio demonstration
          </p>
        </div>
      </motion.div>
    </div>
  );
}