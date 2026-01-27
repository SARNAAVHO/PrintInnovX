export default function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-start">

      {/* Step number */}
      <span className="text-6xl font-extrabold text-indigo-100 mb-6">
        {number}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-gray-600 leading-relaxed max-w-sm">
        {description}
      </p>

    </div>
  );
}
