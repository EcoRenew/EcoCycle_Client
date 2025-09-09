import React from "react";

export default function AuthSideImage({ src, alt }) {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <img
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
      />
    </div>
  );
}
