interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({
  message = "Chargement...",
}: LoadingSpinnerProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20"
      role="status"
      aria-live="polite"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
      <p className="mt-4 text-gray-500 text-sm">{message}</p>
    </div>
  );
}
