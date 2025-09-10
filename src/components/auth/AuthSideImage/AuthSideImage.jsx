import React from "react";

export default function AuthSideImage({ src, alt }) {
  return (
    <div className="relative hidden lg:block flex-1">
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
      />
    </div>
  );
}
