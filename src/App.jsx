import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Login from "./pages/profile/login";
import Logout from "./pages/profile/logout";
import Chat from "./pages/chat";
import useLocalStorage from "use-local-storage";
import AddContact from "./pages/contacts/add";
import Contacts from "./pages/contacts";
import Chats from "./pages/chats";
import { useEffect, useState } from "react";
import { notify } from "./pages/chat/notify";
import You from "./pages/profile/you";
import EditChat from "./pages/chat/edit";
import CreateInviteLink from "./pages/create-invite-link";
import Invite from "./pages/invite";

onblur = (e) => (window.roomID = "");

function App() {
  const [contacts, setContacts] = useLocalStorage(projectID + "contacts", {
    [user]: "You",
  });

  const [messages, setMessages] = useState({});
  const [chatRooms, setChatRooms] = useLocalStorage(projectID + "rooms", {});

  async function onMessageData(data) {
    var id = data?.room ?? "";
    if (!chatRooms?.[id]) {
      var name = await API.get("chat-name", id);
      setChatRooms((old) => {
        return {
          ...old,
          [id]: { name, unread: 0 },
        };
      });
    }
    //check if the actual room is focus
    if (roomID != id) {
      //add to the unread messages in room 1
      setChatRooms((old) => {
        return {
          ...old,
          [id]: {
            name: old[id].name,
            unread: old[id].unread + 1,
          },
        };
      });
      //send a notification
      notify(contacts, data);
    }
    //set the messages
    setMessages((old) => {
      return {
        ...old,
        [id]: [...(old[id] ?? []), data],
      };
    });
  }

  //if a message come
  API.onSay("incomming-message", onMessageData, true);

  API.onSay(
    "message-change",
    (data) => {
      log(data);
    },
    true
  );

  API.onSay(
    "delete-message",
    ({ room, id }) => {
      setMessages((oldMessages) => {
        return {
          ...oldMessages,
          [room]: oldMessages?.[room]?.filter((msg) => msg.id != id),
        };
      });
    },
    true
  );

  API.onSay(
    "comment-message",
    ({ room, msgId, comment, user }) => {
      setMessages((oldMessages) => {
        return {
          ...oldMessages,
          [room]: oldMessages?.[room]?.map((msg) => {
            if (msg.id != msgId) {
              return msg;
            } else {
              return {
                ...msg,
                comments: {
                  ...msg.comments,
                  [user]: comment,
                },
              };
            }
          }),
        };
      });
    },
    true
  );

  useEffect(() => {
    API.get("unread-messages").then((data) => {
      data.forEach(onMessageData);
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/chats"
        element={<Chats setRooms={setChatRooms} rooms={chatRooms} />}
      />
      <Route
        path="/chat/:id"
        element={
          <Chat
            contacts={contacts}
            setContacts={setContacts}
            messages={messages}
            setMessages={setMessages}
            setChats={setChatRooms}
          />
        }
      />
      <Route path="/create-invite-link/:id" element={<CreateInviteLink />} />
      <Route path="/chat/:id/edit" element={<EditChat contacts={contacts} />} />
      <Route
        path="/invite/:id"
        element={<Invite chats={chatRooms} setChats={setChatRooms} />}
      />
      <Route
        path="/contacts/add/:id"
        element={<AddContact contacts={contacts} setContacts={setContacts} />}
      />
      <Route
        path="/contacts/"
        element={
          <Contacts
            setRooms={setChatRooms}
            contacts={contacts}
            setContacts={setContacts}
          />
        }
      />
      <Route path="profile/you" element={<You />} />
      <Route path="profile/login" element={<Login />} />
      <Route path="profile/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
