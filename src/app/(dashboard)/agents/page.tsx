import { auth } from "@/lib/auth";
import AgentListHeader from "@/modules/agents/ui/components/agents-list-header";
import { AgentViewError } from "@/modules/agents/ui/views/agent-view-error";
import AgentsView from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <AgentListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<AgentViewError />}>
          <AgentsView />;
        </ErrorBoundary>
      </HydrationBoundary>
    </>
  );
}
