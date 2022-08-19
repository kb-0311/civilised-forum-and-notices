import { JitsiMeeting } from '@jitsi/react-sdk';
import React from 'react'

function VideoCall() {
  return (
      <JitsiMeeting
      roomName = { 'CivilisedRoom' }
      getIFrameRef = { iframeRef => { iframeRef.style.height = '100vh'; } }
      />
  )
}

export default VideoCall