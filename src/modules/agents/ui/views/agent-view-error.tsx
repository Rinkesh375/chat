"use client"
import ErrorState from "@/components/loading-error-state/error-state";

export function AgentViewError() {
  return (
    <ErrorState
      title="Error loading agents"
      description="Something went wrong. Please try again later."
    />
  );
}
