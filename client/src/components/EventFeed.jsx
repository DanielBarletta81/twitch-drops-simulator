export function EventFeed({ events }) {
  return (
    <div className="card">
      <h3>Live Events</h3>

      {events.map((e) => (
        <div key={e.id}>
          <strong>{e.activity.type}</strong>
          <p>{e.insight}</p>
          <small>{e.latencyMs}ms</small>
        </div>
      ))}
    </div>
  );
}