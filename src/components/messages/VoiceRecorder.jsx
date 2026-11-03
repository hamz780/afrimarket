import { FaMicrophone } from "react-icons/fa";
import { useState } from "react";

import "./VoiceRecorder.css";

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false);

  function toggleRecording() {
    setRecording((current) => !current);

    if (!recording) {
      alert("🎤 Recording started (demo)");
    } else {
      alert("✅ Voice message saved (demo)");
    }
  }

  return (
    <button
      type="button"
      className={`voice-button ${
        recording ? "recording" : ""
      }`}
      onClick={toggleRecording}
    >
      <FaMicrophone />
    </button>
  );
}