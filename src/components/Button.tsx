import React from "react";

interface ButtonProps {
  speak: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ speak, children }) => (
  <button type="button" onClick={speak} className="button button-full">
    {children}
  </button>
);

export default Button;
