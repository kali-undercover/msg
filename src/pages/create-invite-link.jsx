import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CreateInviteLink() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [inviteUserCount, setInviteUserCount] = useState(1);
  const [roomName, setRoomName] = useState("loading...");
  const [userType, setUserType] = useState("listen");
  const [link, setLink] = useState(false);

  useEffect(() => {
    API.get("chat-name", id).then(setRoomName);
  }, [id]);

  return (
    <main className="container">
      <br />
      <h3>CreateInviteLink for {roomName}</h3>
      {isLoading ? (
        <>
          <h4>Loading... </h4>
          <div className="spinner-grow" role="status">
            <span className="d-none">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <h6>How much user do you want to invite with this link?</h6>
          <input
            type="number"
            placeholder="how much"
            step={"1"}
            value={(inviteUserCount ?? 1) + ""}
            className="form-control mb-2"
            onChange={(e) => {
              var count = Math.abs(parseInt(e.target.value ?? "1"));
              setInviteUserCount(count > 10000000000 ? 10000000000 : count);
            }}
          />
          <h6>The default Usertype:</h6>
          <select
            className="form-control mb-2"
            onChange={(e) => setUserType(e.target.value)}
            value={userType}
          >
            <option value="admin">admin</option>
            <option value="client">client</option>
            <option value="listen">listen</option>
          </select>
          {link && (
            <input
              readOnly
              className="form-control mb-2"
              value={link}
              onClick={(e) =>
                navigator.share({
                  url: link,
                  title: "invite to room " + roomName,
                })
              }
            />
          )}
          <button className="btn btn-primary" onClick={(e) => history.back()}>
            Back
          </button>
          <button
            disabled={isLoading || link}
            className="btn btn-danger"
            style={{ marginLeft: "5px" }}
            onClick={async (e) => {
              setIsLoading(true);
              const inviteLinkId = await API.get("create-invite-link", {
                id,
                count: inviteUserCount,
                userType,
              });
              if (!inviteLinkId) return alert("cannot create invite link...");
              var url = new URL(document.location);
              url.hash = `/invite/${inviteLinkId}`;
              setLink(url.toString());
              setIsLoading(false);
            }}
          >
            Create Link
          </button>
        </>
      )}
    </main>
  );
}
export default CreateInviteLink;
