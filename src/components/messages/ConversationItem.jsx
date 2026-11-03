import OnlineIndicator from "./OnlineIndicator";
import { useMessages } from "../../context/MessageContext";

export default function ConversationItem({
  conversation,
}) {
  const {
    selectConversation,
    selectedConversationId,
  } = useMessages();

  const active =
    selectedConversationId === conversation.id;

  const lastMessage =
    conversation.messages[
      conversation.messages.length - 1
    ];

  return (
    <div
      className={`conversation-item ${
        active ? "active" : ""
      }`}
      onClick={() =>
        selectConversation(conversation.id)
      }
    >
      <div className="conversation-avatar">
        {conversation.customer.name.charAt(0)}

        <OnlineIndicator
          online={conversation.customer.online}
        />
      </div>

      <div className="conversation-info">
        <h4>{conversation.customer.name}</h4>

        <p>
          {lastMessage?.text || "No messages"}
        </p>
      </div>

      <div className="conversation-meta">
        <small className="conversation-time">
          {lastMessage?.time}
        </small>

        {conversation.unread > 0 && (
          <span className="conversation-badge">
            {conversation.unread}
          </span>
        )}
      </div>
    </div>
  );
}