import { Link } from "react-router-dom";
function Chats({ rooms, setRooms }) {
  return (
    <div className="container">
      <br />
      <h3>Chats</h3>
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
                to={`/chat/${key}`}
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

                  <svg
                    className="delete"
                    onClick={(e) => {
                      e.preventDefault();
                      setRooms((old_rooms) => {
                        const newChats = { ...old_rooms };
                        delete newChats[key];
                        return newChats;
                      });
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}
export default Chats;
