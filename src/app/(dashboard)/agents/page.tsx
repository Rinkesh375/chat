import { auth } from "@/lib/auth";
import { loadSearchParams } from "@/modules/agents/params";
import AgentListHeader from "@/modules/agents/ui/components/agents-list-header";
import { AgentViewError } from "@/modules/agents/ui/views/agent-view-error";
import AgentsView from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

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
