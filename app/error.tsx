'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-page">
      <div className="error-page__identity">
        RONIN
        <span className="error-page__kanji" aria-hidden="true">
          影
        </span>
      </div>

      <p className="error-page__code">System Error</p>

      <h1 className="error-page__title">
        Something interrupted the analysis
      </h1>

      <p className="error-page__message">
        An unexpected error was encountered while processing this request. The
        system may be experiencing temporary instability.
        {error.digest && (
          <>
            <br />
            <small style={{ opacity: 0.5 }}>Reference: {error.digest}</small>
          </>
        )}
      </p>

      <button
        className="error-page__retry"
        onClick={() => reset()}
        type="button"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M11.5 7a4.5 4.5 0 1 1-1.3-3.2"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d="M10.5 1v3h-3"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Retry
      </button>
    </div>
  );
}
