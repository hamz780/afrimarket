import ConversationList from "../../components/messages/ConversationList";
import ChatWindow from "../../components/messages/ChatWindow";

import "./SellerMessages.css";

export default function SellerMessages() {
  return (
    <div className="seller-messages-page">
      <div className="messages-sidebar">
        <ConversationList />
      </div>

      <div className="messages-content">
        <ChatWindow />
      </div>
    </div>
  );
}