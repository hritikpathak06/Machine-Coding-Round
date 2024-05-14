import { useState } from "react";

interface functionStep {
  handleNext: () => void;
}

const Checkout = ({ stepConfig = [] }: any) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleNext: functionStep["handleNext"] = () => {
    setCurrentStep((prevStep: any) => {
      if (prevStep === stepConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  console.log(currentStep, "Current");
  console.log(stepConfig.length, "Actual");

  const ActiveComponent: any = stepConfig[currentStep - 1]?.Component;

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepConfig.length - 1)) * 100;
  };

  return (
    <>
      <div className="stepper">
        {stepConfig.map((step: any, index: number) => {
          return (
            <div
              key={index}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              }${currentStep === index + 1 ? "active" : ""}`}
            >
              <div className="step_number">
                {currentStep > index + 1 || isComplete ? (
                  <span>✔️</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step_name">{step.name}</div>
            </div>
          );
        })}
        <div className=" progress_bar">
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <div>
        <ActiveComponent />
      </div>

      {!isComplete && (
        <button className=" btn" onClick={handleNext}>
          {currentStep === stepConfig.lenght ? "Submit" : "Next"}
        </button>
      )}
    </>
  );
};

export default Checkout;
