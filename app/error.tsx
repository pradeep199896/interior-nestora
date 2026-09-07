"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="route-error">
      <h1>Something didn’t load.</h1>
      <p>Please try again in a moment.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
