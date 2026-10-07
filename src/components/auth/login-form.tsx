"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginUser } from "@/lib/auth-api";
import { ROLE_DASHBOARD_PATHS } from "@/lib/constants";
import type { UserRole } from "@/types/user";
import { DEMO_CREDENTIALS } from "@/lib/constants";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleDemoLogin = (role: UserRole) => {
    const credentials = DEMO_CREDENTIALS[role];

    loginMutation.mutate(credentials);
  };
  const onSubmit = (values: LoginFormValues) => {
    console.log("hello");
    loginMutation.mutate(values);
  };
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (response) => {
      toast.success(response.message);

      const role = response.data.user.role;

      router.push(ROLE_DASHBOARD_PATHS[role]);
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
      <div className="space-y-3 pt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Demo Login
            </span>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <Button
            type="button"
            variant="outline"
            disabled={loginMutation.isPending}
            onClick={() => handleDemoLogin("ADMIN")}
          >
            Admin
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={loginMutation.isPending}
            onClick={() => handleDemoLogin("MANAGER")}
          >
            Manager
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={loginMutation.isPending}
            onClick={() => handleDemoLogin("MEMBER")}
          >
            Member
          </Button>
        </div>
      </div>
    </form>
  );
}
