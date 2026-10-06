import Link from "next/link";
import type { UserRole } from "@/types/user";
import { roleNavigation } from "@/lib/navigation";

interface AppSidebarProps {
  role: UserRole;
}

export default function AppSidebar({ role }: AppSidebarProps) {
  const navigation = roleNavigation[role];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r bg-background md:block">
      <div className="border-b p-6">
        <Link href="/" className="text-2xl font-bold">
          PMS
        </Link>

        <p className="mt-1 text-xs text-muted-foreground">
          Project Management SaaS
        </p>
      </div>

      <nav aria-label="Dashboard navigation" className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
