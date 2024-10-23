import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CarrierForm from "../forms/carrier-form";
import InsuranceForm from "../forms/insurance-form";
import ItemsForm from "../forms/items-form";
import ReceiverForm from "../forms/receiver-form";
import Review from "../forms/review-form";
import SenderForm from "../forms/sender-form";
import { useReviewMode } from "../hooks/use-review-mode";
import { useShipmentApplication } from "../hooks/use-shipment-application-store";

type StepperProps = {
  data?: Shipment;
  prevloading: boolean;
};

export default function Stepper({ data, prevloading }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { setReviewMode, reviewMode } = useReviewMode();
  const { setShipmentID } = useShipmentApplication();

  useEffect(() => {
    if (data) {
      setShipmentID(data.id);
    }
  }, [data, setShipmentID]);

  const steps = [
    "Sender",
    "Receiver",
    "Items",
    "Carrier",
    "Insurance",
    "Review",
  ];

  const nextStep = async () => {
    if (currentStep == 4) {
      setReviewMode(true);
    }
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const moveToStep = (step: number) => {
    setCurrentStep(step);
  };
  return (
    <div
      className={cn(
        "w-full space-y-12 p-4 md:p-8 bg-white max-w-6xl mx-auto",
        reviewMode && "col-span-1 lg:col-span-3 p-4 overflow-y-auto",
        currentStep === 3 && "max-w-screen-2xl mx-auto"
      )}
    >
      {/* Stepper Navigation */}
      <div className="flex justify-between items-center md:grid grid-cols-5  md:gap-4">
        {steps
          .filter((_, index) => index !== 5)
          .map((step, index) => {
            const isActive = index === currentStep;
            const isDone = currentStep > index;
            return (
              <div
                key={`stepper-${index}`}
                className="flex w-full items-center md:gap-4"
              >
                <span
                  className={cn(
                    "text-sm md:text-base font-medium text-muted-foreground",
                    (isActive || isDone) && "text-primary"
                  )}
                >
                  {step}
                </span>
                <div
                  className={cn(
                    "hidden md:block flex-1 w-full h-2 bg-[#EFF0F6] rounded-lg before:transition before:duration-300 relative before:absolute before:block  before:top-0 before:left-0 before:h-full before:bg-primary before:w-0 before:rounded-lg",
                    isActive && "before:w-1/2",
                    isDone && "before:w-full"
                  )}
                />
              </div>
            );
          })}
      </div>

      {/* Stepper Content */}
      <div className="">
        {currentStep === 0 && (
          <SenderForm
            next={() => nextStep()}
            data={data?.origin_address}
            prevLoading={prevloading}
          />
        )}
        {currentStep === 1 && (
          <ReceiverForm
            next={() => nextStep()}
            prev={() => prevStep()}
            data={data?.destination_address}
            prevLoading={prevloading}
          />
        )}
        {currentStep === 2 && (
          <ItemsForm
            next={() => nextStep()}
            prev={() => prevStep()}
            parcelsToEdit={data?.parcels}
          />
        )}
        {currentStep === 3 && (
          <CarrierForm next={() => nextStep()} prev={() => prevStep()} />
        )}
        {currentStep === 4 && (
          <InsuranceForm next={() => nextStep()} prev={() => prevStep()} />
        )}
        {currentStep === 5 && (
          <Review
            moveToStep={(step) => moveToStep(step)}
            prev={() => prevStep()}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      {/* <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
        {currentStep > 0 && (
          <Button
            size="lg"
            className="bg-[#E2FAEC] text-primary shadow-none w-full md:w-fit hover:bg-[#E2FAEC]/80 hover:text-primary/80 px-12"
            onClick={() => {
              if (currentStep === 5) {
                setReviewMode(false);
                prevStep();
              } else {
                prevStep();
              }
            }}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
        )}

        {currentStep < 2 && (
          <Button
            size="lg"
            variant="destructive"
            className="bg-[#E74C3C33] text-destructive w-full md:w-fit shadow-none hover:bg-[#E74C3C33] hover:text-destructive/80 px-8"
            onClick={prevStep}
          >
            Clear All
          </Button>
        )}

        <Button size="lg" onClick={nextStep} className="px-12 w-full md:w-fit">
          {reviewMode ? "Make Payment" : "Continue"}
        </Button>
      </div> */}
    </div>
  );
}
