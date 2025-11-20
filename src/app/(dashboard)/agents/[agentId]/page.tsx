import { default as AgentIdViewError } from "@/components/loading-error-state/error-state";
import { default as AgentIdViewLoading } from "@/components/loading-error-state/loading-state";
import AgentIdView from "@/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import type { AgentIdPageProps } from "@/types/agentId-page-type";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page({ params }: AgentIdPageProps) {
  const { agentId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  return (
    <HydrationBoundary>
      <Suspense
        fallback={
          <AgentIdViewLoading
            title="Loading agent"
            description="This may take a few seconds"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <AgentIdViewError
              title="Error loading agent"
              description="Something went wrong. Please try again later."
            />
          }
        >
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
}
