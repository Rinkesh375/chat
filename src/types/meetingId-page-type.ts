export interface MeetingIdPageProps {
  params: Promise<{ meetingId: string }>;
}

export interface MeetingIdViewHeaderProps {
  meetingId: string;
  meetingName: string;
  onEdit: () => void;
  onRemove: () => void;
}
