import React from "react";

export default function Divider() {
  return (
    <div className="relative mt-6">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
      </div>
    </div>
  );
}
