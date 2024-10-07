import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
