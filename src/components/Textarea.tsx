import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id = "prompt", ...props }, ref) => {
    return (
      <div className="input-field">
        {label && (
          <label htmlFor={id} className="label">
            {label}
          </label>
        )}
        <textarea ref={ref} className="textarea" id={id} rows={4} {...props} />
      </div>
    );
  }
);

export default Textarea;
