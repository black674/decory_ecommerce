import { useRouteError, useNavigate } from "react-router-dom";
import Button from "@/components/ui/button/Button";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const isNotFound = error?.status === 404 || !error?.status;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="text-secondary-blue text-7xl font-bold mb-4">
          {isNotFound ? "404" : "Error"}
        </h1>
        <h2 className="text-natural-900 text-2xl font-semibold mb-4">
          {isNotFound ? "Page Not Found" : "Something Went Wrong"}
        </h2>
        <p className="text-natural-600 mb-8">
          {isNotFound
            ? "Sorry, the page you're looking for doesn't exist or has been moved."
            : "An unexpected error has occurred. Please try again later."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            color="primary"
          >
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} variant="solid" color="primary">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
