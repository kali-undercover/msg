import { useEffect, useState } from "react";

function You() {
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("user-name", user).then(setName);
  }, []);

  return (
    <main className="container">
      <br />
      <label>Your Name</label>
      <input
        className="form-control"
        type="text"
        placeholder="Your public name..."
        value={name}
        onChange={(e) => {
          setName(e.target.value + "");
          API.say("set-user-name", e.target.value + "");
        }}
      />
    </main>
  );
}
export default You;
