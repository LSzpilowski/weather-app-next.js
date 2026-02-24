interface ErrorMessageProps {
  error: string;
  onClear: () => void;
}

export default function ErrorMessage({ error, onClear }: ErrorMessageProps) {
  return (
    <div className="mt-4 md:mt-6 bg-red-500 border border-red-400/30 rounded-xl lg:rounded-2xl p-4 md:p-5 text-red-200 backdrop-blur-sm flex items-center justify-between shadow-lg">
      <div className="flex items-center">
        <svg className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm md:text-base">{error}</span>
      </div>
      <button
        onClick={onClear}
        className="ml-4 text-red-200 hover:text-white transition-colors cursor-pointer flex-shrink-0"
        aria-label="Close error message"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
