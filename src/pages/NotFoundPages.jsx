import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[100dvh] bg-white dark:bg-bg flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        {/* Illustration */}
        <svg
          viewBox="0 0 200 120"
          aria-hidden="true"
          className="mx-auto w-72 h-36"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#9AE6B4" />
              <stop offset="1" stopColor="#34D399" />
            </linearGradient>
          </defs>
          <g fill="url(#g)" opacity="0.25">
            <circle cx="40" cy="60" r="24" />
            <circle cx="160" cy="60" r="24" />
            <rect x="78" y="30" width="44" height="60" rx="8" />
          </g>
          <text
            x="100"
            y="68"
            textAnchor="middle"
            className="fill-current"
            fontSize="34"
            fontWeight="700"
          >
            404
          </text>
        </svg>

        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-ecoGreen px-5 py-3 font-medium text-white shadow hover:opacity-90 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 dark:border-gray-600 px-5 py-3 font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Back to safety
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          <p>Here are some helpful links:</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
