import { Link, useSearchParams } from "react-router-dom";
function SharePage({ rooms, setRooms }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="container">
      <br />
      <div style={{ display: "flex" }}>
        <Link
          className="btn btn-primary"
          to={`/chats`}
          style={{ marginRight: "10px" }}
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
        <h3>Share</h3>
      </div>
      <br />
      <textarea
        className="form-control"
        placeholder="send text"
        value={searchParams.get("text")}
        onChange={(e) => setSearchParams({ text: e.target.value })}
      ></textarea>
      <br />
      <ul className="list-group list-group-flush">
        {Object.keys(rooms)
          .sort((a, b) => rooms[a].unread + rooms[b].unread)
          .map((key) => {
            return (
              <Link
                onClick={(e) => {
                  //set the unread messages to 0
                  setRooms((old) => {
                    if (!old?.[key]) return old;
                    return {
                      ...old,
                      [key]: {
                        name: old[key].name,
                        unread: 0,
                      },
                    };
                  });
                }}
                className="list-group-item"
                to={`/chat/${key}?${new URLSearchParams({
                  text: searchParams.get("text"),
                })}`}
                key={key}
              >
                <li className="chatt">
                  <span>{rooms[key].name}</span>
                  {rooms[key].unread > 0 && (
                    <span
                      className="badge bg-primary rounded-pill"
                      style={{ float: "right" }}
                    >
                      {rooms[key].unread}
                    </span>
                  )}
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
export default SharePage;
