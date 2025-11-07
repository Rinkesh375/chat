"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const router = useRouter();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (error) => {},
      },
    });
  };

  return (
    <div className="flex flex-col">
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
