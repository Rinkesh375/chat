"use client";
import ErrorState from "@/components/loading-error-state/error-state";
import { MeetingStatus } from "@/modules/meetings/types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import CallProviders from "../components/call-providers";

export default function CallView({ meetingId }: { meetingId: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === MeetingStatus.Completed) {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting"
        />
      </div>
    );
  }
  return <CallProviders meetingId={meetingId} meetingName={data.name} />;
}
