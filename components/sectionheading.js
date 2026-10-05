export default function SectionHeading({
  title,
  subtitle,
  centered = false,
}) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : "text-left"}`}>
      <div
        className={`mb-3 flex items-center gap-3 ${
          centered ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-[2px] w-10 bg-blue-500" />

        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
          Rohit Sharma
        </span>

        <span className="h-[2px] w-10 bg-blue-500" />
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}