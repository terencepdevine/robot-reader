import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  label?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, id = "prompt", ...props }, ref) => {
    return (
      <label htmlFor={id} className="label">
        {children}
      </label>
    );
  }
);

export default Label;
