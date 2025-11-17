import ResponsiveDialog from "@/components/responsive-dialog";
import { NewAgentDialogProps } from "@/types/new-agent";
import AgentForm from "./agent-form";

export default function NewAgentDialog({
  open,
  onOpenChange,
}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a New agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
