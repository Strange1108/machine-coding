// OTPInput.js
import React, { useRef, useState } from "react";
// import "../styles.css"; // Uncomment or adjust if you have a css file

function OTPInput({ onChangeOTP = () => {} }) {
  const length = 4;
  const [otp, setOTP] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  // Helper function to focus an input at a given index
  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  // Handles character input & auto-focus next input
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow digits (numbers)

    const newOTP = [...otp];
    // Take the last entered character if replacing
    newOTP[index] = value.slice(-1);
    setOTP(newOTP);

    // Auto-focus the next input box if a digit was entered
    if (value && index < length - 1) {
      focusInput(index + 1);
    }

    // Trigger callback when all boxes are filled
    const joinedOTP = newOTP.join("");
    if (joinedOTP.length === length && !newOTP.includes("")) {
      onChangeOTP(joinedOTP);
    }
  };

  // Handles backspace key navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // If current box is already empty, move focus to the previous box
      if (otp[index] === "" && index > 0) {
        focusInput(index - 1);
      }
    }
  };

  // Handles pasting an entire OTP string (e.g. "1234")
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "") // Strip non-digit characters
      .slice(0, length);  // Keep only up to 'length' characters

    if (pasted.length === 0) return;

    const newOTP = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOTP[i] = pasted[i];
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = pasted[i];
      }
    }
    setOTP(newOTP);

    // Trigger callback if OTP is complete
    const joinedOTP = newOTP.join("");
    if (joinedOTP.length === length && !newOTP.includes("")) {
      onChangeOTP(joinedOTP);
    }

    // Focus either the next empty box or the last filled box
    const nextFocusIndex = Math.min(pasted.length, length - 1);
    focusInput(nextFocusIndex);
  };

  return (
    <div onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          inputMode="numeric"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "20px",
            textAlign: "center",
            marginRight: "10px",
          }}
        />
      ))}
    </div>
  );
}

export default OTPInput;
