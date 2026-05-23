export function StreamPanel({ event, status }) {
  const stream = event?.stream;

  return (
    <div>
    <section className="card stream-panel">
      <h2>{stream?.title || "Connecting to stream..."}</h2>
      <p>{stream?.streamer}</p>
      <p>Status: {status}</p>
      <p>Viewers: {stream?.viewerCount || "—"}</p>
    </section>
    </div>
  );
}