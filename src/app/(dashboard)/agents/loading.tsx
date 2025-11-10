import LoadingState from "@/components/loading-error-state/loading-state";

export default function Loading() {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds..."
    />
  );
}
