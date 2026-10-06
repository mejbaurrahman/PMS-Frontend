import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ListTodo,
  Settings,
} from "lucide-react";

const navigation = [
  { title: "Dashboard", href: "/manager", icon: LayoutDashboard },
  { title: "Projects", href: "/manager/projects", icon: FolderKanban },
  { title: "Teams", href: "/manager/teams", icon: Users },
  { title: "Tasks", href: "/manager/tasks", icon: ListTodo },
  { title: "Settings", href: "/manager/settings", icon: Settings },
];

export default function AppSidebar() {
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
