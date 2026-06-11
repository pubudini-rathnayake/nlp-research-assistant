export default function PlanBadge({ plan }) {
  const styles = {
    free: "bg-gray-100 text-gray-700",
    pro: "bg-indigo-100 text-indigo-700",
    team: "bg-purple-100 text-purple-700",
  };

  const icons = {
    free: "🆓",
    pro: "⭐",
    team: "👥",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${styles[plan] || styles.free}`}>
      {icons[plan]} {plan}
    </span>
  );
}