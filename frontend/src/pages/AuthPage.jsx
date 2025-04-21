import LoginForm from "@/components/sections/auth/LoginForm";
import SignupForm from "@/components/sections/auth/SignupForm";
import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";
import { useAuth } from "@/provider/authProvider";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(false);

  const { loading, user } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center h-screen">
      <div className="h-full w-1/2 bg-[url(/assets/images/authPage/largeBanner.png)] bg-cover bg-center max-lg:hidden" />
      <div className="h-full w-1/2 flex justify-center items-center px-16 py-10 max-lg:w-full max-md:px-8 max-sm:px-4">
        {isLoginView ? (
          <LoginForm toggleView={setIsLoginView} />
        ) : (
          <SignupForm toggleView={setIsLoginView} />
        )}
      </div>
    </div>
  );
}
