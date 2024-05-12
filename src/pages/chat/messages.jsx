import { useEffect, useRef, useState } from "react";
import Message from "./message";

function Messages({
  messages = [{ comments, data, date, from, id, react, type }],
  contacts,
  room_id,
  canWrite,
  setSelectedReactionMessagesId,
  selectedReactionMessagesId,
}) {
  const lastMsg = useRef();
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);

  useEffect(() => {
    if (lastMsg.current) {
      if (!showScrollDownButton)
        lastMsg.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      onScroll={(e) => {
        var canScrollToNewMsg =
          e.target.scrollHeight - innerHeight >
          e.target.scrollTop + innerHeight / 2;

        setShowScrollDownButton(canScrollToNewMsg);
      }}
      className="messages-vue"
    >
      {messages.map((data, i) => {
        return (
          <Message
            selectedReactionMessagesId={selectedReactionMessagesId}
            setSelectedReactionMessagesId={setSelectedReactionMessagesId}
            data={data}
            i={i}
            canWrite={canWrite}
            contacts={contacts}
            messagesLength={messages.length}
            room_id={room_id}
            key={data.id}
            lastMsg={lastMsg}
          />
        );
      })}
      {showScrollDownButton && (
        <button
          className="scroll-down btn btn-primary"
          onClick={(e) =>
            lastMsg.current.scrollIntoView({ behavior: "smooth" })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Messages;
