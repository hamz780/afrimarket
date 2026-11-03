import ConversationItem from "./ConversationItem";
import MessageSearch from "./MessageSearch";
import { useMessages } from "../../context/MessageContext";

import "./ConversationList.css";

export default function ConversationList() {
  const { conversations } = useMessages();

  return (
    <>
      <MessageSearch />

      <div className="conversation-list">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
          />
        ))}
      </div>
    </>
  );
}