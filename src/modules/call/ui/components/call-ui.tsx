import { Show } from "@/types/call-connect-type";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";

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
      {show === Show.Lobby && <p>Lobby</p>}
      {show === Show.Call && <p>Call</p>}
      {show === Show.Ended && <p>Ended</p>}
    </StreamTheme>
  );
}
