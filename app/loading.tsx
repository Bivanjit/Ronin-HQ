export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="loading-screen__identity">
        <span className="loading-screen__text">
          RONIN
          <span className="loading-screen__kanji" aria-hidden="true">
            影
          </span>
        </span>
      </div>

      <div className="loading-screen__spinner" role="status" aria-label="Loading" />

      <p className="loading-screen__label">Analyzing</p>
    </div>
  );
}
