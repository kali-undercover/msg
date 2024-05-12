import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contacts({ contacts, setContacts, setRooms }) {
  const [selected, setSelected] = useState(
    Object.keys(contacts).map(() => false)
  );
  const [userType, setUserType] = useState(
    Object.keys(contacts).map(() => "client")
  );
  const [newRoomName, setNewRoomName] = useState("");

  useEffect(() => {
    setSelected(Object.keys(contacts).map(() => false));
    setUserType(Object.keys(contacts).map(() => "client"));
  }, [contacts]);

  if (!contacts?.[user]) contacts[user] = "You";

  return (
    <div className="container">
      <br />
      <h3>Contacts</h3>
      {selected.filter((x, i) => x == true).length > 0 ? (
        <>
          <input
            value={newRoomName}
            onInput={(e) => setNewRoomName(e.target?.value)}
            type="text"
            className="form-control mb-2"
            placeholder="room name..."
          />
          <Link
            className="btn btn-primary"
            onClick={async (e) => {
              var users = {};
              var keys = Object.keys(contacts);
              var includeOneAdmin =
                keys
                  .filter((x, i) => selected[i])
                  .map((k, i) => {
                    users[k] = userType[i];
                    return userType[i];
                  })
                  .filter((type) => type == "admin").length > 0;
              if (!includeOneAdmin) return alert("group havent got an admin");
              var data = await API.get("create-room", [users, newRoomName]);
              if (!data) location.reload();
              var name = await API.get("chat-name", data);
              setRooms((old) => {
                return {
                  ...old,
                  [data]: { name, unread: 0 },
                };
              });
              document.location.hash = `/chat/${data}`;
            }}
          >
            Create new chat
          </Link>
          <button
            style={{ marginLeft: "5px" }}
            className="btn btn-danger"
            onClick={(e) => {
              var newContacts = { ...contacts };
              Object.keys(contacts)
                .filter((x, i) => selected[i])
                .forEach((key) => delete newContacts[key]);
              setContacts(newContacts);
            }}
          >
            Delete
          </button>
        </>
      ) : (
        <></>
      )}
      <ul className="list-group list-group-flush">
        {Object.keys(contacts).map((key, i) => {
          return (
            <li key={key} className="list-group-item d-flex">
              <div className="form-check">
                <input
                  onClick={(e) => {
                    setSelected(
                      selected.map((v, index) => (index != i ? v : !v))
                    );
                  }}
                  readOnly
                  checked={selected[i] ?? false}
                  type="checkbox"
                  className="form-check-input"
                />
              </div>
              <Link
                style={{ marginLeft: "5px" }}
                to={`/contacts/add/${key}`}
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                {contacts[key]}
              </Link>
              {!!selected[i] && (
                <select
                  style={{ marginLeft: "auto" }}
                  onChange={(e) =>
                    setUserType(
                      userType.map((v, index) =>
                        index != i ? v : e.target.value
                      )
                    )
                  }
                >
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                  <option value="listen">listen</option>
                </select>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Contacts;
