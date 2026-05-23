export function StreamPanel({ event, status }) {
  const stream = event?.stream;

  return (
    <div>
    <section className="card stream-panel">
      <h2>{stream?.title || "Initializing live stream..."}</h2>
      <p>{stream?.streamer}</p>
      <span>Status: {status === "connected" ? "Live" : "Connecting..."}</span>
      <p>Viewers: {stream?.viewerCount || "—"}</p>
    </section>
    </div>
  );
}