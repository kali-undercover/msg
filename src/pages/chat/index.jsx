import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SendForm from "./send-form";
import Messages from "./messages";

function Chat({ contacts, messages, setMessages, setChats }) {
  const { id } = useParams();
  const [chatName, setChatName] = useState("Loading....");
  const [canWrite, setCanWrite] = useState(true);
  const [userType, setUsertype] = useState("listen");

  const [selectedReactionMessagesId, setSelectedReactionMessagesId] =
    useState("none");

  window.roomID = id;

  if (!messages?.[id]) messages[id] = [];

  useEffect(() => {
    (async () => {
      setUsertype(await API.get("user-type-in-romm", id));
      var name = await API.get("chat-name", id);
      setChatName(name);
      var data = await API.get("chat-messages", id);
      if (!data) return;
      setMessages((old) => {
        return {
          ...old,
          [id]: data,
        };
      });
      setChats((old) => {
        return {
          ...old,
          [id]: {
            name,
            unread: 0,
          },
        };
      });
    })();
  }, [id]);

  return (
    <div className="container">
      <center>
        <h3
          style={{
            maxHeight: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            className="btn btn-primary"
            to={`/chats`}
            style={{ marginRight: "auto" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </Link>
          
          <input
            //chenge the chat name
            onInput={(e) => {
              if (userType == "admin" || userType == "client")
                setChatName(e.target.value);
              API.say("change-chatt-name", {
                room: id,
                name: e.target.value,
              });
            }}
            className="short n-input"
            value={chatName}
          />
          {userType == "admin" && (
            <Link
              className="btn btn-primary"
              style={{ marginLeft: "auto" }}
              to={`/chat/${id}/edit`}
            >
              Edit
            </Link>
          )}
        </h3>
      </center>
      <Messages
        setSelectedReactionMessagesId={setSelectedReactionMessagesId}
        selectedReactionMessagesId={selectedReactionMessagesId}
        canWrite={canWrite}
        room_id={id}
        contacts={contacts}
        messages={messages?.[id] || []}
      />
      <SendForm
        setSelectedReactionMessagesId={setSelectedReactionMessagesId}
        selectedReactionMessagesId={selectedReactionMessagesId}
        canWrite={canWrite}
        setCanWrite={setCanWrite}
        room={id}
      />
    </div>
  );
}

export default Chat;
