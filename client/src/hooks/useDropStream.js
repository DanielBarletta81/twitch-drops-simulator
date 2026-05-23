import { useEffect, useState } from "react";

export function useDropStream() {
  const [status, setStatus] = useState("connecting");
  const [latest, setLatest] = useState(null);
  const [events, setEvents] = useState([]);
  const [claimResult, setClaimResult] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onopen = () => setStatus("connected");
    socket.onclose = () => setStatus("disconnected");
    socket.onerror = () => setStatus("error");

    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      if (data.type === "DROP_EVENT") {
        setLatest(data.event);
        setEvents((prev) => [data.event, ...prev].slice(0, 20));
      }

      if (data.type === "REWARD_CLAIMED") {
        setClaimResult(data.result);
      }
    };

    return () => socket.close();
  }, []);

  async function claimReward() {
    const res = await fetch("http://localhost:4000/api/claim", {
      method: "POST",
    });
    const data = await res.json();
    setClaimResult(data);
  }

  return { status, latest, events, claimReward, claimResult };
}