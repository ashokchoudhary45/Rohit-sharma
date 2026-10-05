export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  highlight = false,
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        highlight
          ? "border-blue-500/50 bg-gradient-to-br from-blue-600/20 via-black to-black"
          : "border-white/10 bg-white/[0.04] hover:border-blue-500/40"
      }`}
    >
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

      <div className="relative z-10">
        {/* Icon */}
        {icon && (
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
            {icon}
          </div>
        )}

        {/* Title */}
        <p className="text-sm font-medium uppercase tracking-wider text-gray-400">
          {title}
        </p>

        {/* Main Value */}
        <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {value}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}