import logoPrimary from "@/assets/logo-primary.svg";
import LoginForm from "@/features/auth/forms/login-form";

import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="w-[410px] flex flex-col gap-8 p-8 md:p-0">
      <div className="flex lg:hidden justify-center mb-6">
        <img src={logoPrimary} alt="Parcel Smart Logo" className="h-12" />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-text">
          Sign In to your Account
        </h3>
        <p className="text-muted-foreground text-sm">
          Welcome back! please enter your detail
        </p>
      </div>
      <LoginForm />
      <div className="flex justify-center mt-6">
        <p className="text-text text-sm text-center font-medium">
          Don&apos;t have an account?&nbsp;
          <Link to="/auth/register" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
