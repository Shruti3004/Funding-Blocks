import React from "react";

const Button = ({ title, type, className }) => {
  return (
    <button
      className={
        type === "outline"
          ? `text-tertiaryColor font-medium font-18 custom-button-outline ${
              className && className
            }`
          : `bg-tertiaryColor font-medium font-18 custom-button ${
              className && className
            }`
      }
    >
      {title}
    </button>
  );
};

export default Button;
