import logoPrimary from "@/assets/logo-primary.svg";
import RegisterForm from "@/features/auth/forms/register-form";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="md:max-w-md flex flex-col gap-8 p-8 md:p-0">
      <div className="flex lg:hidden justify-center mb-6">
        <img src={logoPrimary} alt="Parcel Smart Logo" className="h-12" />
      </div>
      <h3 className="text-2xl font-bold text-text">Sign Up for an Account</h3>
      <RegisterForm />
      <div className="flex justify-center mt-6">
        <p className="text-text text-sm text-center font-medium">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
