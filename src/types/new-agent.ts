import  { AgentGetOne } from "@/modules/agents/types";

export interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}
