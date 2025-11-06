"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const handleSignUp = async () => {
    try {
      await authClient.signUp.email({
        email: "rinkeshujjwal16@gmail.com",
        password: "testing1234!@",
        name: "Rinkesh",
      });
    } catch (error) {}
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            console.log("It should be redirect to guest page");
          },
        },
      });
    } catch (error) {}
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
