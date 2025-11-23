import { AgentGetOne } from "@/modules/agents/types";
import { MeetingGetOne } from "@/modules/meetings/types";

export interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface UpdateAgentDialogProps extends NewAgentDialogProps {
  initialValues: AgentGetOne;
}

export interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export interface UpdateMeetingDialogProps extends NewAgentDialogProps {
  initialValues: MeetingGetOne;
}

export interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}
