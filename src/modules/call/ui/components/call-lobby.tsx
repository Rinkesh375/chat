import type { CallLobbyProps } from "@/types/call-connect-type";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import generatedAvatar from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";

export default function CallLobby({ onJoin }: CallLobbyProps) {
  return <></>;
}
