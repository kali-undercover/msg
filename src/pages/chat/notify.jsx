export async function notify(contacts, data) {
  if (Notification.permission == "granted" && data.from != user) {
    var not = new Notification(contacts[data.from] ?? data.from, {
      body: data.data,
      icon: "https://manuelwestermeier.github.io/messenger-v2/logo.jpeg",
    });
    not.addEventListener("click", (e) => {
      not.close();
      document.location.hash = `/chat/${data.room}`;
    });
  } else Notification.requestPermission();
}
