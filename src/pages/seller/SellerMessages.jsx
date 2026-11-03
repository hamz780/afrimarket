import ConversationList from "../../components/messages/ConversationList";
import MessageComposer from "../../components/messages/MessageComposer";

import "./SellerMessages.css";

export default function SellerMessages() {
  return (
    <div className="seller-messages-page">

      <div className="messages-sidebar">
        <ConversationList />
      </div>

      <div className="messages-content">
        <MessageComposer />
      </div>

    </div>
  );
}