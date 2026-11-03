import "./OnlineIndicator.css";

export default function OnlineIndicator({ online }) {
  return (
    <span
      className={`online-indicator ${
        online ? "online" : "offline"
      }`}
    />
  );
}