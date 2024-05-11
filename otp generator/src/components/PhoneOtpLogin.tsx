import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [showOTpInput, setShowOTpInput] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("invalid phone number");
      return;
    }

    // Call The Backend Api
    // Show OTP Field
    setShowOTpInput(true);
  };

  const handlePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };


  return (
    <>
      <div>
        {!showOTpInput ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder="Enter Phone Number"
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <>
            <div>
              <h3>
                Enter The OTP sent to the phone number{" "}
                <span>{phoneNumber}</span>
              </h3>
              <OtpInput />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PhoneOtpLogin;
