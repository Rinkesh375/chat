export interface AgentIdPageProps {
  params: Promise<{ agentId: string }>;
}

export interface AgentIdViewHeaderProps {
  agentId: string;
  agentName: string;
  onEdit: () => void;
  onRemove: () => void;
}
