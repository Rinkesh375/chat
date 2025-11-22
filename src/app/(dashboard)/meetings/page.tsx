import { default as MeetingIdViewError } from "@/components/loading-error-state/error-state";
import { default as MeetingIdViewLoading } from "@/components/loading-error-state/loading-state";
import { auth } from "@/lib/auth";
import MeetingListHeader from "@/modules/meetings/ui/components/meetings-list-header";
import MeetingsView from "@/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <>
      <MeetingListHeader />
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
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
