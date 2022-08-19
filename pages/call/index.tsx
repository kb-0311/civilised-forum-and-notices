import React from 'react'
import dynamic from "next/dynamic";
import { FC } from "react";
import { IJitsiMeetingProps } from "@jitsi/react-sdk/lib/types";

const JitsiMeeting = dynamic(
  () =>
    import("@jitsi/react-sdk").then(({ JitsiMeeting }) => JitsiMeeting) as any,
  {
    ssr: false,
  }
) as FC<IJitsiMeetingProps>;

function VideoCall() {
  return (
      <JitsiMeeting
      roomName = { 'CivilisedRoom' }
      getIFrameRef = { iframeRef => { iframeRef.style.height = '100vh'; } }
      />
  )
}

export default VideoCall