import {
  FaCheck,
  FaCheckDouble
} from "react-icons/fa";

import "./MessageBubble.css";

export default function MessageBubble({
  message,
}) {

  const isSeller =
    message.sender === "seller";

  return (
    <div
      className={`message-row ${
        isSeller ? "seller" : "customer"
      }`}
    >
      <div
        className={`message-bubble ${
          isSeller
            ? "seller-bubble"
            : "customer-bubble"
        }`}
      >

        {message.image && (
          <img
            src={message.image}
            alt="attachment"
            className="message-image"
          />
        )}

        {message.voice && (
          <audio controls>
            <source
              src={message.voice}
            />
          </audio>
        )}

        {message.text && (
          <p>{message.text}</p>
        )}

        <div className="message-footer">

          <small>{message.time}</small>

          {isSeller && (

            <span className="message-status">

              {message.read ? (
                <FaCheckDouble
                  className="read"
                />
              ) : (
                <FaCheck />
              )}

            </span>

          )}

        </div>

      </div>
    </div>
  );
}