import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-destructive">403 Unauthorized</p>

        <h1 className="mt-2 text-3xl font-bold">Access denied</h1>

        <p className="mt-3 text-muted-foreground">
          You do not have permission to access this page.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block font-medium text-primary hover:underline"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
