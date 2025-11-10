import AgentsView from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";


export default async function Page() {
   const queryClient = getQueryClient();
   void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions()) 
 
   return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <AgentsView />;
    </HydrationBoundary>
   )
}
