import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
  Building2,
  CreditCard,
  Settings,
  type LucideIcon,
} from "lucide-react";

import type { UserRole } from "@/types/user";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const roleNavigation: Record<UserRole, NavItem[]> = {
  ADMIN: [
    { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { title: "Users", href: "/admin/users", icon: Users },
    { title: "Organizations", href: "/admin/organizations", icon: Building2 },
    { title: "Payments", href: "/admin/payments", icon: CreditCard },
    { title: "Settings", href: "/admin/settings", icon: Settings },
  ],

  MANAGER: [
    { title: "Dashboard", href: "/manager", icon: LayoutDashboard },
    { title: "Projects", href: "/manager/projects", icon: FolderKanban },
    { title: "Teams", href: "/manager/teams", icon: Users },
    { title: "Tasks", href: "/manager/tasks", icon: ListTodo },
    { title: "Settings", href: "/manager/settings", icon: Settings },
  ],

  MEMBER: [
    { title: "Dashboard", href: "/member", icon: LayoutDashboard },
    { title: "My Tasks", href: "/member/tasks", icon: ListTodo },
    { title: "Profile", href: "/member/profile", icon: Settings },
  ],
};
