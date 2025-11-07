"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await authClient.signUp.email({
        email: "rinkeshujjwal16@gmail.com",
        password: "testing1234!@",
        name: "Rinkesh",
      });
    } catch (error) {}
  };

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="flex flex-col">
      <Button onClick={handleSignUp}>Sign Up</Button>
      {session?.user?.email && (
        <Button onClick={handleSignOut}>Sign Out</Button>
      )}
    </div>
  );
}
