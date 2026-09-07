import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap not-found">
      <p>404 · A little off the floor plan</p>
      <h1>Let’s find your way home.</h1>
      <p>The page you’re looking for isn’t here.</p>
      <Link className="button" href="/">
        Back to Home ↗
      </Link>
    </section>
  );
}
