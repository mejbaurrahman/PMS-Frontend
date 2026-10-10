import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>

        <h1 className="mt-2 text-3xl font-bold">Page not found</h1>

        <p className="mt-3 text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block font-medium text-primary hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
