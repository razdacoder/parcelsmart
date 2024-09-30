import logoPrimary from "@/assets/logo-primary.svg";
import ResetPasswordForm from "@/features/auth/forms/reset-password-form";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col py-10 md:px-24">
      <div className="hidden lg:flex justify-center lg:justify-start items-center">
        <img src={logoPrimary} alt="ParcelSmart Logo" className="h-16" />
      </div>
      <div className="flex-1 flex flex-col gap-8 justify-center items-center px-4 w-full">
        <div className="flex lg:hidden justify-center items-center">
          <img
            src={logoPrimary}
            alt="ParcelSmart Logo"
            className="h-12 lg:h-16"
          />
        </div>
        <div className="w-full lg:w-[512px] bg-white p-10 rounded-md space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-center text-text">
              Reset your password
            </h3>
            <p className="text-muted-foreground text-sm text-center">
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>
          </div>
          <ResetPasswordForm />
          <div className="flex justify-center">
            <Link to="/auth/login" className="text-sm font-medium text-primary">
              Back to Sign In
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <p className="text-text text-sm text-center font-medium">
            Don&apos;t have an account?&nbsp;
            <Link to="/auth/register" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
