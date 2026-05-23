import { useDropStream } from "./hooks/useDropStream";
import { StreamPanel } from "./components/StreamPanel";
import { DropProgress } from "./components/DropProgress";
import { EventFeed } from "./components/EventFeed";
import { InsightPanel } from "./components/InsightPanel";
import { CampaignConfigPanel } from "./components/CampaignConfigPanel";
import { CampaignAnalytics } from "./components/CampaignAnalytics";
import "./style.css";

export default function App() {
  const { status, latest, events, claimReward, claimResult } = useDropStream();

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Creator Sponsorships / Drops Simulation</p>
          <h1>Real-time reward engagement dashboard</h1>
        <p className="subhead">
  Simulating how viewer engagement drives reward unlocks in real time.
</p>
        </div>

        <div className={`connection-pill ${status}`}>
          <span />
          {status}
        </div>
      </section>

      <StreamPanel event={latest} status={status} />
        <CampaignConfigPanel latest={latest} />
          <CampaignAnalytics event={latest} />

      <section className="dashboard-grid">
        <DropProgress
          event={latest}
          onClaim={claimReward}
          claimResult={claimResult}
        />
        <InsightPanel event={latest} />
      </section>
       
      <EventFeed events={events} />
    </main>
  );
}