import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 mb-6">
      <svg
        className="h-8 w-8 text-primary-600"
        fill="none"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
          fill="#38af44"
        ></path>
      </svg>
      <h1 className="text-xl font-bold tracking-tight text-gray-800">
        EcoCycle
      </h1>
    </div>
  );
}
