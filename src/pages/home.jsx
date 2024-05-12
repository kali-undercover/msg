import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <br />
      <h1>Home</h1>
      <p>
        The open source multi-chat, cross-platform & non tracking messenger.
      </p>
      <hr />
      <Link to="/contacts/">Your Contacts</Link>
      <br />
      <Link to="/chats/">Your Chats</Link>
      <br />
      <Link to="/profile/you/">Your Profile</Link>
      <hr />
      <h4>How to use</h4>
      <h5>Contacts</h5>
      <p>
        You can select, delete selected contacts and create chat rooms with the
        selected contacts in the contacts section.
      </p>
      <h5>Chats</h5>
      <p>
        In the chats section are all your chat rooms listed. You can open and
        delete them.
      </p>
      <h5>Chat rooms</h5>
      <h6>You are admin : </h6>
      <p>
        You can write, delete and comment messages. Also you can edit the
        chat-room settings and invite & ckick user out of the chat.
      </p>
      <h6>Client</h6>
      <p>You can write, delete and comment messages.</p>
      <h6>You are listener : </h6>
      <p>
        You can only see and comment messages with emojis or max 10 character long
        words.
      </p>
    </div>
  );
}
export default Home;
