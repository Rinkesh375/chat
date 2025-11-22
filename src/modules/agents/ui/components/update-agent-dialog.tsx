"use client";
import ResponsiveDialog from "@/components/responsive-dialog";
import type { UpdateAgentDialogProps } from "@/types/new-agent-meeting";
import AgentForm from "./agent-form";

export default function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}
