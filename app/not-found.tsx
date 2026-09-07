import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <p className="not-found-page__code" aria-hidden="true">
        404
      </p>

      <div className="not-found-page__identity">
        RONIN
        <span className="not-found-page__kanji" aria-hidden="true">
          影
        </span>
      </div>

      <h1 className="not-found-page__title">Position not found</h1>

      <p className="not-found-page__message">
        The requested position does not exist in the intelligence matrix. It may
        have been relocated or the address may be incorrect.
      </p>

      <Link href="/" className="not-found-page__home">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M11 7.5H3M3 7.5L6.5 4M3 7.5L6.5 11"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Return to headquarters
      </Link>
    </div>
  );
}
