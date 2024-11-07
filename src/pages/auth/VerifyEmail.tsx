import logoPrimary from "@/assets/logo-primary.svg";
import verifyImage from "@/assets/verify-email.svg";
import { Button } from "@/components/ui/button";
import useResendEmailVerification from "@/features/auth/api/useResendEmailverification";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const { state } = useLocation();
  const { mutate } = useResendEmailVerification();

  const navigate = useNavigate();
  const locationState = state as { email?: string };

  if (!locationState) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col py-10 md:px-24">
      <div className="hidden lg:flex justify-center lg:justify-start items-center">
        <img src={logoPrimary} alt="ParcelSmart Logo" className="h-16" />
      </div>
      <div className="flex-1 flex flex-col gap-8 justify-center items-center w-full p-4">
        <div className="flex lg:hidden justify-center items-center">
          <img
            src={logoPrimary}
            alt="ParcelSmart Logo"
            className="h-12 lg:h-16"
          />
        </div>
        <div className="w-full lg:w-[512px] bg-white p-10 rounded-md space-y-6">
          <div className="flex justify-center">
            <img src={verifyImage} alt="Verify Email SVG" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-center text-text">
              Verify your Email
            </h3>
            <p className="text-muted-foreground text-sm text-center">
              Thank you signing up with us, check your email for instructions to
              verify your email
            </p>
          </div>
          <Button
            onClick={() => {
              navigate("/auth/verify-email/verification", {
                state: {
                  email: state.email,
                },
              });
            }}
            size="lg"
            className="w-full"
          >
            Proceed
          </Button>
          <div className="flex justify-center mt-6">
            <p className="text-text text-sm text-center font-medium">
              Don&apos;t receive an email?&nbsp;
              <Button
                onClick={() => mutate({ email: state.email })}
                variant="link"
                className="text-primary hover:no-underline p-0"
              >
                Resend
              </Button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
