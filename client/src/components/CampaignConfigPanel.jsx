import { useState } from "react";

export function CampaignConfigPanel({ latest }) {
  const campaign = latest?.campaign;

  const [form, setForm] = useState({
    active: true,
    name: "Siege of Sky City Drops",
    sponsor: "Tethys Forge",
    streamTitle: "Drops Enabled: Siege of Sky City",
    rewardName: "Sky City Founder Badge",
    rewardDescription: "Unlocked by watching a Drops-enabled stream.",
    thresholdSeconds: 60,
  });

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function submitCampaign(event) {
    event.preventDefault();

    await fetch("http://localhost:4000/api/campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  }

  return (
    <section className="card">
      <p className="eyebrow">Campaign Controls</p>
      <h2>Configure Drops Campaign</h2>
      <p>
        Simulates how a creator sponsorship or Drops campaign could be configured,
        launched, paused, and measured.
      </p>

      <form className="campaign-form" onSubmit={submitCampaign}>
        <label>
          Campaign Name
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </label>

        <label>
          Sponsor
          <input
            value={form.sponsor}
            onChange={(e) => updateField("sponsor", e.target.value)}
          />
        </label>

        <label>
          Stream Title
          <input
            value={form.streamTitle}
            onChange={(e) => updateField("streamTitle", e.target.value)}
          />
        </label>

        <label>
          Reward Name
          <input
            value={form.rewardName}
            onChange={(e) => updateField("rewardName", e.target.value)}
          />
        </label>

        <label>
          Reward Description
          <textarea
            value={form.rewardDescription}
            onChange={(e) => updateField("rewardDescription", e.target.value)}
          />
        </label>

        <label>
          Threshold Seconds
          <input
            type="number"
            min="10"
            max="600"
            value={form.thresholdSeconds}
            onChange={(e) => updateField("thresholdSeconds", e.target.value)}
          />
        </label>

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => updateField("active", e.target.checked)}
          />
          Campaign active
        </label>

        <button type="submit">Update Campaign</button>
      </form>

      {campaign && (
        <p className="muted">
          Current campaign: {campaign.name} · Sponsor: {campaign.sponsor}
        </p>
      )}
    </section>
  );
}