import { useEffect, useState } from "react";

function MessageCommentDropdown({ className, contacts, comments, room, id }) {
  const [comment, setComment] = useState(comments?.[user] ?? "");

  useEffect(() => {
    if (comment != "" || comments?.[user])
      API.say("comment-message", {
        room,
        id,
        comment,
      });
  }, [comment]);

  return (
    <div className={className} style={{ transform: "translateY(-8px)" }}>
      <div className="comment-menu">
        <span className="btn" onClick={(e) => setComment(e.target.innerText)}>
          👍
        </span>
        <span className="btn" onClick={(e) => setComment(e.target.innerText)}>
          👌
        </span>
        <span className="btn" onClick={(e) => setComment(e.target.innerText)}>
          ❤️
        </span>
        <span className="btn" onClick={(e) => setComment(e.target.innerText)}>
          😒
        </span>
        <span className="btn" onClick={(e) => setComment(e.target.innerText)}>
          😁
        </span>
        <span className="btn" onClick={(e) => setComment("")}>
          X
        </span>
        <input
          className="n-input"
          style={{ border: "1px solid", borderRadius: "5px" }}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value.split("").slice(0, 10).join(""))
          }
        />
      </div>
      <div>
        {Object.keys(comments).map((key) => {
          return (
            <div key={key}>
              {comments[key] != "" && `${contacts[key]} : ${comments[key]}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MessageCommentDropdown;
