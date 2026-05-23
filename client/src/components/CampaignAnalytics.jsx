export function CampaignAnalytics({ event }) {
  const analytics = event?.analytics;

  return (
    <section className="card">
      <p className="eyebrow">Campaign Analytics</p>
      <h2>Live Performance Snapshot</h2>

      {!analytics ? (
        <p>Waiting for campaign data...</p>
      ) : (
        <div className="analytics-grid">
          <Metric label="Viewer Count" value={analytics.viewerCount.toLocaleString()} />
          <Metric label="Watch Progress" value={`${analytics.progressPercent}%`} />
          <Metric label="Completion Rate" value={`${analytics.completionRate}%`} />
          <Metric label="Claimed Rate" value={`${analytics.claimedRate}%`} />
          <Metric label="Engagement Score" value={analytics.engagementScore} />
          <Metric label="Campaign Status" value={analytics.campaignStatus} />
        </div>
      )}
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}