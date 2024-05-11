import React, { useEffect, useRef, useState } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    if (!value) {
      setActiveOtpIndex(index - 1);
    } else {
      setActiveOtpIndex(index + 1);
    }
    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (key === "Backspace") {
      setActiveOtpIndex(index);
    }
    console.log("Key: ", key);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <>
      <div>
        {otp.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <input
                ref={index === activeOtpIndex ? inputRef : null}
                type="number"
                className="otp_input"
                onChange={(e) => handleOnChange(e, index)}
                value={otp[index]}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default OtpInput;
