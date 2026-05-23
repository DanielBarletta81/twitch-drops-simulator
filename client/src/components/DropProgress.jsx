export function DropProgress({ event, onClaim, claimResult }) {
  const viewer = event?.viewer;
  const reward = event?.reward;

  const progress = Math.round((viewer?.progress || 0) * 100);

  return (

    <div className="card">
      <h2>{reward?.name}</h2>

      <div style={{ background: "#333", height: "10px", margin: "10px 0" }}>
        <div
          style={{
            width: `${progress}%`,
            background: "#9146ff",
            height: "100%",
          }}
        />
      </div>

      <div className="progress-track">
  <div className="progress-fill" style={{ width: `${progress}%` }} />
      <p>{viewer?.watchSeconds}s watched</p>
        </div>

      <button
  className={`claim-btn ${viewer?.rewardUnlocked ? "active" : ""}`}
  disabled={!viewer?.rewardUnlocked || viewer?.rewardClaimed}
  onClick={onClaim}
>
        {viewer?.rewardClaimed
          ? "Claimed"
          : viewer?.rewardUnlocked
          ? "Claim Reward"
          : "Watching..."}
      </button>

      {claimResult && <p>{claimResult.message}</p>}
    </div>
  );
}