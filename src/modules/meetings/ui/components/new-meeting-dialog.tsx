import ResponsiveDialog from "@/components/responsive-dialog";
import { NewAgentDialogProps as NewMeetingDialogProps } from "@/types/new-agent-meeting";

export default function NewMeetingDialog({
  open,
  onOpenChange,
}: NewMeetingDialogProps) {
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a New Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      Todo
    </ResponsiveDialog>
  );
}
