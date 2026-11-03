import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const MessageContext = createContext();

const initialConversations = [
  {
    id: 1,
    customer: {
      id: "CUS-1001",
      name: "John Smith",
      online: true,
    },
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Hello seller.",
        time: "09:15",
      },
      {
        id: 2,
        sender: "customer",
        text: "Has my order shipped?",
        time: "09:16",
      },
    ],
  },
  {
    id: 2,
    customer: {
      id: "CUS-1002",
      name: "Sarah Johnson",
      online: false,
    },
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "customer",
        text: "Thank you!",
        time: "Yesterday",
      },
    ],
  },
];

export function MessageProvider({ children }) {
  const [conversations, setConversations] =
    useState(initialConversations);

  const [selectedConversationId, setSelectedConversationId] =
    useState(initialConversations[0].id);

  const [typing, setTyping] = useState(false);

  const selectedConversation = useMemo(() => {
    return conversations.find(
      (conversation) =>
        conversation.id === selectedConversationId
    );
  }, [conversations, selectedConversationId]);

  function selectConversation(id) {
    setSelectedConversationId(id);

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unread: 0,
            }
          : conversation
      )
    );
  }

  function sendMessage(text) {
    if (!text.trim()) return;

    const messageId = Date.now();

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                {
                  id: messageId,
                  sender: "seller",
                  text,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  delivered: true,
                  read: false,
                },
              ],
            }
          : conversation
      )
    );

    setTyping(false);

    // Simulate customer reading the message
    setTimeout(() => {
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === selectedConversationId
            ? {
                ...conversation,
                messages: conversation.messages.map(
                  (message) =>
                    message.id === messageId
                      ? {
                          ...message,
                          read: true,
                        }
                      : message
                ),
              }
            : conversation
        )
      );
    }, 3000);
  }

  function startTyping() {
    setTyping(true);
  }

  function stopTyping() {
    setTyping(false);
  }

  return (
    <MessageContext.Provider
      value={{
        conversations,
        selectedConversation,
        selectedConversationId,
        selectConversation,
        sendMessage,
        typing,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error(
      "useMessages must be used inside MessageProvider"
    );
  }

  return context;
}