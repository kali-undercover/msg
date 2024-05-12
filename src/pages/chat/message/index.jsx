import { useState } from "react";
import { Link } from "react-router-dom";
import MessageCommentDropdown from "./message-comment-dropdown";
import Menu from "./menu";

function Message({
  data: { comments, data = "", date, from, id, react, type },
  i,
  contacts,
  room_id,
  canWrite,
  messagesLength,
  lastMsg,
  setSelectedReactionMessagesId,
  selectedReactionMessagesId,
}) {
  const [viewComments, setViewComments] = useState(false);
  return (
    <>
      <div
        id={id}
        onClick={(e) => {
          setViewComments((v) => !v);
        }}
        onDoubleClick={(e) => {
          e.preventDefault();
          setSelectedReactionMessagesId(
            selectedReactionMessagesId == id ? "none" : id
          );
          setTimeout(() => {
            e.target.scrollIntoView({ block: "center", behavior: "smooth" });
          }, 100);
        }}
        ref={i == messagesLength - 1 ? lastMsg : null}
        key={id}
        className={[
          "message",
          from == user ? "my" : "other",
          i == messagesLength - 1 ? "msg-anim" : "",
          selectedReactionMessagesId == id ? "active-msg" : "",
        ].join(" ")}
      >
        <p className="main">
          {react && (
            <div
              className="reaction"
              onClick={(e) => {
                e.preventDefault();
                var msg = document.getElementById(react);
                msg?.scrollIntoView?.({ behavior: "smooth", block: "center" });
                msg.style.boxShadow = "0 0 10px 5px var(--bs-danger)";
                msg.style.transition = "all 0.5s linear";
                setTimeout(() => {
                  msg.style.boxShadow = "0 0 0 0 black";
                }, 500);
                setTimeout(() => (msg.style.transition = ""), 1200);
                setViewComments((v) => !v);
              }}
            >
              Goto reaction
            </div>
          )}
          {type == "text" &&
            data.split(" ").map((word, i) => {
              try {
                new URL(word);
                return (
                  <span key={i}>
                    {" "}
                    <a className="text-white" target="_blank" href={word}>
                      {word}
                    </a>
                  </span>
                );
              } catch (error) {
                return <span key={i}>{" " + word}</span>;
              }
            })}
          {type == "iframe" && <iframe src={data} />}
        </p>
        <span className="meta">
          <Link
            to={`/contacts/add/${from}`}
            className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >
            {(contacts?.[from] ?? from + "")
              .split("")
              .slice(0, innerWidth < 500 ? 20 : 40)
              .filter((e) => !!e)
              .join("")}
          </Link>{" "}
          <b>{date}</b>
          <Menu
            canWrite={canWrite}
            id={id}
            room_id={room_id}
            viewComments={viewComments}
          />
        </span>
      </div>
      {viewComments && selectedReactionMessagesId != id && (
        <MessageCommentDropdown
          className={[
            "message",
            from == user ? "my" : "other",
            i == messagesLength - 1 ? "msg-anim" : "",
            selectedReactionMessagesId == id ? "active-msg" : "",
          ].join(" ")}
          comments={comments}
          contacts={contacts}
          id={id}
          room={room_id}
        />
      )}
    </>
  );
}

export default Message;
