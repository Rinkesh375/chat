export interface CallConnectProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export enum Show {
  Lobby = "lobby",
  Call = "call",
  Ended = "ended",
}

export interface CallLobbyProps {
  onJoin: () => void;
}

export interface CallActiveProps {
  onLeave: () => void;
  meetingName: string;
}
