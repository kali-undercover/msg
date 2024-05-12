import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Invite({ chats, setChats }) {
  const { id } = useParams();
  const [roomName, setRoomName] = useState("loading...");

  useEffect(() => {
    API.get("invite-chat-name", id).then(setRoomName);
  }, [id]);

  return !!roomName ? (
    <div className="container">
      <h3>Join room {roomName}</h3>
      <button className="btn btn-primary" onClick={(e) => history.back()}>
        Back
      </button>
      <button
        className="btn btn-danger"
        style={{ marginLeft: "5px" }}
        onClick={async (e) => {
          var data = await API.get("join-invention", id);
          if (!data) return history.back();
          var newRoomID = data.split("/")[2];
          setChats((old) => {
            return {
              ...old,
              [newRoomID]: { name: "", unread: 0 },
            };
          });
          document.location.hash = `/chat/${newRoomID}`;
        }}
      >
        Join
      </button>
    </div>
  ) : (
    <h1 className="container">Invet link doesn't exists anymore</h1>
  );
}

export default Invite;
