import "./loading.css";

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div
        className="loading-spinner w-12 h-12"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
