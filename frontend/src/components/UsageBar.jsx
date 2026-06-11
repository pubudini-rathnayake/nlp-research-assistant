export default function UsageBar({ label, used, max }) {
  const isUnlimited = max === "Unlimited";
  const percentage = isUnlimited ? 0 : Math.min((used / max) * 100, 100);
  const isWarning = percentage >= 80;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">
          {used} / {isUnlimited ? "∞" : max}
        </span>
      </div>
      {!isUnlimited && (
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              isWarning ? "bg-red-400" : "bg-indigo-400"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
      {isUnlimited && (
        <div className="w-full bg-indigo-100 rounded-full h-2">
          <div className="h-2 rounded-full bg-indigo-400 w-full opacity-30" />
        </div>
      )}
    </div>
  );
}