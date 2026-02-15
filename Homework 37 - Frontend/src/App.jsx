"use client";

import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [room, setRoom] = useState({
    id: "",
    username: "",
    email: "",
    joined: false,
  });

  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  function join() {
    if (room.id && room.email && room.username) {
      socket.emit("joinRoom", {
        roomId: room.id,
        username: room.username,
        email: room.email,
      });
      setRoom((prev) => ({ ...prev, joined: true }));
    }
  }

  function send() {
    if (!msg.trim()) return;

    socket.emit("onPrivateMessage", {
      roomId: room.id,
      username: room.username,
      email: room.email,
      message: msg,
    });

    setMsg("");
  }

  useEffect(() => {
    socket.on("privateMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("privateMessage");
    };
  }, [socket]);

  return (
    <div style={styles.container}>
      {!room.joined ?
        <div style={styles.joinBox}>
          <input
            style={styles.input}
            placeholder="Room ID"
            value={room.id}
            onChange={(e) => setRoom({ ...room, id: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Username"
            value={room.username}
            onChange={(e) => setRoom({ ...room, username: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Email"
            value={room.email}
            onChange={(e) => setRoom({ ...room, email: e.target.value })}
          />
          <button style={styles.button} onClick={join}>
            Join
          </button>
        </div>
      : <>
          <div style={styles.chatBox}>
            {chat.map((c, i) => {
              const isMe = c.email === room.email;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isMe ? "flex-end" : "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ maxWidth: "60%" }}>
                    <div
                      style={{
                        fontSize: 12,
                        marginBottom: 4,
                        textAlign: isMe ? "right" : "left",
                        opacity: 0.7,
                      }}
                    >
                      {c.username}
                    </div>

                    <div
                      style={{
                        background: "#111",
                        padding: "10px 14px",
                        borderRadius: 10,
                        textAlign: isMe ? "right" : "left",
                        border: "1px solid #222",
                      }}
                    >
                      {c.message}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.inputBar}>
            <input
              style={styles.input}
              placeholder="Type message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <button style={styles.button} onClick={send}>
              Send
            </button>
          </div>
        </>
      }
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  joinBox: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300,
  },
  chatBox: {
    width: "100%",
    maxWidth: 700,
    height: "70vh",
    overflowY: "auto",
    padding: 20,
  },
  inputBar: {
    display: "flex",
    gap: 10,
    width: "100%",
    maxWidth: 700,
    padding: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    background: "#111",
    color: "#fff",
    border: "1px solid #222",
    borderRadius: 6,
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    background: "#111",
    color: "#fff",
    border: "1px solid #222",
    borderRadius: 6,
    cursor: "pointer",
  },
};
