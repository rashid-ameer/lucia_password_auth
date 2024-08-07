"use client";
import { logout } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  // handle click
  const handleClick = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}>
      Logout
    </Button>
  );
}
export default LogoutButton;
