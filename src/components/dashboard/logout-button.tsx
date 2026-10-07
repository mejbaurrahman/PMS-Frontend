"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/auth-api";

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,

    onSuccess: (response) => {
      queryClient.removeQueries({
        queryKey: ["auth"],
      });

      toast.success(response.message);

      router.replace("/login");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      <LogOut className="size-4" />

      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
