import "./EmojiPicker.css";

const emojis = [
  "😀",
  "😂",
  "😍",
  "👍",
  "👏",
  "🎉",
  "❤️",
  "😊",
  "🤝",
  "🔥",
];

export default function EmojiPicker({
  onSelect,
}) {
  return (
    <div className="emoji-picker">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className="emoji-button"
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}