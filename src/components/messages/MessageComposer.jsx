import { FaPaperPlane } from "react-icons/fa";
import "./MessageComposer.css";

export default function MessageComposer() {
  return (
    <div className="message-composer">

      <div className="message-header">
        <h2>Select a conversation</h2>
        <p>
          Choose a customer to start chatting.
        </p>
      </div>

      <div className="message-body">
        <p className="empty-chat">
          No conversation selected.
        </p>
      </div>

      <div className="message-footer">
        <input
          type="text"
          placeholder="Type your message..."
          disabled
        />

        <button disabled>
          <FaPaperPlane />
        </button>
      </div>

    </div>
  );
}