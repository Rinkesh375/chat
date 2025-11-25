"use client";
import { LoaderIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import generatedAvatar from "@/lib/avatar";
import CallConnect from "./call-connect";
import { GeneratedAvatarVariant } from "@/types/generated-avatar";

export default function CallProviders({
  meetingId,
  meetingName,
}: {
  meetingId: string;
  meetingName: string;
}) {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data?.user.image ??
        generatedAvatar({
          seed: data.user.name,
          variant: GeneratedAvatarVariant.Initials,
        })
      }
    />
  );
}
