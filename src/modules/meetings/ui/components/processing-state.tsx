import { default as State } from "@/components/loading-error-state/empty-state";

export default function ProcessingState() {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <State
        image={"/processing.svg"}
        title="Meeting completed"
        description="This meeting was completed, a summary will appear soon"
      />
    </div>
  );
}
