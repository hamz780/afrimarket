import { FaPaperclip } from "react-icons/fa";

import "./AttachmentButton.css";

export default function AttachmentButton() {
  function handleAttachment(e) {
    const file = e.target.files[0];

    if (!file) return;

    alert(`Selected: ${file.name}`);
  }

  return (
    <>
      <label
        htmlFor="attachment"
        className="attachment-button"
      >
        <FaPaperclip />
      </label>

      <input
        id="attachment"
        type="file"
        hidden
        onChange={handleAttachment}
      />
    </>
  );
}