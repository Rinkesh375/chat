import { Show } from "@/types/call-connect-type";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import CallLobby from "./call-lobby";
import CallActive from "./call-active";
import CallEnd from "./call-end";

export default function CallUI({ meetingName }: { meetingName: string }) {
  const call = useCall();
  const [show, setShow] = useState<Show>(Show.Lobby);

  const handleJoin = async () => {
    if (call) {
      await call.join();
      setShow(Show.Call);
    }
  };

  const handleLeave = () => {
    if (call) {
      call.endCall();
      setShow(Show.Ended);
    }
  };

  return (
    <StreamTheme>
      {show === Show.Lobby && <CallLobby onJoin={handleJoin} />}
      {show === Show.Call && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === Show.Ended && <CallEnd />}
    </StreamTheme>
  );
}
