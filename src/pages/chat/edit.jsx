import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditChat({ contacts }) {
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInChat, setUserInChat] = useState({});
  const [seeContacts, setSeeContacts] = useState(false);

  useEffect(() => {
    API.get("user-type-in-romm", id).then((data) =>
      setIsAdmin(data == "admin")
    );
    API.get("user-in-romm", id).then((data) => {
      if (!data) history.back();
      setUserInChat(data);
    });
  }, [id]);

  if (!isAdmin)
    return (
      <h3 className="container text-warning">
        You are not in the room
        <button className="btn btn-warning" onClick={(e) => history.back()}>
          Back
        </button>
      </h3>
    );

  return (
    <main className="container">
      <button
        className="btn btn-primary mt-2"
        onClick={(e) => history.back()}
        style={{ marginLeft: "5%" }}
      >
        Back
      </button>
      <Link
        className="btn btn-danger mt-2"
        to={`/create-invite-link/${id}`}
        style={{ marginLeft: "5px" }}
      >
        Invite user per link
      </Link>
      <ul className="list-group list-group-flush">
        {Object.keys(userInChat).map((key, i) => {
          return (
            <li key={key} className="list-group-item d-flex">
              <Link
                style={{ marginLeft: "5px" }}
                to={`/contacts/add/${key}`}
                className="link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                {contacts[key] ?? key}
              </Link>
              <select
                style={{ marginLeft: "auto" }}
                onChange={(e) => {
                  setUserInChat((old) => {
                    var newUser = {
                      ...old,
                      [key]: e.target.value,
                    };
                    API.say("set-user-in-romm", { room: id, newUser });
                    return newUser;
                  });
                }}
                value={userInChat[key]}
              >
                <option value="client">client</option>
                <option value="admin">admin</option>
                <option value="listen">listen</option>
              </select>
              <svg
                style={{ backgroundColor: "var(--bs-danger)", margin: "0 2px" }}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                onClick={(e) => {
                  if (!confirm("delete " + contacts[key])) return;
                  setUserInChat((old) => {
                    var newUser = {
                      ...old,
                    };
                    delete newUser[key];
                    API.say("set-user-in-romm", { room: id, newUser });
                    return newUser;
                  });
                }}
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"></path>
              </svg>
            </li>
          );
        })}
      </ul>
      <button
        className="btn btn-primary mt-2"
        onClick={(e) => setSeeContacts((o) => !o)}
        style={{ marginLeft: "5%" }}
      >
        Add Contact
      </button>
      {seeContacts && (
        <>
          <ul className="list-group list-group-flush">
            {Object.keys(contacts)
              .filter((key) => !userInChat[key])
              .map((key, i) => {
                return (
                  <li
                    role="button"
                    key={key}
                    className="list-group-item d-flex"
                    onClick={(e) => {
                      setSeeContacts(false);
                      userInChat[key] = "client";
                      setUserInChat((old) => {
                        var newUser = { ...old };
                        newUser[key] = "client";
                        API.say("set-user-in-romm", { room: id, newUser });
                        return newUser;
                      });
                    }}
                  >
                    <button className="btn btn-primary"></button>
                    <span style={{ marginLeft: "5px" }}>{contacts[key]}</span>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </main>
  );
}
export default EditChat;
