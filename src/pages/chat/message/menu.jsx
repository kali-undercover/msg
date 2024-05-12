function Menu({ canWrite, room_id, id, viewComments, type, data }) {
  return (
    <>
      <svg
        role="button"
        style={{
          fill: "var(--bs-body-color)",
          transition: "all 0.2s ease-in-out",
          transform: `rotate(${viewComments ? 180 : 0}deg)`,
        }}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
      </svg>

      {type == "iframe" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="var(--bs-body-color)"
          onClick={(e) => {
            e.preventDefault();
            open(data);
          }}
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      )}

      <svg
        style={{ display: !canWrite && "none", fill: "var(--bs-body-color)" }}
        role="button"
        className="c-pointer"
        onClick={(e) => {
          if (confirm("delete message?"))
            API.say("delete-message", {
              room: room_id,
              id,
            });
        }}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
      </svg>
    </>
  );
}

export default Menu;
