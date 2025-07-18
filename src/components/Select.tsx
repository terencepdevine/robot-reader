import React from "react";
import ReactSelect, { type SingleValue } from "react-select";

interface OptionType {
  value: number;
  label: string;
}

interface SelectProps {
  label: string;
  options: OptionType[];
  selectedOptionIndex: number;
  setSelectedOptionIndex: (index: number) => void;
  id?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  selectedOptionIndex,
  setSelectedOptionIndex,
  id = "",
  className = "",
}) => {
  const selectedOption = options.find(
    (opt) => opt.value === selectedOptionIndex
  );

  const handleChange = (option: SingleValue<OptionType>) => {
    if (option) setSelectedOptionIndex(option.value);
  };

  return (
    <div className={`input-field ${className}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <ReactSelect
        inputId={id}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        className="select"
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: 8,
            border: "none",
            background: "#e5e5e5",
          }),
          singleValue: (base) => ({
            ...base,
            margin: "0rem",
          }),
          input: (base) => ({
            ...base,
            padding: "0rem",
            margin: "0rem",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "1rem",
          }),
          option: (base) => ({
            ...base,
            color: "#222",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#171717",
          }),
        }}
      />
    </div>
  );
};

export default Select;
