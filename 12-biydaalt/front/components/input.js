import { useState } from "react";

export const Input = ({ label, type = "text", value, setValue }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value !== "");
  const handleShow = () => setShow(!show);

  return (
    <div className="relative w-full">
      <label
        htmlFor={label}
        className={`absolute bg-white left-3 px-1 top-3 text-gray-500 transition-all duration-300 ease-in-out
          ${isFocused || value ? "top-[-9px] left-3 text-sm text-blue-600" : ""}
        `}
      >
        {label}
      </label>
      <input
        id={label}
        type={show ? 'text' : type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full border transition-all border-gray-300 rounded-md px-4 pt-3 pb-3 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
      />
      {type == "password" && (
        <button className="absolute right-3 h-full" onClick={handleShow}>
          {!show ? "Show" : "Hide"}
        </button>
      )}
    </div>
  );
};
