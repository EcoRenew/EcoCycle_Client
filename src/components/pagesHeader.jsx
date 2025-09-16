import React from "react";
import Header from "../assets/nature2.jpg";

const PagesHeader = () => {
  return (
    <div className="relative w-full h-64">
      <img
        src={Header}
        alt="Header background"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40"></div>
    </div>
  );
};

export default PagesHeader;
