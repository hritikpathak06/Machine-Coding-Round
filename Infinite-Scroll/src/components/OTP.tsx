import React, { useEffect, useRef, useState } from "react";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [inputs, setInputs] = useState("");

  const inputRef = [
    useRef<HTMLInputElement | null>(),
    useRef<HTMLInputElement | null>(),
    useRef<HTMLInputElement | null>(),
    useRef<HTMLInputElement | null>(),
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value;
    let updatedValue = [...otp];
    updatedValue[idx] = value;
    setOtp(updatedValue);

    if (value && idx < inputRef.length - 1) {
      inputRef[idx + 1].current?.focus();
    }
    if (!value && idx > 0) {
      inputRef[idx - 1].current?.focus();
    }
  };

  useEffect(() => {
    inputRef[0].current?.focus();
    console.log("Updated OTP:", inputs);
    console.log("Typeof input", typeof inputs);
  }, [inputs]);

  const handleSubmit = () => {
    const otpNumber = otp.join("");
    setInputs(parseInt(otpNumber) as any);
    if (otpNumber.length === 4) {
      alert(`OTP entered: ${otpNumber}`);
    } else {
      alert("Please complete the OTP.");
    }
  };

  return (
    <div className="otp">
      <h1>OTP verification</h1>

      <div className=" otp_box">
        {otp.map((val: any, idx: any) => {
          return (
            <input
              key={idx}
              type="text"
              className=" input_box"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e, idx)}
              ref={inputRef[idx] as any}
            />
          );
        })}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default OTP;
