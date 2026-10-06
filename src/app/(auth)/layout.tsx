import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side: Branding */}
      <div className="hidden flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
        <Link href="/" className="text-2xl font-bold">
          PMS
        </Link>

        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Manage projects.
            <br />
            Empower teams.
          </h1>

          <p className="mt-4 text-slate-400">
            Plan projects, organize tasks, track progress, and collaborate with
            your team.
          </p>
        </div>

        <p className="text-sm text-slate-400">PMS | Project Management SaaS</p>
      </div>

      {/* Right side: Authentication Content */}
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
