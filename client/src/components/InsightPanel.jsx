export function InsightPanel({ event }) {
  return (
    <div className="card">
      <h3>What This Means</h3>
      <p>{event?.insight || "Waiting for data..."}</p>
      {event?.engagementScore !== undefined && (
        <p>Engagement Score: {event.engagementScore}</p>
      )}
    </div>
  );
}