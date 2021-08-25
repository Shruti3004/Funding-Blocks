import React from "react";

const Button = ({ title, type }) => {
  return (
    <button
      className={
        type === "outline"
          ? "bg-primaryColor text-white font-medium font-18 custom-button-outline"
          : "bg-tertiaryColor text-white font-medium font-18 custom-button"
      }
    >
      {title}
    </button>
  );
};

export default Button;
