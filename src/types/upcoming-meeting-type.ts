export interface ActiveStateProps {
  meetingId: string;
}

export interface UpcomingStateProps extends ActiveStateProps {
  onCancelMeeting: () => void;
  isCancelling: boolean;
}
