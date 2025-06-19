import React, { useRef, useEffect } from "react";

interface PhoneInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  name = "tel",
  id,
  className,
  placeholder = "+7 (___) ___-__-__",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const x = input.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

    if (x) {
      const group1 = x[1] ? (x[1] === "9" ? "+7 (9" : "+7") : x[1];
      const group2 = x[2]
        ? " (" + (x[2][0] === "8" && x[2][1] === "9" ? "9" : x[2])
        : x[2];
      const group3 = x[3] ? ") " + x[3] : x[3];
      const group4 = x[4] ? "-" + x[4] : x[4];
      const group5 = x[5] ? "-" + x[5] : x[5];
      const formattedValue = group1 + group2 + group3 + group4 + group5;
      input.value = formattedValue;
      onChange({ ...e, target: { ...e.target, value: formattedValue } });
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      ref={inputRef}
      type="tel"
      name={name}
      id={id}
      value={value}
      onChange={handleInput}
      className={className}
      placeholder={placeholder}
      autoComplete="tel"
    />
  );
};

export default PhoneInput;
