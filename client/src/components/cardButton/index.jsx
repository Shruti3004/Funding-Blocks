import React from "react";

const CardButton = ({
  title,
  type,
  className,
  children,
  setModal,
  block,
  vote,
  typeB,
  setVotemodal,
}) => {
  if (type === "share") {
    return (
      <>
        <button
          className={
            type === "outline"
              ? `text-secondaryColor font-medium dropdown-toggle font-18 custom-cardbutton-outline ${
                  className && className
                }`
              : `font-medium dropdown-toggle font-18 custom-cardbutton ${className && className}`
          }
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {children}
        </button>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </>
    );
  }

  if (typeB === "success") {
    return (
      <button
        onClick={() => vote(block?.key)}
        className={
          type === "outline"
            ? `text-secondaryColor font-medium font-18 custom-cardbutton-outline ${
                className && className
              }`
            : `bg-secondaryColor font-medium font-18 custom-cardbutton ${className && className}`
        }
      >
        {children}
      </button>
    );
  }

  if (typeB === "redirect") {
    return (
      <button
        onClick={() => vote()}
        className={
          type === "outline"
            ? `text-secondaryColor font-medium font-18 custom-cardbutton-outline ${
                className && className
              }`
            : `bg-secondaryColor font-medium font-18 custom-cardbutton ${className && className}`
        }
      >
        {children}
      </button>
    );
  }

  if (typeB === "report") {
    return (
      <button
        onClick={() => vote(block?.key)}
        className={
          type === "outline"
            ? `text-danger font-medium font-18 custom-cardbuttonRed-outline ${
                className && className
              }`
            : `font-medium font-18 custom-cardbuttonRed ${className && className}`
        }
      >
        {children}
      </button>
    );
  }

  if (typeB === "delete") {
    return (
      <button
        onClick={() => vote(block?.key)}
        className={
          type === "outline"
            ? `text-danger font-medium font-18 custom-cardbuttonRed-outline ${
                className && className
              }`
            : `font-medium font-18 custom-cardbuttonRed ${className && className}`
        }
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={() => setVotemodal(true)}
      className={
        type === "outline"
          ? `text-secondaryColor font-medium font-18 custom-cardbutton-outline ${
              className && className
            }`
          : `bg-secondaryColor font-medium font-18 custom-cardbutton ${className && className}`
      }
    >
      {children}
    </button>
  );
};

export default CardButton;
