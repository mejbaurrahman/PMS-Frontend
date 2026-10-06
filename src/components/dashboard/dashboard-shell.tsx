"use client";

import AppSidebar from "@/components/dashboard/app-sidebar";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Unable to load user.
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role={user.role} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div>
            <h1 className="font-semibold">PMS Dashboard</h1>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium">{user.name}</p>

            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
