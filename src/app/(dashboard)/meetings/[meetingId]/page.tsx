import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { default as MeetingIdViewError } from "@/components/loading-error-state/error-state";
import { default as MeetingIdViewLoading } from "@/components/loading-error-state/loading-state";
import { MeetingIdPageProps } from "@/types/meetingId-page-type";
import MeetingIdView from "@/modules/meetings/ui/views/meeting-id-view";

export default async function Page({ params }: MeetingIdPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { meetingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <MeetingIdViewLoading
            title="Loading meeting"
            description="This may take a few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <MeetingIdViewError
              title="Error while fetching meeting"
              description="Something went wrong. Please try again later."
            />
          }
        >
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
