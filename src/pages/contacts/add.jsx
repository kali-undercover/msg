import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AddContact({ contacts, setContacts }) {
  const [name, setName] = useState("loading...");
  const { id } = useParams();
  const nameInput = useRef();

  useEffect(() => {
    API.get("user-name", id).then((data) => {
      setName(data ?? "user don't exist");
    });
  }, [id]);

  return (
    <div className="container">
      <h3>
        Do you want to {!!contacts?.[id] ? "rename" : "add"} {name}?
      </h3>
      <input
        defaultValue={contacts?.[id] ?? ""}
        ref={nameInput}
        type="text"
        className="form-control mb-2"
        placeholder="name..."
      />
      <div>
        <button
          style={{ marginRight: "5px" }}
          className="btn btn-danger"
          onClick={(e) => {
            setContacts((old) => {
              return {
                ...old,
                [id]:
                  nameInput.current.value == ""
                    ? name
                    : nameInput.current.value,
              };
            });
            var lastLocation = document.location + "";
            history.back();
            if (lastLocation == document.location + "") {
              document.location.hash = "/contacts/";
            }
          }}
        >
          Yes
        </button>
        <Link replace to="/contacts/" className="btn btn-primary">
          No
        </Link>
      </div>
    </div>
  );
}

export default AddContact;
