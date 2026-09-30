/* eslint-disable react/prop-types */
import { useState } from "react";

const CheckoutStepper = ({ stepsConfig = [], onComplete }) => {
  // Single source of truth: currentStep (1 to stepsConfig.length + 1)
  const [currentStep, setCurrentStep] = useState(1);

  if (!stepsConfig.length) return null;

  // Derived state: no separate useState needed!
  const isComplete = currentStep > stepsConfig.length;

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === stepsConfig.length) {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNumber) => {
    // Allow users to jump back to any previously completed step
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <div className="stepper-container">
      {/* 1. Header: Steps & Connectors */}
      <div className="stepper-header">
        {stepsConfig.map((step, index) => {
          const stepNumber = index + 1;
          const isFinished = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={step.name} className="step-wrapper">
              {/* Step Circle & Label */}
              <div
                className="step-item"
                onClick={() => handleStepClick(stepNumber)}
                style={{ cursor: isFinished ? "pointer" : "default" }}
              >
                <div
                  className={`step-circle ${isFinished ? "complete" : ""} ${
                    isActive ? "active" : ""
                  }`}
                >
                  {isFinished ? "✓" : stepNumber}
                </div>
                <div className="step-name">{step.name}</div>
              </div>

              {/* Connecting line between steps (all except the last step) */}
              {index < stepsConfig.length - 1 && (
                <div
                  className={`step-line ${isFinished ? "complete" : ""}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 2. Step Content Card */}
      <div className="step-content">
        {isComplete ? (
          <div className="completion-screen">
            <h3>All steps completed successfully! 🎉</h3>
            <button className="btn btn-secondary" onClick={handleReset}>
              Start Over
            </button>
          </div>
        ) : (
          <>
            {ActiveComponent && (
              <div className="active-component">
                <ActiveComponent />
              </div>
            )}

            {/* 3. Controls */}
            <div className="button-group">
              <button
                className="btn btn-secondary"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentStep === stepsConfig.length ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutStepper;
