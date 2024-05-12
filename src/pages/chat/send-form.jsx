import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toIframeUrl from "./to-iframe-url";
function SendForm({
  room,
  canWrite,
  setCanWrite,
  setSelectedReactionMessagesId,
  selectedReactionMessagesId,
}) {
  const [search, setSearch] = useSearchParams({ text: "" });
  const messageText = search.get("text"),
    setMessageText = (text) => {
      setSearch({ text }, { replace: true });
    };
  const [type, setType] = useState("text");
  const textarea = useRef();

  window.onfocus = (e) => {
    textarea?.current?.focus?.();
  };

  useEffect(() => {
    API.get("can-send-messages-in-room", room).then(setCanWrite);
  }, [room]);

  function sendMessage() {
    if (messageText == "") return;

    var data = {
      room,
      data: toIframeUrl(messageText),
      type,
      reaction: selectedReactionMessagesId,
    };

    API.say("send-message", data);
    setMessageText("");
    setSelectedReactionMessagesId("none");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      className="send-form"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <button
          className={`btn ${type == "text" && "btn-primary"}`}
          style={{ fontSize: "0.8rem" }}
          onClick={(e) => {
            e.preventDefault();
            setType("text");
          }}
        >
          Text
        </button>
        <button
          className={`btn ${type == "iframe" && "btn-primary"}`}
          style={{ fontSize: "0.8rem" }}
          onClick={(e) => {
            e.preventDefault();
            setType("iframe");
          }}
        >
          Iframe
        </button>
      </div>
      <textarea
        name="message"
        title="message"
        value={canWrite ? messageText : "You can't write messages"}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder={type == "text" ? "Message..." : "Iframe url..."}
        className="form-control mb-2"
        ref={textarea}
        onKeyDown={(e) => {
          if (e.key == "Escape") sendMessage();
        }}
      ></textarea>
      <button
        className="btn btn-primary"
        type="submit"
        title="send"
        style={{
          height: "50px",
          width: "50px",
          fill: "white",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
        </svg>
      </button>
    </form>
  );
}
export default SendForm;
