import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>

        <p className="mt-2 text-muted-foreground">
          Join PMS to manage projects and collaborate with your team.
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
