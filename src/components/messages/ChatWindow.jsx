import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import { useMessages } from "../../context/MessageContext";
import MessageBubble from "./MessageBubble";
import AttachmentButton from "./AttachmentButton";
import EmojiPicker from "./EmojiPicker";
import ImagePreview from "./ImagePreview";
import VoiceRecorder from "./VoiceRecorder";

import "./ChatWindow.css";

export default function ChatWindow() {
  const {
    selectedConversation,
    sendMessage,
    typing,
    startTyping,
    stopTyping,
  } = useMessages();

  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] =
    useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedConversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedConversation?.messages]);

  if (!selectedConversation) {
    return (
      <div className="chat-empty">
        <h2>No Conversation Selected</h2>

        <p>
          Choose a customer from the left to
          start chatting.
        </p>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim() && !selectedImage)
      return;

    sendMessage(text);

    setText("");
    setSelectedImage(null);
    stopTyping();

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }

  function handleAttachment(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="chat-window">

      <div className="chat-header">

        <div>

          <h2>
            {selectedConversation.customer.name}
          </h2>

          <small>
            {selectedConversation.customer.online
              ? "🟢 Online"
              : "⚪ Offline"}
          </small>

        </div>

      </div>

      <div className="chat-messages">

        {selectedConversation.messages.map(
          (message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          )
        )}

        {typing && (
          <div className="typing-indicator">
            Seller is typing...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

      <EmojiPicker
        onSelect={(emoji) =>
          setText((current) => current + emoji)
        }
      />

      <ImagePreview
        image={selectedImage}
        onRemove={() =>
          setSelectedImage(null)
        }
      />

      <form
        className="chat-input"
        onSubmit={handleSubmit}
      >

        <AttachmentButton
          onSelect={handleAttachment}
        />

        <VoiceRecorder />

        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);

            if (
              e.target.value.trim().length > 0
            ) {
              startTyping();
            } else {
              stopTyping();
            }
          }}
          placeholder="Type your message..."
        />

        <button type="submit">
          <FaPaperPlane />
        </button>

      </form>

    </div>
  );
}