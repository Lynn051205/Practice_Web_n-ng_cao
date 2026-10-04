export function Loading() {
  return (
    <div className="loading-state" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Loading...</p>
    </div>
  );
}
