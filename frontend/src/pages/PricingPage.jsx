import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    icon: "🆓",
    description: "Perfect for getting started with NLP research",
    color: "border-gray-200",
    buttonColor: "bg-gray-800 hover:bg-gray-900",
    features: [
      "3 papers uploaded",
      "10 questions per day",
      "1 paper comparison",
      "AI summaries",
      "Basic Q&A",
    ],
    notIncluded: ["Trend analysis", "Team workspace", "Priority AI"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "per month",
    icon: "⭐",
    description: "Unlimited access for individual researchers",
    color: "border-indigo-500",
    buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    badge: "Most Popular",
    features: [
      "Unlimited papers",
      "Unlimited questions",
      "Unlimited comparisons",
      "Trend analysis",
      "Priority AI responses",
      "Advanced summaries",
    ],
    notIncluded: ["Team workspace", "Shared library"],
  },
  {
    id: "team",
    name: "Team",
    price: "$29.99",
    period: "per month",
    icon: "👥",
    description: "Collaborative workspace for research teams",
    color: "border-purple-500",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared paper library",
      "Team workspace",
      "Collaborative Q&A",
      "Admin dashboard",
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-gray-900 mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <p className="text-xl text-gray-500">
            Choose the plan that fits your research needs
          </p>
          <p className="text-sm text-indigo-500 mt-2">
            💡 Payments simulated for portfolio demonstration
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-3xl p-8 shadow-sm border-2 ${plan.color} relative hover:shadow-lg transition`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className="text-2xl font-black text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
              </div>

              <Link
                to={`/register?plan=${plan.id}`}
                className={`block w-full py-3 rounded-2xl text-white text-center font-semibold ${plan.buttonColor} transition mb-6`}
              >
                Get Started
              </Link>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
                {plan.notIncluded.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <span>✗</span> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}